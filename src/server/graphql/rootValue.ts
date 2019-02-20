import { GQLRootValue } from '../interfaces';
import API from './api';
import controllers from './controllers';
import { response as Response } from '../util/response';

const rootValue: GQLRootValue = async (request, response, graphQLParams) => {
  if (!graphQLParams) {
    return {};
  }
  const { variables, operationName } = graphQLParams;
  switch (operationName) {
    case API.LOGIN:
      return await controllers.login(variables);
    case API.REGIST:
      return await controllers.regist(variables);
    case API.ADDTODO:
      return await controllers.addTodo(variables);
    case API.GETTODOLIST:
      return await controllers.getTodoList(variables);
    case API.UPDATETODO:
      return await controllers.updateTodo(variables);
    default:
      return Response('OPERATION_NOT_REGISTERED');
  }
};

export default rootValue;
