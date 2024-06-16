const jwt = require('jsonwebtoken');

const userOnly = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' });
  }

  jwt.verify(token.split(' ')[1], process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' });
    }
    req.user = user;
    next();
  });
};

module.exports = userOnly;
