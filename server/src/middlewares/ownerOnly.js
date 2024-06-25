const prisma = require('../utils/prismaClient');
const jwt = require('jsonwebtoken');

const ownerOnly = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET);
    const userId = decoded.id;
    const tryoutListId = parseInt(req.params.id);

    const ownership = await prisma.ownership.findFirst({
      where: {
        userId: userId,
        tryoutListId: tryoutListId,
      },
    });

    if (ownership) {
      next();
    } else {
      res.status(403).json({ message: 'Anda tidak memiliki tryout ini' });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token kadaluarsa' });
    }
    console.log(error);
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};

module.exports = ownerOnly;
