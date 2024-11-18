const prisma = require("../../utils/prismaClient");

const createTransaction = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  const randomNumber = Math.floor(Math.random() * 999) + 1;
  const updatedAmount = BigInt(amount) + BigInt(randomNumber);

  try {
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        status: {
          in: ["unpaid", "checking"],
        },
      },
    });

    if (existingTransaction) {
      return res.status(400).json({
        message: "User already has an unpaid or checking transaction",
      });
    }

    await prisma.transaction.create({
      data: {
        userId: userId,
        amount: updatedAmount,
        status: "unpaid",
      },
    });

    res.status(201).json({ message: "Transaksi berhasil dibuat" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal membuat transaksi baru" });
  }
};

const createVerification = async (req, res) => {
  const userId = parseInt(req.user.id);
  const imageUrl = req.image ? req.image : null;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        status: "unpaid",
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: "checking",
        imageUrl: imageUrl,
      },
    });

    res.status(200).json({
      message: "Verification created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create verification" });
  }
};

const getSuccessTransaction = async (req, res) => {
  const userId = parseInt(req.user.id);

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        status: "paid",
      },
    });

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No paid transactions found" });
    }

    const getId = (date, id) => {
      const ddmmyyyy = `${date.getDate().toString().padStart(2, "0")}${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}${date.getFullYear()}`;
      const formattedId = `JAGO-${ddmmyyyy}${id}`;
      return formattedId;
    };

    const format = transactions.map((t) => ({
      id: t.id,
      date: t.updatedAt,
      description: getId(t.updatedAt, t.id),
      amount: t.amount.toString(),
    }));

    res.status(200).json({
      message: "Paid transactions retrieved successfully",
      data: format,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to retrieve transactions" });
  }
};

const getTransactionStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        status: {
          not: "paid",
        },
      },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Tidak ada transaksi aktif untuk pengguna ini" });
    }

    res.status(200).json({
      transaction: transaction.status,
      status:
        transaction.status === "unpaid"
          ? true
          : transaction.status === "checking"
          ? true
          : false,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mencoba mendapatkan status transaksi",
    });
  }
};

const getUserTrasactions = async (req, res) => {
  const userId = req.user.id;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    if (!transactions) {
      return res.status(404).json({
        message: "Transaction Not Found!",
      });
    }

    const serializedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(), // Mengkonversi BigInt ke string
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
    }));

    const getId = (date, id) => {
      const ddmmyyyy = `${date.getDate().toString().padStart(2, "0")}${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}${date.getFullYear()}`;
      const formattedId = `JAGO-${ddmmyyyy}${id}`;
      return formattedId;
    };

    const format = transactions.map((t) => ({
      id: t.id,
      date: t.updatedAt,
      description: getId(t.updatedAt, t.id),
      amount: t.amount.toString(),
      status: t.status
    }));

    return res.status(200).json({ data: format });
  } catch (error) {
    return res.status(500).json({
      message: "Error get user transactions",
      error: error.message,
    });
  }
};

const cancelTransaction = async (req, res) => {
  const userId = req.user.id;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        status: "unpaid",
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "No unpaid transaction found" });
    }
    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    return res
      .status(200)
      .json({ message: "Transaction cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling transaction:", error);
    return res
      .status(500)
      .json({ message: "Failed to cancel transaction", error: error.message });
  }
};

