const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const acceptType = ['image/png', 'image/jpg', 'image/jpeg'];

  if (!acceptType.includes(file.mimetype)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
