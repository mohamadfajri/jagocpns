const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

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

module.exports = { createAdmin };
