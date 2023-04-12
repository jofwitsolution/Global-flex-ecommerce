const mongoose = require('mongoose');

const conn = mongoose.connection;

mongoose.set('strictQuery', true);
const connectDatabase = () => {
  const db = process.env.DB_URL;

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.on('error', (err) =>
    console.error('Could not connect to MongoDB...', err)
  );
  conn.once('open', () => console.log('Connected to MongoDB'));
};

module.exports.connectDatabase = connectDatabase;
module.exports.conn = conn;
