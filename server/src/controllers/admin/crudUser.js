const prisma = require('../../utils/prismaClient');
const bcrypt = require('bcrypt');

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
        balance: true,
      },
    });

    const usersWithConvertedBigInt = users.map((user) => ({
      ...user,
      balance: user.balance
        ? {
            ...user.balance,
            amount: user.balance.amount.toString(),
          }
        : null,
    }));

    const totalUsers = await prisma.user.count();

    res.json({
      page: page,
      pageSize: pageSize,
      totalUsers: totalUsers,
      totalPages: Math.ceil(totalUsers / pageSize),
      users: usersWithConvertedBigInt,
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
        balance: true,
      },
    });
    const usersWithConvertedBigInt = users.map((user) => ({
      ...user,
      balance: user.balance
        ? {
            ...user.balance,
            amount: user.balance.amount.toString(),
          }
        : null,
    }));

    if (users.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.json(usersWithConvertedBigInt);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mencari data pengguna',
    });
  }
};

const resetPassword = async (req, res) => {
  const userId = req.body.id;
  const newPassword = 'jagocpns123';

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res
      .status(200)
      .json({ message: 'Password telah direset menjadi jagocpns123' });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mereset password' });
  }
};

const createOwnership = async (req, res) => {
  const { userId, tryoutListId } = req.body;

  try {
    const ownership = await prisma.ownership.create({
      data: {
        userId,
        tryoutListId,
      },
    });

    res.status(201).json({
      message: 'Ownership created successfully',
      ownership,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Failed to create ownership',
    });
  }
};

const deleteOwnership = async (req, res) => {
  const { id } = req.params;

  try {
    const ownership = await prisma.ownership.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!ownership) {
      return res.status(404).json({
        message: 'Ownership not found',
      });
    }

    res.status(200).json({
      message: 'Ownership deleted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Failed to delete ownership',
    });
  }
};

module.exports = {
  getAllUser,
  searchUser,
  resetPassword,
  createOwnership,
  deleteOwnership,
};
