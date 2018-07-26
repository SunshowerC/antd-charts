[English](./README.md) | 简体中文

# Ant Design Pro

## 工作流
- 路由
    1. 在 `src/common/menu.js` 添加左侧菜单配置
    2. 在 `src/common/router.js` 添加路由组件，以及其对应的 redux 组件

- 异步请求
    0. `@connect` 注入 `redux` 信息
    1. 组件内（`src/routes/XXX/Xxx.js`）发起 `dispatch`
        ```js
        dispatch({
            type: 'chartsList/fetch',  // 'chartsList/fetch' 中 chartsList 是 namespaced, fetch 是 effects
            payload: {...}
        });
        ```
    2. 在 `src/models/Xxxx.js` 触发对应的 `effects`, 在 `effects` 中 触发对应的异步请求函数
        ```
        const response = yield call(queryCharts, payload);
        ```
    3. 在同一封装的异步请求接口中 `src/services/api.js` 中触发请求
    4. 本地开发时，在 `.roadhogrc.mock.js` 中捕获拦截到对应的接口
    5. 去`mock/xxx.js` 中获取格式化的 `mock` 数据，响应数据
    6. 回到上述中的 `effects` 中，触发 `reducers` , 更新 `state`
        ```
        yield put({
                type: 'save',
                payload: response,
              });
        ```
    7.  `@connect` 注入的 `state` 发生变化，重新渲染

## 模板

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 使用

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm start         # 访问 http://localhost:8000
```

也可以使用集成化的 [ant-design-pro-cli](https://github.com/ant-design/ant-design-pro-cli) 工具。

```bash
$ npm install ant-design-pro-cli -g
$ mkdir pro-demo && cd pro-demo
$ pro new
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。


## 目录结构
```
├── mock                     # 本地模拟数据
├── public
│   └── favicon.ico          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── common               # 应用公用配置，如导航信息
│   ├── components           # 业务通用组件
│   ├── layouts              # 通用布局
│   ├── models               # dva model
│   ├── routes               # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   │
│   ├── theme.js             # 主题配置
│   ├── index.ejs            # HTML 入口模板
│   ├── index.js             # 应用入口
│   ├── index.less           # 全局样式
│   └── router.js            # 路由入口
│
├── .babelrc.js
├── .eslintrc.js
├── .prettierrc
├── .stylelintrc
├── .roadhogrc.mock.js       # mock 配置
├── .webpackrc.js
├── README.md
└── package.json
```


## 兼容性

现代浏览器及 IE11。

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 Ant Design Pro。
- 通过 [Issue](http://github.com/ant-design/ant-design-pro/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/ant-design-pro/pulls) 改进 Pro 的代码。
