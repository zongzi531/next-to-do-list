import { Request, Response, NextFunction } from 'express';
import { TodoList } from '../../mongo/models';
import { response } from '../../util/response';
import { STATUS, COLORS, isColor } from '../../util/params';
import { Base64 } from 'js-base64';
import { check, validationResult } from 'express-validator/check';
import { IExpressValidatorError } from '../../util/express-validator-interface';

export const path = '/addTodo';

export const validatior = [
  check('token', 'NO_TOKEN').exists({ checkFalsy: true }),
  check('color', 'NO_COLOR').exists({ checkFalsy: true }),
  check('color', 'COLOR_TYPE_ERROR').custom(value => isColor.has(value)),
  check('content', 'NO_CONTENT').exists({ checkFalsy: true })
];

export const callback = async (req: Request, res: Response, next: NextFunction) => {
  const [errors] = validationResult<IExpressValidatorError>(req).array();

  if (errors) { res.json(response(errors.msg)); return next(); }

  const { token, color = COLORS.DEFAULT, content } = req.body;

  const userId = Base64.decode(token);

  const todolist = new TodoList({
    userId,
    color,
    content,
    status: STATUS.UNFINISHED
  });
  const docs: any = await new Promise((resolve, reject) => {
    todolist.save((err, docs) => {
      if (err) { throw err; }
      resolve(docs);
    });
  });
  res.json(response('ADD_TODO_SUCCESS', { todoId: Base64.encode(docs._doc._id) }));
  next();
};
