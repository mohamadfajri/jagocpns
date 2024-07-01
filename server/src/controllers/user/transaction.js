const prisma = require('../../utils/prismaClient');

const createTransaction = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  const randomNumber = Math.floor(Math.random() * 999) + 1;
  const updatedAmount = BigInt(amount) + BigInt(randomNumber);

  try {
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        status: {
          in: ['unpaid', 'checking'],
        },
      },
    });

    if (existingTransaction) {
      return res.status(400).json({
        message: 'User already has an unpaid or checking transaction',
      });
    }

    await prisma.transaction.create({
      data: {
        userId: userId,
        amount: updatedAmount,
        status: 'unpaid',
      },
    });

    res.status(201).json({ message: 'Transaksi berhasil dibuat' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal membuat transaksi baru' });
  }
};

const createVerification = async (req, res) => {
  const userId = parseInt(req.user.id);
  const imageUrl = req.image ? req.image : null;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        status: 'unpaid',
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: 'checking',
        imageUrl: imageUrl,
      },
    });

    res.status(200).json({
      message: 'Verification created successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create verification' });
  }
};

const getSuccessTransaction = async (req, res) => {
  const userId = parseInt(req.user.id);

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        status: 'paid',
      },
    });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No paid transactions found' });
    }

    res.status(200).json({
      message: 'Paid transactions retrieved successfully',
      data: transactions,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
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

    res.status(200).json({
      status:
        transaction.status === 'unpaid'
          ? true
          : transaction.status === 'checking'
          ? true
          : false,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mendapatkan status transaksi',
    });
  }
};

const getTransaction = async (req, res) => {
  const userId = req.user.id;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          select: {
            email: true,
            profile: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const createdAt = new Date(transaction.createdAt);
    const ddmmyyyy = `${createdAt.getDate().toString().padStart(2, '0')}${(
      createdAt.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}${createdAt.getFullYear()}`;
    const uniquePart = transaction.amount.toString().slice(-3);
    const formattedId = `JAGO-${ddmmyyyy}${transaction.id}`;

    const response = {
      id: formattedId,
      email: transaction.user.email,
      name: transaction.user.profile.name,
      unique: uniquePart,
      amount: transaction.amount.toString(),
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch transaction' });
  }
};

module.exports = {
  createTransaction,
  createVerification,
  getTransactionStatus,
  getTransaction,
  getSuccessTransaction,
};
