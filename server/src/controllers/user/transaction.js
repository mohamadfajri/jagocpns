const prisma = require('../../utils/prismaClient');

const createTransaction = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: userId,
        amount: amount,
      },
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal membuat transaksi baru' });
  }
};

const createVerification = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.transaction.update({
      where: { userId },
      data: { status: 'checking' },
    });

    return res
      .status(200)
      .json({ message: 'Status transaksi berhasil diubah menjadi checking' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: 'Transaksi tidak ditemukan untuk pengguna ini' });
    }
    return res.status(500).json({
      message: `Terjadi kesalahan saat mengubah status transaksi${error}`,
    });
  }
};

const getTransactionStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        status: {
          not: 'paid',
        },
      },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: 'Tidak ada transaksi aktif untuk pengguna ini' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mendapatkan status transaksi',
    });
  }
};

module.exports = {
  createTransaction,
  createVerification,
  getTransactionStatus,
};
