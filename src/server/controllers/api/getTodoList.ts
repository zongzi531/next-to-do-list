import { Request, Response, NextFunction } from 'express';
import { TodoList } from '../../mongo/models';
import { response } from '../../util/response';
import { STATUS } from '../../util/params';
import { Base64 } from 'js-base64';
import { check, validationResult } from 'express-validator/check';
import { IExpressValidatorError } from '../../util/express-validator-interface';

export const path = '/getTodoList';

export const validatior = [
  check('token', 'NO_TOKEN').exists({ checkFalsy: true })
];

export const callback = async (req: Request, res: Response, next: NextFunction) => {
  const [errors] = validationResult<IExpressValidatorError>(req).array();

  if (errors) { res.json(response(errors.msg)); return next(); }

  const { token } = req.body;

  const userId = Base64.decode(token);

  const docs: any = await TodoList.find({ userId }, (err, docs) => {
    if (err) { throw err; }
    return docs;
  });

  const finishedList = [];
  const unfinishedList = [];

  for (const i of docs) {
    const { _id, color, content, status } = i;
    if (i.status === STATUS.UNFINISHED) {
      unfinishedList.push({
        todoId: Base64.encode(_id),
        color,
        content,
        status
      });
    }
    if (i.status === STATUS.FINISHED) {
      finishedList.push({
        todoId: Base64.encode(_id),
        color,
        content,
        status
      });
    }
  }

  res.json(response('SUCCESS', { finishedList, unfinishedList }));
  next();
};
