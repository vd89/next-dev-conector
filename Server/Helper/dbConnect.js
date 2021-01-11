const { MONGO_URL } = require('../serverConfig');

const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL, mongooseOptions);
    console.log('Database is connected with the server....... 👍 👍');
  } catch (error) {
    console.log(' 🦅 🦅', error);
  }
};
module.exports = dbConnect;
