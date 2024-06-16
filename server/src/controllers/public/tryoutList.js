const prisma = require('../../prismaClient');

const getAllTryout = async (req, res) => {
  try {
    const tryouts = await prisma.tryoutList.findMany();
    return res.status(200).json({ tryouts });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mengambil data tryout',
    });
  }
};

const getTryoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const tryout = await prisma.tryoutList.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!tryout) {
      return res.status(404).json({ message: 'Tryout tidak ditemukan' });
    }

    return res.status(200).json(tryout);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat mencoba mengambil data tryout',
    });
  }
};

const getTryoutByName = async (req, res) => {
  const { name } = req.query;

  try {
    const tryouts = await prisma.tryoutList.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (tryouts.length === 0) {
      return res.status(404).json({
        message: 'Tidak ada tryout yang ditemukan dengan nama tersebut',
      });
    }

    return res.status(200).json(tryouts);
  } catch (error) {
    console.error('Error:', error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mencoba mencari data tryout' });
  }
};

module.exports = { getAllTryout, getTryoutById, getTryoutByName };
