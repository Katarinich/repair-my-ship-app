import 'dotenv/config';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message
    };
  },
  context: ({ req }) => {
    const recaptcha = req.headers['g-recaptcha-response'];

    return { models, recaptcha };
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const port = process.env.PORT || 8000;

connectDb().then(() => {
  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});
