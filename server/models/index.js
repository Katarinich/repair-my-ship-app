import mongoose from 'mongoose';

import Post from './post';

const connectDb = () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};

const models = { Post };

export { connectDb };

export default models;
