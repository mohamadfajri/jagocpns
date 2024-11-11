const prisma = require("../../utils/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const decoder = require("../../utils/decoder");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, phone, province, gender, instance } = req.body;
  try {
    const profile = await prisma.profile.create({
      data: {
        userId,
        name,
        phone,
        province,
        gender,
        instance,
      },
    });
    res.status(201).json({ profile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile tidak ditemukan" });
    }
    const profileWithEmail = {
      ...profile,
      email: user.email,
    };
    res.json(profileWithEmail);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: "user",
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mencoba masuk sebagai user" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password lama salah" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mencoba mengubah password" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, province, phone, gender, instance } = req.body;

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        name,
        province,
        phone,
        gender,
        instance,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Profil berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui profil",
      error: error.message,
    });
  }
};

const getUserTryouts = async (req, res) => {
  const userId = req.user.id;

  try {
    const allTryouts = await prisma.tryoutList.findMany();
    const completedScores = await prisma.score.findMany({
      where: {
        userId: userId,
      },
      select: {
        tryoutListId: true,
      },
    });

    const completedTryoutIds = completedScores.map(
      (score) => score.tryoutListId
    );

    const tryoutsCompleted = allTryouts.filter((tryout) =>
      completedTryoutIds.includes(tryout.id)
    );
    const tryoutsNotCompleted = allTryouts.filter(
      (tryout) => !completedTryoutIds.includes(tryout.id)
    );

    res.status(200).json({
      tryoutsCompleted,
      tryoutsNotCompleted,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mencoba mengambil data tryout",
    });
  }
};

const getUserTryOutById = async (req, res) => {
  const userId = req.user.id;
  const tryOutListId= parseInt(req.params.tryoutListId);
  try {
    const data = await prisma.ownership.findMany({
      where: {
        userId,
        tryoutListId: tryOutListId
      },
      include: {
        tryoutList: {
          select:{
            title: true
          }
        }
      }
    });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mencoba mengambil data tryout",
      });
  }
};

const getListByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const ownerships = await prisma.ownership.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        tryoutList: true,
      },
    });

    const done = ownerships.filter((ownership) => ownership.isDone);
    const undone = ownerships.filter((ownership) => !ownership.isDone);

    const formatDone = done.map((d) => ({
      id: d.id,
      tryoutListId: d.tryoutListId,
      title: d.tryoutList.title,
      imageUrl: d.tryoutList.imageUrl,
      description: d.tryoutList.description,
    }));
    const formatUndone = undone.map((d) => ({
      id: d.id,
      tryoutListId: d.tryoutListId,
      title: d.tryoutList.title,
      imageUrl: d.tryoutList.imageUrl,
      description: d.tryoutList.description,
    }));

    res.status(200).json({
      done: formatDone,
      undone: formatUndone,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get ownerships by user ID" });
  }
};

const getSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    const balance = await prisma.balance.findUnique({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
      },
    });
    const myOwnTryoutsCount = await prisma.ownership.count({
      where: {
        userId: userId,
      },
    });
    const totalUserCount = await prisma.user.count();
    res.status(200).json({
      balance: balance ? balance.amount.toString() : 0,
      myOwnTryouts: myOwnTryoutsCount ? myOwnTryoutsCount : 0,
      totalUser: totalUserCount + 5000,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

module.exports = {
  createUser,
  createProfile,
  getUser,
  userSignin,
  changePassword,
  getUserTryouts,
  getListByUserId,
  getSummary,
  updateProfile,
  getUserTryOutById,
};
