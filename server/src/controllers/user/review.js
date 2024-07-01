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
    });

    res.status(200).json(tryouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getReview };
