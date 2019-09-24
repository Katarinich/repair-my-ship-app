import { Seeder } from 'mongoose-data-seed';

import models from '../models';

const data = [
  {
    title: 'Title #1',
    text: 'Sample Text'
  },
  {
    title: 'Title #2',
    text: 'Sample Text'
  },
  {
    title: 'Title #3',
    text: 'Sample Text'
  }
];

class PostsSeeder extends Seeder {
  async shouldRun() {
    return models.Post.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return models.Post.create(data);
  }
}

export default PostsSeeder;
