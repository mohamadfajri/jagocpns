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

const createLink = async (req, res) => {
  const { url, title } = req.body;
  const imageUrl = req.image;

  if (!url || !title || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newLink = await prisma.links.create({
      data: {
        url: url,
        title: title,
        imageUrl: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: 'Link created successfully', link: newLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await prisma.links.findUnique({
      where: { id: parseInt(id) },
    });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    await prisma.links.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getInformationByType, createLink, getLinks, deleteLink };
