import { Request, Response, NextFunction } from 'express';
import { UserInfo } from '../../mongo/models';
import { response } from '../../util/response';
import { Base64 } from 'js-base64';
import { check, validationResult } from 'express-validator/check';
import { IExpressValidatorError } from '../../util/express-validator-interface';

export const path = '/login';

export const validatior = [
  check('username', 'NO_USERNAME').exists({ checkFalsy: true }),
  check('password', 'NO_PASSWORD').exists({ checkFalsy: true })
];

export const callback = async (req: Request, res: Response, next: NextFunction) => {
  const [errors] = validationResult<IExpressValidatorError>(req).array();

  if (errors) { res.json(response(errors.msg)); return next(); }

  const { username, password } = req.body;

  const docs: any = await UserInfo.find({ username }, (err, docs) => {
    if (err) { throw err; }
    return docs;
  });

  const { length } = docs;

  if (length === 0) {
    res.json(response('USERNAME_OR_PASSWORD_ERROR'));
  } else if (length === 1) {
    const [data] = docs;
    if ((username === data._doc.username) && (password === data._doc.password)) {
      res.json(response('LOGIN_SUCCESS', { token: Base64.encode(data._doc._id) }));
    } else {
      res.json(response('USERNAME_OR_PASSWORD_ERROR'));
    }
  } else {
    res.json(response('USER_ACCOUNT_ABNORMALITY'));
  }
  next();
};
