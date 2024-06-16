const jwt = require('jsonwebtoken');

const adminOnly = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token.split(' ')[1], 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      if (req.user.role !== 'questioner') {
        return res.status(403).json({
          message: 'Anda tidak memiliki izin untuk mengakses sumber daya ini',
        });
      }

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = adminOnly;
