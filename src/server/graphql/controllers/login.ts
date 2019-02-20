import { UserInfo } from '../../mongo/models';
import { response } from '../../util/response';
import { Base64 } from 'js-base64';

const login = async (variables: any) => {
  const { username, password } = variables;
  if (!username) { return response('NO_USERNAME'); }
  if (!password) { return response('NO_PASSWORD'); }
  const docs: any = await UserInfo.find({ username }, (err, docs) => {
    if (err) { throw err; }
    return docs;
  });

  const { length } = docs;

  if (length === 0) {
    return response('USERNAME_OR_PASSWORD_ERROR');
  } else if (length === 1) {
    const [data] = docs;
    if ((username === data._doc.username) && (password === data._doc.password)) {
      return response('LOGIN_SUCCESS', { token: Base64.encode(data._doc._id) });
    } else {
      return response('USERNAME_OR_PASSWORD_ERROR');
    }
  } else {
    return response('USER_ACCOUNT_ABNORMALITY');
  }
};

export default login;
