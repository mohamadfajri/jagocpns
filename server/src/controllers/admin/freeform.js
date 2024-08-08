const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFreeForm = async (req, res) => {
  const userId = req.user.id;
  const { tryoutListId } = req.params;

  if (!userId || !tryoutListId) {
    return res
      .status(400)
      .json({ error: 'userId and tryoutListId are required' });
  }

  try {
    const tryoutList = await prisma.tryoutList.findUnique({
      where: {
        id: Number(tryoutListId),
      },
    });

    if (!tryoutList) {
      return res.status(404).json({ error: 'TryoutList not found' });
    }
    if (tryoutList.price.toString() !== '0') {
      return res.status(400).json({
        error: 'This tryout is not free',
        message: tryoutList.price.toString(),
      });
    }

    const newFreeForm = await prisma.freeForm.create({
      data: {
        userId,
        tryoutListId: tryoutList.id,
      },
    });

    res.status(201).json(newFreeForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFormByUserId = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const freeForm = await prisma.freeForm.findFirst({
      where: {
        userId: userId,
      },
    });

    if (freeForm) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const checkOwnership = async (req, res) => {
  const userId = req.user.id;
  const { tryoutListId } = req.params;

  if (!userId || !tryoutListId) {
    return res
      .status(400)
      .json({ error: 'userId and tryoutListId are required' });
  }

  try {
    const ownership = await prisma.ownership.findFirst({
      where: {
        userId: Number(userId),
        tryoutListId: Number(tryoutListId),
      },
    });

    if (ownership) {
      return res.status(200).json({ status: true });
    }

    return res.status(200).json({
      status: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllFreeForm = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const freeForms = await prisma.freeForm.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const totalFreeForms = await prisma.freeForm.count();
    const totalPages = Math.ceil(totalFreeForms / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalFreeForms,
      data: freeForms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const confirmRequest = async (req, res) => {
  const { id, userId, tryoutListId } = req.body;

  if (!id || !userId || !tryoutListId) {
    return res
      .status(400)
      .json({ error: 'id, userId, and tryoutListId are required' });
  }

  try {
    await prisma.ownership.create({
      data: {
        userId,
        tryoutListId,
      },
    });
    await prisma.freeForm.delete({
      where: { id: Number(id) },
    });

    res
      .status(200)
      .json({ message: 'Request confirmed and data processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }

  try {
    await prisma.freeForm.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Data successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const confirmAll = async (req, res) => {
  try {
    const freeForms = await prisma.freeForm.findMany();
    const ownershipPromises = freeForms.map((freeForm) => {
      return prisma.ownership.create({
        data: {
          userId: freeForm.userId,
          tryoutListId: freeForm.tryoutListId,
        },
      });
    });

    await Promise.all(ownershipPromises);
    await prisma.freeForm.deleteMany();

    res.status(200).json({
      message:
        'All FreeForm entries have been confirmed and moved to Ownership',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const handleDeleteAll = async (req, res) => {
  try {
    await prisma.freeForm.deleteMany();

    res.status(200).json({ message: 'All FreeForm entries have been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createFreeForm,
  getAllFreeForm,
  confirmRequest,
  deleteRequest,
  confirmAll,
  handleDeleteAll,
  getFormByUserId,
  checkOwnership,
};
