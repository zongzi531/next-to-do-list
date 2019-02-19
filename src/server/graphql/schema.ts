import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    message: String
    code: Int
    token: String
  }
`);

export default schema;
