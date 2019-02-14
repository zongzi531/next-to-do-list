import mongoose from 'mongoose';

const USER_INFO = new mongoose.Schema({
  username: String,
  password: String
});

const TODO_LIST = new mongoose.Schema({
  userId: String,
  color: String,
  content: String,
  status: String
});

export const UserInfo = mongoose.model('user_info', USER_INFO);
export const TodoList = mongoose.model('todo_list', TODO_LIST);
