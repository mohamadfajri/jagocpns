const prisma = require('../../utils/prismaClient');

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const users = await prisma.user.findMany({
      skip: skip,
      take: pageSize,
      include: {
        profile: true,
      },
    });

    const totalUsers = await prisma.user.count();

    res.json({
      page: page,
      pageSize: pageSize,
      totalUsers: totalUsers,
      totalPages: Math.ceil(totalUsers / pageSize),
      users: users,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mengambil data pengguna',
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const search = req.params.search;

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { profile: { name: { contains: search, mode: 'insensitive' } } },
        ],
      },
      include: {
        profile: true,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mencari data pengguna',
    });
  }
};

module.exports = { getAllUser, searchUser };
