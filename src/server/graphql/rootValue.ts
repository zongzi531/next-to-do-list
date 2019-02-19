import { GQLRootValue } from '../interfaces';
import API from './api';
import { UserInfo } from '../mongo/models';
import { response as Response } from '../util/response';
import { Base64 } from 'js-base64';

const rootValue: GQLRootValue = async (request, response, graphQLParams) => {
  if (!graphQLParams) {
    return {};
  }
  const { variables, operationName } = graphQLParams;
  console.log(variables, operationName);
  switch (operationName) {
    case API.LOGIN:
      const { username, password } = variables as any;
      if (!username) { return Response('NO_USERNAME'); }
      if (!password) { return Response('NO_PASSWORD'); }
      const docs: any = await UserInfo.find({ username }, (err, docs) => {
        if (err) { throw err; }
        return docs;
      });

      const { length } = docs;

      if (length === 0) {
        return Response('USERNAME_OR_PASSWORD_ERROR');
      } else if (length === 1) {
        const [data] = docs;
        if ((username === data._doc.username) && (password === data._doc.password)) {
          return Response('LOGIN_SUCCESS', { token: Base64.encode(data._doc._id) });
        } else {
          return Response('USERNAME_OR_PASSWORD_ERROR');
        }
      } else {
        return Response('USER_ACCOUNT_ABNORMALITY');
      }
    default:
      return {
        message: 'xx',
        code: 1,
      };
  }
};

export default rootValue;
