import { GraphQLParams, OptionsData } from 'express-graphql';
import { Request, Response } from 'express';

export type GQLOptions = (request: Request, response: Response, graphQLParams?: GraphQLParams) => Promise<OptionsData>;

export type GQLRootValue = (request: Request, response: Response, graphQLParams?: GraphQLParams) => Promise<{
  [name: string]: any
}>;
