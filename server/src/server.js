const express = require('express');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

app.get('/', (req, res) => {
  return res.json('hello world');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
