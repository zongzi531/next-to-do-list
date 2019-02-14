import { Request, Response, NextFunction } from 'express';
import { UserInfo } from '../../mongo/models';
import { response } from '../../util/response';
import { check, validationResult, Validator } from 'express-validator/check';
import { IExpressValidatorError } from '../../util/express-validator-interface';

export const path = '/regist';

export const validatior: Validator[] = [
  check('username', 'NO_USERNAME').exists({ checkFalsy: true }),
  check('password', 'NO_PASSWORD').exists({ checkFalsy: true })
];

export const callback = async (req: Request, res: Response, next: NextFunction) => {
  const [errors] = validationResult<IExpressValidatorError>(req).array();

  if (errors) { res.json(response(errors.msg)); return next(); }

  const { username, password } = req.body;

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
    res.json(response('REGISTED_SUCCESS'));
  } else if (length === 1) {
    res.json(response('USER_REGISTED'));
  } else {
    res.json(response('USER_ACCOUNT_ABNORMALITY'));
  }
  next();
};
