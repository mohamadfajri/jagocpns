const prisma = require('../../utils/prismaClient');

const createSoal = async (req, res) => {
  const tryoutListId = parseInt(req.params.id);
  const {
    type,
    number,
    question,
    scoreA,
    scoreB,
    scoreC,
    scoreD,
    scoreE,
    explanation,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
  } = req.body;

  try {
    const existingSoal = await prisma.tryout.findFirst({
      where: {
        tryoutListId: tryoutListId,
        number: parseInt(number),
      },
    });

    let soal;
    const data = {
      type,
      question,
      scoreA: parseInt(scoreA),
      scoreB: parseInt(scoreB),
      scoreC: parseInt(scoreC),
      scoreD: parseInt(scoreD),
      scoreE: parseInt(scoreE),
      explanation,
      optionA,
      optionB,
      optionC,
      optionD,
      optionE,
      updatedAt: new Date(),
    };

    if (req.image) data.imageUrl = req.image;
    if (req.imageA) data.imageA = req.imageA;
    if (req.imageB) data.imageB = req.imageB;
    if (req.imageC) data.imageC = req.imageC;
    if (req.imageD) data.imageD = req.imageD;
    if (req.imageE) data.imageE = req.imageE;
    if (req.imageExplanation) data.imageExplanation = req.imageExplanation;

    if (existingSoal) {
      soal = await prisma.tryout.update({
        where: {
          id: existingSoal.id,
        },
        data,
      });
    } else {
      soal = await prisma.tryout.create({
        data: {
          tryoutListId: tryoutListId,
          number: parseInt(number),
          createdAt: new Date(),
          ...data,
        },
      });
    }

    res.status(200).json(soal);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'An error occurred while creating or updating the tryout',
    });
  }
};

const getSoalByNumber = async (req, res) => {
  const tryoutListId = parseInt(req.params.id);
  const number = parseInt(req.params.number);

  try {
    const soal = await prisma.tryout.findFirst({
      where: {
        tryoutListId: tryoutListId,
        number: number,
      },
    });

    if (soal) {
      const totalSoal = await prisma.tryout.count({
        where: {
          tryoutListId: tryoutListId,
        },
      });

      res.status(200).json({ soal, totalSoal });
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

module.exports = { createSoal, getSoalByNumber };
