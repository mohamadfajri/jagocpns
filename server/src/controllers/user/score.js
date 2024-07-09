const prisma = require('../../utils/prismaClient');

const isLulus = (twk, tiu, tkp) => {
  const kkmTwk = 65;
  const kkmTiu = 80;
  const kkmTkp = 166;

  return {
    statusTwk: twk >= kkmTwk ? 'Lulus' : 'Tidak Lulus',
    statusTiu: tiu >= kkmTiu ? 'Lulus' : 'Tidak Lulus',
    statusTkp: tkp >= kkmTkp ? 'Lulus' : 'Tidak Lulus',
    statusTotal:
      twk >= kkmTwk && tiu >= kkmTiu && tkp >= kkmTkp ? 'Lulus' : 'Tidak Lulus',
  };
};

const getUserScoreById = async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  const tryoutListId = parseInt(req.params.tryoutListId, 10);

  try {
    const score = await prisma.score.findFirst({
      where: {
        userId,
        tryoutListId,
      },
      include: {
        tryoutList: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    const { twk, tiu, tkp, total } = score;
    const { statusTwk, statusTiu, statusTkp, statusTotal } = isLulus(
      twk,
      tiu,
      tkp
    );

    res.json({
      id: score.id,
      tryoutListName: score.tryoutList.title,
      twk,
      tiu,
      tkp,
      total,
      statusTwk,
      statusTiu,
      statusTkp,
      statusTotal,
    });
  } catch (error) {
    console.error('Error fetching user score:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the user score.' });
  }
};

module.exports = { getUserScoreById };
