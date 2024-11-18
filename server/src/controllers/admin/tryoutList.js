const prisma = require("../../utils/prismaClient");

const createTryout = async (req, res) => {
  const { title, price, description, batch, type, whatsappLink } = req.body;
  const batchInt = parseInt(batch, 10);

  try {
    await prisma.tryoutList.create({
      data: {
        title,
        price: BigInt(price),
        imageUrl: req.image,
        description,
        batch: batchInt,
        type: type,
        whatsappLink: whatsappLink || "",
      },
    });
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create tryout list", error });
  }
};
const updateTryout = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    price,
    description,
    status,
    statusKerjakan,
    batch,
    type,
    whatsappLink,
  } = req.body;
  const stringToBool = (str) => str === "true";
  const statusFormatted = stringToBool(status);
  const statusKerjakanFormatted = stringToBool(statusKerjakan);
  const image = req.image;
  const batchInt = parseInt(batch, 10);

  try {
    let updatedData = {
      title,
      price: BigInt(price),
      description,
      status: statusFormatted,
      isOnline: statusKerjakanFormatted,
      batch: batchInt,
      type: type,
      whatsappLink: whatsappLink || "",
    };

    if (image) {
      updatedData.imageUrl = req.image;
    }

    const updatedTryout = await prisma.tryoutList.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.status(200).json({ message: "Tryout updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update tryout", error });
  }
};

const getAllTryouts = async (req, res) => {
  try {
    const tryouts = await prisma.tryoutList.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = tryouts.map((tryout) => ({
      id: tryout.id,
      title: tryout.title,
      price: tryout.price.toString(),
      imageUrl: tryout.imageUrl,
      description: tryout.description,
      status: tryout.status,
      statusKerjakan: tryout.isOnline,
    }));

    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tryouts", error });
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
      orderBy: {
        title: "asc",
      },
    });

    const data = tryouts.map((tryout) => ({
      id: tryout.id,
      title: tryout.title,
      price: tryout.price.toString(),
      imageUrl: tryout.imageUrl,
      description: tryout.description,
      status: tryout.status,
      statusKerjakan: tryout.isOnline,
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
    res.status(500).json({ message: "Failed to fetch tryouts", error });
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
      batch: tryout.batch,
      status: tryout.status,
      statusKerjakan: tryout.isOnline,
      type: tryout.type,
      whatsappLink: tryout.whatsappLink || "",
    };
    if (!tryout) {
      return res.status(404).json({ message: "Tryout not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tryout", error });
  }
};

const deleteTryout = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tryoutList.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Tryout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete tryout", error });
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
        number: "asc",
      },
    });

    res.status(200).json(tryouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTryoutToOwnership = async (req, res) => {
  const { userId, tryoutListId } = req.body;

  if (!userId || !tryoutListId) {
    return res
      .status(400)
      .json({ error: "userId and tryoutListId are required" });
  }

  try {
    const existingOwnership = await prisma.ownership.findFirst({
      where: {
        userId: Number(userId),
        tryoutListId: Number(tryoutListId),
      },
    });

    if (existingOwnership) {
      return res.status(400).json({
        message: "Anda sudah memiliki tryout ini, silahkan cek di Dashboard",
      });
    }

    const newOwnership = await prisma.ownership.create({
      data: {
        userId: Number(userId),
        tryoutListId: Number(tryoutListId),
        isDone: false,
      },
    });

    res.status(201).json({
      message: "Tryout berhasil ditambahkan ke Ownership",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUserOwnershipList = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const ownerships = await prisma.ownership.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        tryoutList: true,
      },
    });

    const format = ownerships.map((item) => ({
      id: item.tryoutList.id,
      title: item.tryoutList.title,
    }));

    res.status(200).json({
      message: "Daftar tryout yang dimiliki user berhasil diambil",
      list: format,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTryoutFromOwnership = async (req, res) => {
  const { userId, tryoutListId } = req.params;

  if (!userId || !tryoutListId) {
    return res
      .status(400)
      .json({ error: "userId and tryoutListId are required" });
  }

  try {
    // Mencari apakah ownership ada
    const existingOwnership = await prisma.ownership.findFirst({
      where: {
        userId: Number(userId),
        tryoutListId: Number(tryoutListId),
      },
    });

    if (!existingOwnership) {
      return res.status(404).json({
        message: "Ownership tidak ditemukan",
      });
    }

    // Menghapus data score yang berhubungan
    await prisma.score.deleteMany({
      where: {
        userId: Number(userId),
        tryoutListId: Number(tryoutListId),
      },
    });

    // Menghapus data answer yang berhubungan
    await prisma.answer.deleteMany({
      where: {
        userId: Number(userId),
        tryoutListId: Number(tryoutListId),
      },
    });

    // Menghapus ownership
    await prisma.ownership.delete({
      where: {
        id: existingOwnership.id,
      },
    });

    res.status(200).json({
      message: "Tryout berhasil dihapus dari Ownership, Score, dan Answer",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTryOutOwnershipCount = async (req, res) => {
  const { tryoutListId } = req.params;
  const id = parseInt(tryoutListId);
  try {
    const ownershipCount = await prisma.ownership.count({
      where: {
        tryoutListId: id,
      },
    });
    res.status(200).json({
      message: "Tryout ownership count retrieved successfully",
      tryoutListId: tryoutListId,
      ownershipCount: ownershipCount,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve tryout ownership count" });
  }
};

const getTryoutOwner = async (req, res) => {
  try {
    const { tryoutListId } = req.params;
    const page = parseInt(req.query.page, 10) || 1; // Halaman saat ini
    const limit = parseInt(req.query.limit, 10) || 10; // Jumlah data per halaman
    const offset = (page - 1) * limit;

    // Validasi input
    if (!tryoutListId || isNaN(tryoutListId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tryoutListId",
      });
    }

    // Hitung total data
    const totalItems = await prisma.user.count({
      where: {
        ownerships: {
          some: {
            tryoutListId: parseInt(tryoutListId, 10),
          },
        },
      },
    });

    // Hitung total halaman
    const totalPages = Math.ceil(totalItems / limit);

    // Query untuk mendapatkan data user
    const users = await prisma.user.findMany({
      where: {
        ownerships: {
          some: {
            tryoutListId: parseInt(tryoutListId, 10),
          },
        },
      },
      select: {
        email: true,
        profile: {
          select: {
            phone: true,
          },
        },
      },
      skip: offset,
      take: limit,
    });

    res.status(200).json({
      success: true,
      data: users,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        rowsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching tryout owner:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tryout owner",
    });
  }
};

module.exports = {
  createTryout,
  getTryoutById,
  getTryout,
  deleteTryout,
  updateTryout,
  getTryouts,
  addTryoutToOwnership,
  getUserOwnershipList,
  deleteTryoutFromOwnership,
  getAllTryouts,
  getTryOutOwnershipCount,
  getTryoutOwner,
};
