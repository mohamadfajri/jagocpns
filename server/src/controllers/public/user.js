const prisma = require('../../utils/prismaClient');

const counterUser = async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    return res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba menghitung jumlah pengguna',
    });
  }
};

module.exports = { counterUser };
