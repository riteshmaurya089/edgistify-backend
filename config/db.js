const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('MongoDB connected');
});

connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});
