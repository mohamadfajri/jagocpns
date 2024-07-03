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
      where: { userId: parseInt(userId), status: 'unpaid' || 'checking' },
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
    console.log(transaction);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch transaction' });
  }
};

const checkout = async (req, res) => {
  const userId = Number(req.user.id); // Convert req.user.id to a number
  const { tryoutListId, target } = req.body;

  // Validate target array
  if (!Array.isArray(target) || target.length === 0) {
    return res.status(400).json({ message: 'Target list is invalid or empty' });
  }

  // Extract ids from the target array and validate them
  const targetIds = target.map((user) => Number(user.id));
  if (targetIds.some((id) => isNaN(id))) {
    return res
      .status(400)
      .json({ message: 'One or more target IDs are invalid' });
  }

  try {
    // Fetch the price of the tryout
    const tryout = await prisma.tryoutList.findUnique({
      where: { id: Number(tryoutListId) },
      select: { price: true },
    });

    if (!tryout) {
      return res.status(404).json({ message: 'Tryout not found' });
    }

    const tryoutPrice = Number(tryout.price);
    const totalPrice = BigInt(tryoutPrice * target.length);

    // Fetch the user's balance
    const userBalance = await prisma.balance.findUnique({
      where: { userId },
      select: { amount: true },
    });

    if (!userBalance) {
      return res.status(404).json({ message: 'User balance not found' });
    }

    if (userBalance.amount < totalPrice) {
      return res.status(400).json({ message: 'Saldo tidak cukup' });
    }

    // Check if any target users already own the tryout
    const existingOwnerships = await prisma.ownership.findMany({
      where: {
        tryoutListId: Number(tryoutListId),
        userId: {
          in: targetIds,
        },
      },
      include: {
        user: true, // To get user details like email
      },
    });

    if (existingOwnerships.length > 0) {
      const userEmails = existingOwnerships.map(
        (ownership) => ownership.user.email
      );
      return res.status(400).json({
        message: `User(s) ${userEmails.join(', ')} sudah memiliki tryout ini`,
      });
    }

    // Deduct the total price from the user's balance
    await prisma.balance.update({
      where: { userId },
      data: { amount: userBalance.amount - totalPrice },
    });

    // Create entries in the Ownership table
    const ownerships = targetIds.map((targetUserId) => ({
      userId: targetUserId,
      tryoutListId: Number(tryoutListId),
    }));

    await prisma.ownership.createMany({ data: ownerships });

    res.status(200).json({ message: 'Pembelian tryout berhasil' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat checkout' });
  }
};

module.exports = {
  createTransaction,
  createVerification,
  getTransactionStatus,
  getTransaction,
  getSuccessTransaction,
  checkout,
};
