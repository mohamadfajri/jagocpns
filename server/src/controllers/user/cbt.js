const prisma = require('../../utils/prismaClient');

const getSoalByNumber = async (req, res) => {
  const tryoutListId = parseInt(req.params.id);
  const number = parseInt(req.params.num);

  try {
    const soal = await prisma.tryout.findFirst({
      where: {
        tryoutListId: tryoutListId,
        number: number,
      },
    });

    if (soal) {
      res.status(200).json({
        id: soal.id,
        number: soal.number,
        question: soal.question,
        imageUrl: soal.imageUrl,
        optionA: soal.optionA,
        optionB: soal.optionB,
        optionC: soal.optionC,
        optionD: soal.optionD,
        optionE: soal.optionE,
        imageA: soal.imageA,
        imageB: soal.imageB,
        imageC: soal.imageC,
        imageD: soal.imageD,
        imageE: soal.imageE,
      });
    } else {
      res.status(404).json({ error: 'Soal not found' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the tryout' });
  }
};

const getSoalData = async (req, res) => {
  const tryoutListId = parseInt(req.params.id);

  try {
    const totalSoal = await prisma.tryout.count({
      where: {
        tryoutListId: tryoutListId,
      },
    });
    const tryoutList = await prisma.tryoutList.findUnique({
      where: {
        id: tryoutListId,
      },
    });

    if (!tryoutList) {
      return res.status(404).json({ error: 'TryoutList not found' });
    }

    res.json({ data: { title: tryoutList.title }, totalSoal: totalSoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createAnswer = async (req, res) => {
  const userId = req.user.id;
  const { id: tryoutListId } = req.params;
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: 'Invalid answers array' });
  }

  const answerData = answers.map((answer, index) => ({
    tryoutListId: parseInt(tryoutListId),
    number: index + 1,
    userId: userId,
    answer: `option${answer}`,
  }));

  try {
    const createdAnswers = await prisma.answer.createMany({
      data: answerData,
    });
    const userAnswers = await prisma.answer.findMany({
      where: {
        userId: userId,
        tryoutListId: parseInt(tryoutListId),
      },
    });

    const tryouts = await prisma.tryout.findMany({
      where: {
        tryoutListId: parseInt(tryoutListId),
      },
    });

    let tiuScore = 0;
    let twkScore = 0;
    let tkpScore = 0;

    userAnswers.forEach((answer) => {
      const tryout = tryouts.find((t) => t.number === answer.number);
      if (tryout) {
        let score = 0;
        switch (answer.answer) {
          case 'optionA':
            score = tryout.scoreA;
            break;
          case 'optionB':
            score = tryout.scoreB;
            break;
          case 'optionC':
            score = tryout.scoreC;
            break;
          case 'optionD':
            score = tryout.scoreD;
            break;
          case 'optionE':
            score = tryout.scoreE;
            break;
          default:
            break;
        }

        if (tryout.type === 'tiu') {
          tiuScore += score;
        } else if (tryout.type === 'twk') {
          twkScore += score;
        } else if (tryout.type === 'tkp') {
          tkpScore += score;
        }
      }
    });

    const totalScore = tiuScore + twkScore + tkpScore;

    const newScore = await prisma.score.create({
      data: {
        userId: userId,
        tryoutListId: parseInt(tryoutListId),
        tiu: tiuScore,
        twk: twkScore,
        tkp: tkpScore,
        total: totalScore,
      },
    });
    await prisma.ownership.updateMany({
      where: {
        userId: userId,
        tryoutListId: parseInt(tryoutListId),
      },
      data: {
        isDone: true,
      },
    });

    return res.status(201).json({
      message: 'Jawaban berhasil disubmit!',
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Data sudah ada' });
    } else {
      return res
        .status(500)
        .json({
          message:
            'Failed to submit answers, calculate score, and update isDone status',
        });
    }
  }
};

const getAnswer = async (req, res) => {
  const { tryoutListId, number } = req.query;
  const userId = req.user.id;

  if (!tryoutListId || !number) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const answer = await prisma.answer.findFirst({
      where: {
        AND: [
          { tryoutListId: parseInt(tryoutListId) },
          { userId: parseInt(userId) },
          { number: parseInt(number) },
        ],
      },
    });

    if (!answer) {
      return res.status(200).json({ error: 'Answer not found' });
    }

    res.status(200).json(answer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the answer' });
  }
};

const getIsAnswer = async (req, res) => {
  const { tryoutListId } = req.query;

  const { id } = req.user;
  const userId = parseInt(id);

  if (!userId || !tryoutListId) {
    return res.status(400).json({ error: 'Missing userId or tryoutListId' });
  }

  const tryoutListIdInt = parseInt(tryoutListId);

  if (isNaN(userId) || isNaN(tryoutListIdInt)) {
    return res.status(400).json({ error: 'Invalid userId or tryoutListId' });
  }

  try {
    const answers = await prisma.answer.findMany({
      where: {
        userId: userId,
        tryoutListId: tryoutListIdInt,
      },
      select: {
        number: true,
      },
    });
    const numbers = answers.map((answer) => answer.number);

    res.json(numbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createScore = async (req, res) => {
  const { toId } = req.params;
  const tryoutListId = parseInt(toId);
  const { id } = req.user;
  const userId = parseInt(id);

  try {
    const answers = await prisma.answer.findMany({
      where: {
        userId: userId,
        tryoutListId: tryoutListId,
      },
    });
    const tryouts = await prisma.tryout.findMany({
      where: {
        tryoutListId: tryoutListId,
      },
    });

    let tiuScore = 0;
    let twkScore = 0;
    let tkpScore = 0;

    answers.forEach((answer) => {
      const tryout = tryouts.find((t) => t.number === answer.number);
      if (tryout) {
        let score = 0;
        switch (answer.answer) {
          case 'optionA':
            score = tryout.scoreA;
            break;
          case 'optionB':
            score = tryout.scoreB;
            break;
          case 'optionC':
            score = tryout.scoreC;
            break;
          case 'optionD':
            score = tryout.scoreD;
            break;
          case 'optionE':
            score = tryout.scoreE;
            break;
          default:
            break;
        }

        if (tryout.type === 'tiu') {
          tiuScore += score;
        } else if (tryout.type === 'twk') {
          twkScore += score;
        } else if (tryout.type === 'tkp') {
          tkpScore += score;
        }
      }
    });

    const totalScore = tiuScore + twkScore + tkpScore;

    const newScore = await prisma.score.create({
      data: {
        userId: userId,
        tryoutListId: tryoutListId,
        tiu: tiuScore,
        twk: twkScore,
        tkp: tkpScore,
        total: totalScore,
      },
    });

    res.status(201).json(newScore);
  } catch (error) {
    if (error.code === 'P2002') {
      // Prisma unique constraint violation error code
      res.status(400).json({ error: 'Data sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const getAllSoalById = async (req, res) => {
  const tryoutListId = req.params.id;

  try {
    const tryouts = await prisma.tryout.findMany({
      where: {
        tryoutListId: Number(tryoutListId),
      },
      orderBy: {
        number: 'asc',
      },
    });

    res.status(200).json(tryouts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to get tryouts by tryoutListId' });
  }
};

module.exports = {
  createScore,
  getSoalByNumber,
  getSoalData,
  createAnswer,
  getAnswer,
  getIsAnswer,
  getAllSoalById,
};
