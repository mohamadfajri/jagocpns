const prisma = require('../../utils/prismaClient');

const counterUser = async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    return res.status(200).json({ count: userCount + 5000 });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba menghitung jumlah pengguna',
    });
  }
};

const createOwnerr = async (req, res) => {
  const { tryoutListId, userId } = req.body;

  try {
    const existingOwnership = await prisma.ownership.findFirst({
      where: {
        userId: userId,
        tryoutListId: parseInt(tryoutListId),
      },
    });

    if (existingOwnership) {
      return res
        .status(400)
        .json({ message: 'Anda sudah memiliki ownership untuk tryout ini' });
    }

    const newOwnership = await prisma.ownership.create({
      data: {
        userId: userId,
        tryoutListId: parseInt(tryoutListId),
      },
    });

    res.status(201).json({
      message: 'Ownership berhasil ditambahkan',
      ownership: newOwnership,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Gagal menambahkan ownership', error: error.message });
  }
};

module.exports = { counterUser, createOwnerr };
