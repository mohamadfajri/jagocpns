const express = require('express');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const questionerRoutes = require('./routes/questioner');
const publicRoutes = require('./routes/public');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(fileUpload());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Bad JSON' });
  }
  next();
});

const corsOptions = {
  origin: 'https://jagocpns.id',
};

app.use(cors(corsOptions));

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', questionerRoutes);
app.use('/api', publicRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Nyari apaan bang?' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
