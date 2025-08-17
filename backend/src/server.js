require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

// route hello
app.get('/api', (_, res) => res.json({ message: 'Hello from TJKT Backend!' }));

// connect DB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server ready at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));