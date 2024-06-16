const express = require('express');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const questionerRoutes = require('./routes/questioner');
const publicRoutes = require('./routes/public');
const path = require('path');

const upload = require('./utils/multer');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../uploads')));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Bad JSON' });
  }
  next();
});

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', questionerRoutes);
app.use('/api', publicRoutes);

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json(req.file);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
