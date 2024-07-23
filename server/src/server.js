const express = require('express');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const questionerRoutes = require('./routes/questioner');
const publicRoutes = require('./routes/public');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load .env file if exists

const app = express();
const port = process.env.PORT || 443; // Default to port 443 if PORT is not set

app.use(express.json());
app.use(fileUpload());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Bad JSON' });
  }
  next();
});

const corsOptions = {
  origin: ['https://jagocpns.id', 'http://localhost:5173'],
};

app.use(cors(corsOptions));

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', questionerRoutes);
app.use('/api', publicRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Nyari apaan bang?' });
});

// Baca sertifikat dan kunci pribadi
const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/server.jagocpns.id/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/server.jagocpns.id/fullchain.pem'),
};

// Buat server HTTPS
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});

