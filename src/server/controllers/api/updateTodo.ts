
import { Request, Response, NextFunction } from 'express';
import { TodoList } from '../../mongo/models';
import { response } from '../../util/response';
import { isStatus, isColor } from '../../util/params';
import { Base64 } from 'js-base64';
import { check, validationResult } from 'express-validator/check';
import { IExpressValidatorError } from '../../util/express-validator-interface';

export const path = '/updateTodo';

export const validatior = [
  check('token', 'NO_TOKEN').exists({ checkFalsy: true }),
  check('todoId', 'NO_TODOID').exists({ checkFalsy: true }),
  check('color', 'NO_COLOR').exists({ checkFalsy: true }),
  check('color', 'COLOR_TYPE_ERROR').custom(value => isColor.has(value)),
  check('content', 'NO_CONTENT').exists({ checkFalsy: true }),
  check('status', 'NO_STATUS').exists({ checkFalsy: true }),
  check('status', 'STATUS_TYPE_ERROR').custom(value => isStatus.has(value))
];

export const callback = async (req: Request, res: Response, next: NextFunction) => {
  const [errors] = validationResult<IExpressValidatorError>(req).array();

  if (errors) { res.json(response(errors.msg)); return next(); }

  const { token, todoId, color, content, status } = req.body;

  const userId = Base64.decode(token);
  const _id = Base64.decode(todoId);

  const docs: any = await TodoList.update({ userId, _id }, { color, content, status }, {}, (err, docs) => {
    if (err) { throw err; }
    return docs;
  });

  res.json(response('UPDATE_SUCCESS', docs));
  next();
};
