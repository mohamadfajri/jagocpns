const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createInformation = async (req, res) => {
  const { type, title, description, imageUrl } = req.body;

  try {
    if (!['banner', 'info', 'news'].includes(type)) {
      return res.status(400).json({ message: 'Tipe informasi tidak valid' });
    }
    const newInformation = await prisma.information.create({
      data: {
        type,
        title,
        imageUrl,
        description,
      },
    });

    res.status(201).json(newInformation);
  } catch (error) {
    console.error('Error:', error);

    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mencoba membuat informasi' });
  }
};

module.exports = { createInformation };
