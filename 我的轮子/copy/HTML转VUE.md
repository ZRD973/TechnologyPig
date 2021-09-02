# HTML转VUE工具

**仓库地址：**[**https://172.16.0.110:8443/svn/Tools/trunk/hb-html-2-vue**](https://172.16.0.110:8443/svn/Tools/trunk/hb-html-2-vue)

## 使用条件

- 页面至多有一个lay-url（多个会出现问题，需要自行处理）
- 页面至多有一个lay-done，并且必须在lay-url同一个元素上 （不然不会执行，需要自行处理）

- 页面必须有script的js脚本（没有js脚本可以自行增加一个什么都不做的脚本）
- script脚本必须为 `**layui.use([], cb)**` 结构，不能在外部再包一层立即执行函数或者函数

- lay-done的内容必须为layui.data.done（不是的话，请改名）（执行多个函数，请将其余函数放入layui.data.done中）
- layui.data.done必须接收一个参数（参数名任起）



## 使用方法

1. 拉取转换工具代码
2. 安装依赖（npm i）

1. 配置需要转换的路径
2. 执行转换（npm run start）

1. 复制router.json的内容（如果是新页面的话）

### 配置文件(config.js)

```
export default {
  // projectDir: 'F:/SVN/ProManage',
  // projectDir: 'F:/SVN/HBMS',
  // projectDir: 'F:/SVN/JSSL',
  // projectDir: 'F:/SVN/CYEE',
  // projectDir: 'F:/SVN/QYPC',
  // projectDir: 'F:/SVN/SHHG',
  // sourceFiles: 'Pages/src/views/**/*.html', 				转换src/views下所有html文件
  // sourceFiles: 'Pages/src/views/layout.html', 			只转换src/views/layout.html文件
  // sourceFiles: 'webpack/common/views/**/*.html', 	转换common/views下所有html文件
  // sourceFiles: 'webpack/common/views/layout.html', 只转换common/views/layout.html文件
};
```

**projectDir**: 要转换项目的根目录（必须配，否则无法解析lay-modules）

**sourceFiles**：尽可能**只写全路径**，只转换单个文件。 