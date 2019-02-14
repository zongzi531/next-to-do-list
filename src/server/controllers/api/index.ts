import express from 'express';
import { path as registP, validatior as registV, callback as registC } from './regist';
import { path as loginP, validatior as loginV, callback as loginC } from './login';
import { path as addTodoP, validatior as addTodoV, callback as addTodoC } from './addTodo';
import { path as getTodoListP, validatior as getTodoListV, callback as getTodoListC } from './getTodoList';
import { path as updateTodoP, validatior as updateTodoV, callback as updateTodoC } from './updateTodo';

const router = express.Router();

router.post(registP, registV as [], registC);
router.post(loginP, loginV as [], loginC);
router.post(addTodoP, addTodoV as [], addTodoC);
router.post(getTodoListP, getTodoListV as [], getTodoListC);
router.post(updateTodoP, updateTodoV as [], updateTodoC);

export default router;