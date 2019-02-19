import graphqlHTTP from 'express-graphql';
import { GQLOptions } from '../interfaces';
import schema from './schema';
import rootValue from './rootValue';

const options: GQLOptions = async (request, response, graphQLParams) => ({
  schema,
  rootValue: await rootValue(request, response, graphQLParams),
  graphiql: true,
});

export default graphqlHTTP(options);
