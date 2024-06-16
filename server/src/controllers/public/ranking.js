const prisma = require('../../utils/prismaClient');

const getUserRankingsByTryout = async (req, res) => {
  const { tryoutListId } = req.params;

  try {
    const scores = await prisma.score.findMany({
      where: {
        tryoutListId: parseInt(tryoutListId),
      },
      include: {
        user: true,
      },
      orderBy: {
        total: 'desc',
      },
    });

    const scoresWithRank = scores.map((score, index) => ({
      ...score,
      rank: index + 1,
    }));

    const usersWithRank = scoresWithRank.map((score) => ({
      id: score.user.id,
      email: score.user.email,
      rank: score.rank,
      tiu: score.tiu,
      twk: score.twk,
      tkp: score.tkp,
      total: score.total,
    }));

    return res.status(200).json(usersWithRank);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mengambil peringkat pengguna',
    });
  }
};

module.exports = { getUserRankingsByTryout };
