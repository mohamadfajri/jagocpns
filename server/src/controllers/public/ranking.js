const prisma = require('../../utils/prismaClient');

const getUserRankingsByTryout = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const { userId, tryoutListId, minTotal, maxTotal, name } = req.query;

  const isLulus = (twk, tiu, tkp) => {
    const kkmTwk = 65;
    const kkmTiu = 80;
    const kkmTkp = 166;

    if (twk >= kkmTwk && tiu >= kkmTiu && tkp >= kkmTkp) {
      return 'Lulus';
    } else {
      return 'Tidak Lulus';
    }
  };

  try {
    const allScores = await prisma.score.findMany({
      where: {
        tryoutListId: parseInt(tryoutListId),
      },
      orderBy: {
        total: 'desc',
      },
      include: {
        user: {
          select: {
            profile: {
              select: {
                name: true,
                province: true,
              },
            },
          },
        },
      },
    });

    const scoresWithDetails = allScores.map((score, index) => ({
      ...score,
      rank: index + 1,
      name: score?.user?.profile?.name ?? 'User',
      province: score?.user?.profile?.province ?? 'Province',
      status: isLulus(score.twk, score.tiu, score.tkp),
    }));

    scoresWithDetails.sort((a, b) => {
      if (a.status === 'Lulus' && b.status === 'Tidak Lulus') {
        return -1;
      } else if (a.status === 'Tidak Lulus' && b.status === 'Lulus') {
        return 1;
      } else {
        return b.total - a.total;
      }
    });

    scoresWithDetails.forEach((score, index) => {
      score.rank = index + 1;
    });

    let filteredScores = scoresWithDetails;
    if (userId)
      filteredScores = filteredScores.filter(
        (score) => score.userId === parseInt(userId)
      );
    if (tryoutListId)
      filteredScores = filteredScores.filter(
        (score) => score.tryoutListId === parseInt(tryoutListId)
      );
    if (minTotal)
      filteredScores = filteredScores.filter(
        (score) => score.total >= parseInt(minTotal)
      );
    if (maxTotal)
      filteredScores = filteredScores.filter(
        (score) => score.total <= parseInt(maxTotal)
      );
    if (name)
      filteredScores = filteredScores.filter((score) =>
        score.name.toLowerCase().includes(name.toLowerCase())
      );

    const paginatedScores = filteredScores.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const totalScores = filteredScores.length;

    res.json({
      totalScores,
      currentPage: page,
      totalPages: Math.ceil(totalScores / pageSize),
      data: paginatedScores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching scores.' });
  }
};

module.exports = { getUserRankingsByTryout };
