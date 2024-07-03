const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllTransactions = async (req, res) => {
  const { page = 1, pageSize = 10, email, unique } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSizeNumber = parseInt(pageSize, 10);

  try {
    const filters = {
      status: 'checking',
    };

    if (email) {
      filters.user = {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      };
    }

    const allTransactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: {
        updatedAt: 'asc',
      },
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

    let filteredTransactions = allTransactions;
    if (unique) {
      filteredTransactions = allTransactions.filter((item) =>
        item.amount.toString().endsWith(unique)
      );
    }

    const totalTransactions = filteredTransactions.length;
    const totalPages = Math.ceil(totalTransactions / pageSizeNumber);

    const paginatedTransactions = filteredTransactions.slice(
      (pageNumber - 1) * pageSizeNumber,
      pageNumber * pageSizeNumber
    );

    const formattedTransactions = paginatedTransactions.map((item) => ({
      id: item.id,
      email: item.user.email,
      name: item.user.profile?.name,
      unique: item.amount.toString().slice(-3),
      amount: item.amount.toString(),
      bukti: item.imageUrl,
      date: item.updatedAt,
    }));

    if (formattedTransactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    res.status(200).json({
      message: 'All transactions retrieved successfully',
      data: formattedTransactions,
      meta: {
        totalPages,
        currentPage: pageNumber,
        pageSize: pageSizeNumber,
        totalTransactions,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
  }
};

const acceptTransaction = async (req, res) => {
  const { id } = req.body;
  const adminId = req.user.id;

  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: 'paid',
      },
    });

    const { userId, amount } = transaction;
    const roundedAmount = Math.round(parseInt(amount) / 1000) * 1000;

    // Check if there's an existing balance for the userId
    const existingBalance = await prisma.balance.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        amount: true,
      },
    });

    if (existingBalance) {
      // If balance exists, update the existing balance
      const updatedAmount =
        BigInt(existingBalance.amount) + BigInt(roundedAmount);
      await prisma.balance.update({
        where: {
          id: existingBalance.id,
        },
        data: {
          amount: updatedAmount,
        },
      });
    } else {
      // If no balance exists, create a new balance entry
      await prisma.balance.create({
        data: {
          userId: userId,
          adminId: adminId,
          amount: BigInt(roundedAmount),
        },
      });
    }

    res.status(200).json({
      message: 'Transaction accepted successfully and balance updated',
    });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ message: 'Failed to accept transaction and update balance' });
  }
};

const rejectTransaction = async (req, res) => {
  const { id } = req.body;

  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: 'Transaction rejected and deleted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = { getAllTransactions, acceptTransaction, rejectTransaction };
