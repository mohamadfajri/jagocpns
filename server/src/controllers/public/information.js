const prisma = require('../../utils/prismaClient');

const getInformationByType = async (req, res) => {
  const { type } = req.params;

  try {
    if (!['banner', 'info', 'news'].includes(type)) {
      return res.status(400).json({ message: 'Tipe informasi tidak valid' });
    }
    const information = await prisma.information.findMany({
      where: {
        type: type,
      },
    });

    res.json(information);
  } catch (error) {
    console.error('Error:', error);

    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat mencoba mengambil informasi' });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await prisma.links.findMany();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch links' });
  }
};

module.exports = { getInformationByType, getLinks };
