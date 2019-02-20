import { UserInfo } from '../../mongo/models';
import { response } from '../../util/response';

const regist = async (variables: any) => {
  const { username, password } = variables;
  if (!username) { return response('NO_USERNAME'); }
  if (!password) { return response('NO_PASSWORD'); }

  const docs = await UserInfo.find({ username }, (err, docs) => {
    if (err) { throw err; }
    return docs;
  });

  const { length } = docs;

  if (length === 0) {
    const userinfo = new UserInfo({
      username,
      password
    });
    await new Promise((resolve, reject) => {
      userinfo.save((err, docs) => {
        if (err) { throw err; }
        resolve(docs);
      });
    });
    return response('REGISTED_SUCCESS');
  } else if (length === 1) {
    return response('USER_REGISTED');
  } else {
    return response('USER_ACCOUNT_ABNORMALITY');
  }
};

export default regist;