const getTransaction = async (req, res) => {
  const userId = req.user.id;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId: parseInt(userId),
        OR: [{ status: "unpaid" }, { status: "checking" }],
      },
      include: {
        user: {
          select: {
            email: true,
            profile: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const createdAt = new Date(transaction.createdAt);
    const ddmmyyyy = `${createdAt.getDate().toString().padStart(2, "0")}${(
      createdAt.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${createdAt.getFullYear()}`;
    const uniquePart = transaction.amount.toString().slice(-3);
    const formattedId = `JAGO-${ddmmyyyy}${transaction.id}`;

    const response = {
      id: formattedId,
      email: transaction.user.email,
      name: transaction.user.profile.name,
      unique: uniquePart,
      amount: transaction.amount.toString(),
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
};

const DISCOUNT_CODES = {
  JAGOCPNS: { amount: 10000n, type: "fixed" },
  WELCOME50: { amount: 50n, type: "percentage" },
  FLASH25: { amount: 25n, type: "percentage" },
};

const calculateDiscount = (price, discountCode) => {
  const discountInfo = DISCOUNT_CODES[discountCode];
  if (!discountInfo) return 0n;

  if (discountInfo.type === "fixed") {
    return discountInfo.amount;
  } else if (discountInfo.type === "percentage") {
    return (price * discountInfo.amount) / 100n;
  }
  return 0n;
};

const checkout = async (req, res) => {
  const userId = Number(req.user.id);
  const { tryoutListId, target, discountCode } = req.body;

  try {
    if (!tryoutListId || typeof tryoutListId !== "number") {
      return res.status(400).json({ message: "ID tryout tidak valid" });
    }

    if (!Array.isArray(target) || target.length === 0) {
      return res
        .status(400)
        .json({ message: "Target list is invalid or empty" });
    }

    const targetIds = target.map((user) => {
      const id = Number(user.id);
      if (isNaN(id) || id <= 0) {
        throw new Error("Invalid user ID format");
      }
      return id;
    });

    // Start database transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Verify all target users exist
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: targetIds,
          },
        },
        select: {
          id: true,
          email: true,
        },
      });

      if (users.length !== targetIds.length) {
        throw new Error("Satu atau lebih user tidak ditemukan");
      }

      // Get tryout details
      const tryout = await prisma.tryoutList.findUnique({
        where: { id: tryoutListId },
        select: {
          id: true,
          price: true,
          status: true,
          title: true,
        },
      });

      if (!tryout) {
        throw new Error("Tryout tidak ditemukan");
      }

      if (!tryout.status) {
        throw new Error("Tryout tidak tersedia untuk dibeli");
      }

      // Calculate price with discount
      let basePrice = tryout.price;
      let discountAmount = 0n;

      if (discountCode) {
        const upperDiscountCode = discountCode.trim().toUpperCase();
        if (!DISCOUNT_CODES[upperDiscountCode]) {
          throw new Error("Kode diskon tidak valid");
        }
        discountAmount = calculateDiscount(basePrice, upperDiscountCode);
      }

      // Calculate final price
      const priceAfterDiscount = basePrice - discountAmount;
      const totalPrice =
        target.length > 1
          ? (priceAfterDiscount * BigInt(target.length)) / BigInt(2)
          : priceAfterDiscount;

      // Check user balance
      const userBalance = await prisma.balance.findUnique({
        where: { userId },
        select: { amount: true },
      });

      if (!userBalance) {
        throw new Error("Saldo user tidak ditemukan");
      }

      if (userBalance.amount < totalPrice) {
        throw new Error("Saldo tidak cukup");
      }

      // Check existing ownerships
      const existingOwnerships = await prisma.ownership.findMany({
        where: {
          tryoutListId,
          userId: {
            in: targetIds,
          },
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (existingOwnerships.length > 0) {
        const userEmails = existingOwnerships.map(
          (ownership) => ownership.user.email
        );
        throw new Error(
          `User(s) ${userEmails.join(", ")} sudah memiliki tryout ini`
        );
      }

      // Update balance
      await prisma.balance.update({
        where: { userId },
        data: { amount: userBalance.amount - totalPrice },
      });

      // Create ownerships
      const ownerships = targetIds.map((targetUserId) => ({
        userId: targetUserId,
        tryoutListId,
        isDone: false,
      }));

      await prisma.ownership.createMany({ data: ownerships });

      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          amount: totalPrice,
          status: "paid",
        },
      });

      // Create payment records
      const payments = targetIds.map((targetUserId) => ({
        userId: targetUserId,
        tryoutListId,
      }));

      await prisma.payment.createMany({ data: payments });

      return {
        transactionId: transaction.id,
        originalPrice: basePrice.toString(),
        discount: discountAmount.toString(),
        finalPrice: totalPrice.toString(),
        tryoutTitle: tryout.title,
      };
    });

    return res.status(200).json({
      message: "Pembelian tryout berhasil",
      data: {
        transactionId: result.transactionId,
        originalPrice: result.originalPrice,
        discount: result.discount,
        finalPrice: result.finalPrice,
        tryoutTitle: result.tryoutTitle,
      },
    });
  } catch (error) {
    console.error("Checkout Error:", error);

    const errorMessages = {
      "Saldo tidak cukup": 400,
      "Tryout tidak ditemukan": 404,
      "Tryout tidak tersedia untuk dibeli": 400,
      "Satu atau lebih user tidak ditemukan": 404,
      "Kode diskon tidak valid": 400,
      "User(s) sudah memiliki tryout ini": 400,
    };

    const statusCode = errorMessages[error.message] || 500;

    return res.status(statusCode).json({
      message: error.message || "Terjadi kesalahan saat checkout",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

module.exports = {
  createTransaction,
  createVerification,
  getTransactionStatus,
  getTransaction,
  getSuccessTransaction,
  checkout,
  getUserTrasactions,
  cancelTransaction,
};
