const prisma = require('../../utils/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const decoder = require('../../utils/decoder');

const createAdmin = async (req, res) => {
  const { name, email, password, adminKey } = req.body;
  if (adminKey === process.env.ADMIN_KEY) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await prisma.admin.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ data });
    } catch (error) {
      res.status(401).json({ error: error });
    }
  } else {
    res.status(401).json({ status: false, message: 'Admin Only' });
  }
};

const getAdmin = (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' });
  }

  try {
    const decoded = decoder(token);
    const admin = decoded;

    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mencoba mengambil data admin' });
  }
};

const adminSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mencoba masuk sebagai admin' });
  }
};

module.exports = { createAdmin, getAdmin, adminSignin };
