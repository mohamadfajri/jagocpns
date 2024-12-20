const prisma = require("../../utils/prismaClient");

const getUserRankById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const tryoutListId = parseInt(req.params.tryoutListId);

  try {
    const scores = await prisma.score.findMany({
      where: {
        tryoutListId: tryoutListId,
      },
      orderBy: {
        total: "desc",
      },
    });

    const userRank = scores.findIndex((score) => score.userId === userId) + 1;

    if (userRank > 0) {
      res.status(200).json({
        userId: userId,
        rank: userRank,
      });
    } else {
      res.status(404).json({
        message: "User not found in this tryout list",
      });
    }
  } catch (error) {
    console.error("Error fetching user rank:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUserRankingsByTryout = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const limit = parseInt(req.query.limit) || 10; //
  const { userId, tryoutListId, minTotal, maxTotal, name } = req.query;

  const isLulus = (twk, tiu, tkp) => {
    const kkmTwk = 0;
    const kkmTiu = 0;
    const kkmTkp = 0;
    const kkm = 0;
    const totalScore = twk + tiu + tkp;

    if (totalScore >= kkm) {
      return "Lulus";
    } else {
      return "Tidak Lulus";
    }
  };

  try {
    const allScores = await prisma.score.findMany({
      where: {
        tryoutListId: parseInt(tryoutListId),
      },
      orderBy: {
        total: "desc",
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
      name: score?.user?.profile?.name ?? "User",
      province: score?.user?.profile?.province ?? "Province",
      status: isLulus(score.twk, score.tiu, score.tkp),
    }));

    scoresWithDetails.sort((a, b) => {
      if (a.status === "Lulus" && b.status === "Tidak Lulus") {
        return -1;
      } else if (a.status === "Tidak Lulus" && b.status === "Lulus") {
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

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedScores = filteredScores.slice(startIndex, endIndex);

    const totalScores = filteredScores.length;

    res.json({
      totalScores,
      currentPage: page,
      totalPages: Math.ceil(totalScores / limit),
      limit: limit,
      data: paginatedScores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching scores." });
  }
};

module.exports = { getUserRankingsByTryout, getUserRankById };
