const toCursorHash = string => Buffer.from(string).toString("base64");

const fromCursorHash = string =>
  Buffer.from(string, "base64").toString("ascii");

export default {
  Query: {
    posts: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor)
            }
          }
        : {};
      const posts = await models.Post.find(cursorOptions, null, {
        sort: { createdAt: -1 },
        limit: limit + 1
      });

      const hasNextPage = posts.length > limit;
      const edges = hasNextPage ? posts.slice(0, -1) : posts;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
    },
    post: async (parent, { id }, { models }) => {
      return await models.Post.findById(id);
    }
  },

  Mutation: {
    createPost: async (parent, { text, title }, { models }) => {
      const post = await models.Post.create({
        text,
        title
      });

      return post;
    }
  }
};
