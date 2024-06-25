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
  const { tryoutListId, number, answer } = req.body;
  const { id } = req.user;

  if (!tryoutListId || !number || answer === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingAnswer = await prisma.answer.findFirst({
      where: {
        AND: [
          { tryoutListId: parseInt(tryoutListId) },
          { userId: parseInt(id) },
          { number: parseInt(number) },
        ],
      },
    });

    let result;
    if (existingAnswer) {
      result = await prisma.answer.update({
        where: {
          id: existingAnswer.id,
        },
        data: {
          answer,
        },
      });
    } else {
      result = await prisma.answer.create({
        data: {
          tryoutListId: parseInt(tryoutListId),
          number,
          userId: parseInt(id),
          answer,
        },
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create or update answer' });
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

module.exports = {
  createScore,
  getSoalByNumber,
  getSoalData,
  createAnswer,
  getAnswer,
  getIsAnswer,
};
