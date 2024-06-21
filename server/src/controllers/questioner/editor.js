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

  const image = req.file;

  try {
    const existingSoal = await prisma.tryout.findFirst({
      where: {
        tryoutListId: tryoutListId,
        number: number,
      },
    });

    let soal;
    if (existingSoal) {
      soal = await prisma.tryout.update({
        where: {
          id: existingSoal.id,
        },
        data: {
          type,
          question,
          scoreA: parseInt(scoreA),
          scoreB: parseInt(scoreB),
          scoreC: parseInt(scoreC),
          scoreD: parseInt(scoreD),
          scoreE: parseInt(scoreE),
          explanation,
          imageUrl: image
            ? `/uploads/${image.filename}`
            : existingSoal.imageUrl,
          optionA,
          optionB,
          optionC,
          optionD,
          optionE,
          updatedAt: new Date(),
        },
      });
    } else {
      soal = await prisma.tryout.create({
        data: {
          tryoutListId: tryoutListId,
          type,
          number,
          question,
          scoreA: parseInt(scoreA),
          scoreB: parseInt(scoreB),
          scoreC: parseInt(scoreC),
          scoreD: parseInt(scoreD),
          scoreE: parseInt(scoreE),
          explanation,
          imageUrl: image ? `/uploads/${image.filename}` : '',
          optionA,
          optionB,
          optionC,
          optionD,
          optionE,
          createdAt: new Date(),
          updatedAt: new Date(),
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
