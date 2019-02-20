import { TodoList } from '../../mongo/models';
import { response } from '../../util/response';
import { STATUS } from '../../util/params';
import { Base64 } from 'js-base64';

const getTodoList = async (variables: any) => {
  const { token } = variables;
  if (!token) { return response('NO_TOKEN'); }

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

  return response('SUCCESS', { finishedList, unfinishedList });
};

export default getTodoList;