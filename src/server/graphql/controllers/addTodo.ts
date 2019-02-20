import { TodoList } from '../../mongo/models';
import { response } from '../../util/response';
import { STATUS, COLORS, isColor } from '../../util/params';
import { Base64 } from 'js-base64';

const addTodo = async (variables: any) => {
  const { token, color = COLORS.DEFAULT, content } = variables;
  if (!token) { return response('NO_TOKEN'); }
  if (!color) { return response('NO_COLOR'); }
  if (!isColor.has(color)) { return response('COLOR_TYPE_ERROR'); }
  if (!content) { return response('NO_CONTENT'); }

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
  return response('ADD_TODO_SUCCESS', { todoId: Base64.encode(docs._doc._id) });
};

export default addTodo;