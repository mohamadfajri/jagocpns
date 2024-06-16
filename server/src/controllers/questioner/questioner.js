const prisma = require('../../utils/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const decoder = require('../../utils/decoder');

const createQuestioner = async (req, res) => {
  const { name, email, password, adminKey } = req.body;
  if (adminKey === process.env.ADMIN_KEY) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await prisma.questioner.create({
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
    res.status(401).json({ status: false, message: 'Questioner Only' });
  }
};

const getQuestioner = (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' });
  }

  try {
    const decoded = decoder(token);
    const questioner = decoded;

    if (!questioner) {
      return res.status(404).json({ message: 'Questioner tidak ditemukan' });
    }

    res.json(questioner);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mengambil data Questioner',
    });
  }
};

const questionerSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const questioner = await prisma.questioner.findUnique({
      where: {
        email: email,
      },
    });
    if (!questioner) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    const passwordMatch = await bcrypt.compare(password, questioner.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      {
        id: questioner.id,
        name: questioner.name,
        email: questioner.email,
        role: 'questioner',
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba masuk sebagai questioner',
    });
  }
};

module.exports = { createQuestioner, getQuestioner, questionerSignin };
