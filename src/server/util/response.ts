enum CODE {
  SUCCESS = 200,
  FAIL = 301,
}

enum MESSAGE {
  REGISTED_SUCCESS = '注册成功',
  REGISTED_FAILED = '注册失败',
  USER_REGISTED = '用户已存在',
  USER_ACCOUNT_ABNORMALITY = '用户账户异常',
  NO_USERNAME = '请输入用户名',
  NO_PASSWORD = '请输入密码',
  USER_NOT_REGISTERED = '用户未注册',
  LOGIN_SUCCESS = '登录成功',
  USERNAME_OR_PASSWORD_ERROR = '用户名或密码错误',
  ADD_TODO_SUCCESS = '添加成功',
  NO_TOKEN = '未获取到token值',
  NO_COLOR = '未获取到color值',
  NO_CONTENT = '未获取到content值',
  NO_STATUS = '未获取到status值',
  NO_TODOID = '未获取到todoId值',
  SUCCESS = '操作成功',
  UPDATE_SUCCESS = '更新成功',
  COLOR_TYPE_ERROR = '颜色非法',
  STATUS_TYPE_ERROR = '状态非法',
}

type Info = {
  code: CODE;
  message: MESSAGE;
};

interface MESSAGEOBJECT {
  REGISTED_SUCCESS: Info;
  REGISTED_FAILED: Info;
  USER_REGISTED: Info;
  USER_ACCOUNT_ABNORMALITY: Info;
  NO_USERNAME: Info;
  NO_PASSWORD: Info;
  USER_NOT_REGISTERED: Info;
  LOGIN_SUCCESS: Info;
  USERNAME_OR_PASSWORD_ERROR: Info;
  ADD_TODO_SUCCESS: Info;
  NO_TOKEN: Info;
  NO_COLOR: Info;
  NO_CONTENT: Info;
  NO_STATUS: Info;
  NO_TODOID: Info;
  SUCCESS: Info;
  UPDATE_SUCCESS: Info;
  COLOR_TYPE_ERROR: Info;
  STATUS_TYPE_ERROR: Info;
}

const MESSAGEOBJECT: MESSAGEOBJECT = {
  REGISTED_SUCCESS: { code: CODE.SUCCESS, message: MESSAGE.REGISTED_SUCCESS },
  REGISTED_FAILED: { code: CODE.FAIL, message: MESSAGE.REGISTED_FAILED },
  USER_REGISTED: { code: CODE.FAIL, message: MESSAGE.USER_REGISTED },
  USER_ACCOUNT_ABNORMALITY: { code: CODE.FAIL, message: MESSAGE.USER_ACCOUNT_ABNORMALITY },
  NO_USERNAME: { code: CODE.FAIL, message: MESSAGE.NO_USERNAME },
  NO_PASSWORD: { code: CODE.FAIL, message: MESSAGE.NO_PASSWORD },
  USER_NOT_REGISTERED: { code: CODE.FAIL, message: MESSAGE.USER_NOT_REGISTERED },
  LOGIN_SUCCESS: { code: CODE.SUCCESS, message: MESSAGE.LOGIN_SUCCESS },
  USERNAME_OR_PASSWORD_ERROR: { code: CODE.FAIL, message: MESSAGE.USERNAME_OR_PASSWORD_ERROR },
  ADD_TODO_SUCCESS: { code: CODE.SUCCESS, message: MESSAGE.ADD_TODO_SUCCESS },
  NO_TOKEN: { code: CODE.FAIL, message: MESSAGE.NO_TOKEN },
  NO_COLOR: { code: CODE.FAIL, message: MESSAGE.NO_COLOR },
  NO_CONTENT: { code: CODE.FAIL, message: MESSAGE.NO_CONTENT },
  NO_STATUS: { code: CODE.FAIL, message: MESSAGE.NO_STATUS },
  NO_TODOID: { code: CODE.FAIL, message: MESSAGE.NO_TODOID },
  SUCCESS: { code: CODE.SUCCESS, message: MESSAGE.SUCCESS },
  UPDATE_SUCCESS: { code: CODE.SUCCESS, message: MESSAGE.UPDATE_SUCCESS },
  COLOR_TYPE_ERROR: { code: CODE.FAIL, message: MESSAGE.COLOR_TYPE_ERROR },
  STATUS_TYPE_ERROR: { code: CODE.FAIL, message: MESSAGE.STATUS_TYPE_ERROR },
};

export const response = (template: keyof MESSAGEOBJECT, response?: any) => {
  return Object.assign(MESSAGEOBJECT[template], response);
};
