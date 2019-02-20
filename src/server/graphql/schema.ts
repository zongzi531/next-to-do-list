import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type ToDoList {
    todoId: String
    color: String
    content: String
    status: String
  }

  type Query {
    message: String
    code: Int
    token: String
    todoId: String
    finishedList: [ToDoList]
    unfinishedList: [ToDoList]
  }

  type Mutation {
    message: String
    code: Int
  }
`);

export default schema;
