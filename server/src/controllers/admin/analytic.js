const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserCount = async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user count' });
  }
};

const getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await prisma.user.count({
      where: {
        updatedAt: {
          gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // last 30 days
        },
      },
    });
    res.json({ activeUsers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching active users' });
  }
};

const getUserRegistrations = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const registrations = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    res.json({ registrations });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user registrations' });
  }
};

const getUserSegment = async (req, res) => {
  try {
    const genderSegment = await prisma.profile.groupBy({
      by: ['gender'],
      _count: {
        _all: true,
      },
    });
    res.json({ genderSegment });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user segment' });
  }
};

const getTransactionSummary = async (req, res) => {
  try {
    const summary = await prisma.transaction.groupBy({
      by: ['status'],
      _sum: {
        amount: true,
      },
      _count: {
        _all: true,
      },
    });

    const formattedSummary = summary.map((item) => ({
      status: item.status,
      _sum: {
        amount: Number(item._sum.amount),
      },
      _count: item._count,
    }));

    res.json({ summary: formattedSummary });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transaction summary' });
  }
};

const getTransactionVolume = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const volume = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      select: {
        status: true,
        amount: true,
        createdAt: true,
      },
    });

    const formattedVolume = volume.map((item) => ({
      status: item.status,
      amount: Number(item.amount),
      createdAt: item.createdAt,
    }));

    res.json({ volume: formattedVolume });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching transaction volume' });
  }
};

const getBalanceSummary = async (req, res) => {
  try {
    const balance = await prisma.balance.aggregate({
      _sum: {
        amount: true,
      },
    });
    const totalBalance = Number(balance._sum.amount || 0);

    res.json({ balance: totalBalance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching balance summary' });
  }
};

const getTryoutParticipation = async (req, res) => {
  try {
    const participation = await prisma.ownership.count({
      where: {
        isDone: true,
      },
    });
    res.json({ participation });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tryout participation' });
  }
};

const getAverageScores = async (req, res) => {
  try {
    const averages = await prisma.score.aggregate({
      _avg: {
        tiu: true,
        twk: true,
        tkp: true,
      },
    });
    res.json({ averages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching average scores' });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    const transactionSummary = await prisma.transaction.groupBy({
      by: ['status'],
      _sum: {
        amount: true,
      },
      _count: {
        _all: true,
      },
    });
    const convertedTransactionSummary = transactionSummary.map((summary) => ({
      status: summary.status,
      totalAmount: Number(summary._sum.amount || 0),
      transactionCount: summary._count._all,
    }));

    const tryoutParticipation = await prisma.ownership.count({
      where: {
        isDone: true,
      },
    });

    res.json({
      userCount,
      transactionSummary: convertedTransactionSummary,
      tryoutParticipation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching dashboard summary' });
  }
};

const getMonthlyData = async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required' });
  }

  try {
    // Convert month and year to integer
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    // Get start and end dates for the month
    const startDate = new Date(yearInt, monthInt - 1, 1);
    const endDate = new Date(yearInt, monthInt, 0);

    // Fetch data for users
    const userData = await prisma.user.aggregate({
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Fetch data for transactions with status 'paid'
    const transactionData = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: 'paid',
      },
    });

    // Create daily data
    const dailyData = [];
    for (let day = 1; day <= endDate.getDate(); day++) {
      const dayStart = new Date(yearInt, monthInt - 1, day, 0, 0, 0);
      const dayEnd = new Date(yearInt, monthInt - 1, day, 23, 59, 59);

      const dailyUsers = await prisma.user.count({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });

      const dailyRevenue = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
          status: 'paid',
        },
      });

      dailyData.push({
        date: `${yearInt}-${monthInt.toString().padStart(2, '0')}-${day
          .toString()
          .padStart(2, '0')}`,
        users: dailyUsers,
        revenue: dailyRevenue._sum.amount
          ? Number(dailyRevenue._sum.amount)
          : 0, // Convert BigInt to Number
      });
    }

    res.json({
      userCount: userData._count.id,
      totalRevenue: transactionData._sum.amount
        ? Number(transactionData._sum.amount)
        : 0, // Convert BigInt to Number
      dailyData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching monthly data' });
  }
};

module.exports = {
  getUserCount,
  getActiveUsers,
  getUserRegistrations,
  getUserSegment,
  getTransactionSummary,
  getTransactionVolume,
  getBalanceSummary,
  getTryoutParticipation,
  getAverageScores,
  getDashboardSummary,
  getMonthlyData,
};
