const jwt = require('jsonwebtoken');

const decoder = (token) => {
  const secret = process.env.SECRET;
  const result = jwt.verify(token.split(' ')[1], secret);

  return result;
};

module.exports = decoder;
