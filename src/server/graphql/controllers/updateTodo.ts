

import { TodoList } from '../../mongo/models';
import { response } from '../../util/response';
import { isStatus, isColor } from '../../util/params';
import { Base64 } from 'js-base64';

const updateTodo = async (variables: any) => {
  const { token, todoId, color, content, status } = variables;
  if (!token) { return response('NO_TOKEN'); }
  if (!todoId) { return response('NO_TODOID'); }
  if (!color) { return response('NO_COLOR'); }
  if (!isColor.has(color)) { return response('COLOR_TYPE_ERROR'); }
  if (!content) { return response('NO_CONTENT'); }
  if (!status) { return response('NO_STATUS'); }
  if (!isStatus.has(status)) { return response('STATUS_TYPE_ERROR'); }

  const userId = Base64.decode(token);
  const _id = Base64.decode(todoId);

  const docs: any = await TodoList.update({ userId, _id }, { color, content, status }, {}, (err, docs) => {
    if (err) { throw err; }
    return docs;
  });

  return response('UPDATE_SUCCESS', docs);
};

export default updateTodo;