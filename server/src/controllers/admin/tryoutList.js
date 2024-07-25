const prisma = require('../../utils/prismaClient');

const createTryout = async (req, res) => {
  const { title, price, description } = req.body;

  try {
    await prisma.tryoutList.create({
      data: {
        title,
        price: BigInt(price),
        imageUrl: req.image,
        description,
      },
    });
    res.status(201).json({ message: 'created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create tryout list', error });
  }
};

const getTryout = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const tryouts = await prisma.tryoutList.findMany({
      skip,
      take: limit,
    });

    const data = tryouts.map((tryout) => ({
      id: tryout.id,
      title: tryout.title,
      price: tryout.price.toString(),
      imageUrl: tryout.imageUrl,
      description: tryout.description,
      status: tryout.status,
    }));

    const totalTryouts = await prisma.tryoutList.count();

    const totalPages = Math.ceil(totalTryouts / limit);

    res.status(200).json({
      data,
      meta: {
        page,
        limit,
        totalPages,
        totalTryouts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tryouts', error });
  }
};

const getTryoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const tryout = await prisma.tryoutList.findUnique({
      where: { id: parseInt(id) },
    });
    const data = {
      id: tryout.id,
      title: tryout.title,
      price: tryout.price.toString(),
      imageUrl: tryout.imageUrl,
      description: tryout.description,
      status: tryout.status,
    };
    if (!tryout) {
      return res.status(404).json({ message: 'Tryout not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tryout', error });
  }
};

const updateTryout = async (req, res) => {
  const { id } = req.params;
  const { title, price, description, status } = req.body;
  const stringToBool = (str) => str === 'true';
  const statusFormatted = stringToBool(status);
  const image = req.image;

  try {
    let updatedData = {
      title,
      price: BigInt(price),
      description,
      status: statusFormatted,
    };

    if (image) {
      updatedData.imageUrl = req.image;
    }

    const updatedTryout = await prisma.tryoutList.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.status(200).json({ message: 'Tryout updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update tryout', error });
  }
};

const deleteTryout = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tryoutList.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Tryout deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete tryout', error });
  }
};

const getTryouts = async (req, res) => {
  const { tryoutListId } = req.params;

  try {
    const tryouts = await prisma.tryout.findMany({
      where: {
        tryoutListId: parseInt(tryoutListId),
      },
      orderBy: {
        number: 'asc',
      },
    });

    res.status(200).json(tryouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTryout,
  getTryoutById,
  getTryout,
  deleteTryout,
  updateTryout,
  getTryouts,
};
