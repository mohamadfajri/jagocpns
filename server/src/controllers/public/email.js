const prisma = require('../../utils/prismaClient');

const searchEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const userEmail = req.user.email;

    if (!email || email.length < 4) {
      return res.status(400).json({
        message: 'Email harus memiliki minimal 4 karakter',
      });
    }

    if (email === userEmail) {
      return res.status(400).json({
        message: 'Anda memasukan email anda sendiri',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
      });
    } else {
      return res.status(404).json({
        message: 'Email tidak ditemukan',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Terjadi kesalahan saat mencari email',
    });
  }
};

module.exports = { searchEmail };
