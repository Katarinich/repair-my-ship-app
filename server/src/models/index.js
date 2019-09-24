import mongoose from 'mongoose';

import Post from './post';

const connectDb = () => {
  if (process.env.MONGODB_URI) {
    return mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};

const models = { Post };

export { connectDb };

export default models;
