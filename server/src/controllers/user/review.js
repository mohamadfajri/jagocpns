const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReview = async (req, res) => {
  const { tryoutListId } = req.params;
  const userId = req.user.id;

  try {
    const ownership = await prisma.ownership.findFirst({
      where: {
        userId: parseInt(userId),
        tryoutListId: parseInt(tryoutListId),
      },
    });

    if (!ownership) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to access this resource.' });
    }

    const tryouts = await prisma.tryout.findMany({
      where: {
        tryoutListId: parseInt(tryoutListId),
      },
      orderBy: {
        number: 'asc',
      },
    });

    res.status(200).json(tryouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserAnswer = async (req, res) => {
  const { id: userId } = req.user;
  const { tryoutListId } = req.params;

  try {
    const answers = await prisma.answer.findMany({
      where: {
        userId: parseInt(userId, 10),
        tryoutListId: parseInt(tryoutListId, 10),
      },
      orderBy: {
        number: 'asc',
      },
    });
    const format = answers.map((item) => ({
      number: item.number,
      answer: item.answer[item.answer.length - 1].toLocaleLowerCase(),
    }));

    res.json(format);
  } catch (error) {
    console.error('Error fetching user answers:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user answers.',
    });
  }
};

module.exports = { getReview, getUserAnswer };
