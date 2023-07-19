import service from "../utils/service";
//设置请求配置
// 登录
export const fetchData = (query) => {
  return service({
    url: 'api/v1/login',
    method: 'POST',
    data: query,
  });
};

// 注册
export const setSignUp = (query) => {
  return service({
    url: 'api/v1/signup',
    method: 'POST',
    data: query,
  })
}

// 获取机器人
export const getRobotList = () => {
  return service({
    url: 'api/v1/getRobots',
    method: 'GET',
  })
};

// 添加机器人
export const addRobot = (rdata) => {
  return service({
    url: 'api/v1/addRobot',
    method: 'POST',
    data: rdata,
  });
};

// 删除机器人
export const removeRobot = (id) => {
  return service({
    url: 'api/v1/removeRobot',
    method: 'POST',
    data: id,
  });
};

// 添加成员
export const addTele = (query) => {
  return service({
    url: 'api/v1/addTele',
    method: 'POST',
    data: query,
  });
};

// 获取成员信息
export const getTele = (robot_id) => {
  return service({
    url: `api/v1/getTeles?robot_id=${robot_id}`,
    method: 'GET',
  });
};
// 编辑成员
export const updateTele = (query) => {
  return service({
    url: `api/v1/updateTele`,
    method: 'POST',
    data: query,
  });
};
// 删除成员
export const removeTele = (query) => {
  return service({
    url: `api/v1/removeTele`,
    method: 'POST',
    data: query,
  });
};

// 发送信息
export const sendmessage = (messagee) => {
  return service({
    url: 'api/v1/send',
    method: 'POST',
    data: messagee,
  });
};

// 查看已有任务
export const checktask = (task) => {
  return service({
    url: 'api/v1/getTasks',
    method: 'POST',
    data: task,
  });
};


// 删除已有任务
export const removetask = (task) => {
  return service({
    url: 'api/v1/removeTask',
    method: 'POST',
    data: task,
  });
};

// 停止定时任务
export const stoptask = (task) => {
  return service({
    url: 'api/v1/stopTask',
    method: 'POST',
    data: task
  });
};

// 恢复定时任务
export const restarttask = (task) => {
  return service({
    url: 'api/v1/reStartTask',
    method: 'POST',
    data: task,
  });
};

// 编辑机器人
export const editorRob = (query) => {
  return service({
    url: 'api/v1/updateRobot',
    method: 'POST',
    data: query,
  });
};

// 管理员获取用户
export const getUsers = () => {
  return service({
    url: 'api/v1/admin/getUsers',
    method: 'GET',
  })
}
//获取机器人已添加成员
export const getAddPerson = (params) => {
  return service({
    url: '/api/v1/getTeles',
    method: "get",
    params
  })
}
export const addTask = (data) => {
  return service({
    url: '/api/v1/send',
    method: "post",
    data
  })
}
//测试
export const testRobot = (data) => {
  return service({
    url: "/api/v1/pingRobot",
    method: "post",
    data
  })
}

