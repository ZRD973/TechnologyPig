# 2021-08-18 Layui骨架切换Vue骨架

## 前言

之前我们完成了html文件转换vue文件，简化了整个项目打包的逻辑，不再需要考虑html的处理问题，但衍生的新问题，或者遗留的问题更加凸显，为了处理这些问题，包括但不限于：

- vue-devtool无法定位元素问题
- 整体缺乏全局状态管理

- layAdmin的路由几乎没有管理功能
- 对vue的生命周期无法进行支持



## 为此我们准备了

- 引入官方的路由管理方案vue-router来替换layadmin的页面加载逻辑
- 引入官方的全局状态管理vuex用于进行全局状态管理（调整使用新方案）

- - 菜单的刷新
  - 用户登入和登出

- - 用户信息的管理
  - 全局配置项的访问

- - 标段的选择和刷新问题
  - 等等...

- 引入组合式包composition-api的provide和inject进行状态管理（新思路）

全局状态管理新思路来源文章 ：https://zhuanlan.zhihu.com/p/345963989

- - 使用包装设计的useProvider和useInjector
  - 效果保持和vuex一致

- - 减少样板代码量
  - 增加提示功能



## 所有的变化点

### meta.json

meta.json的功能明确化，只为实现src和common下视图文件的自动识别

当文件不需要自动识别是src还是common时，不需要在meta.json中配置！！

1. meta属性移除；附加meta属性全部移入【router/index.js】中
2. 增加include和exclude属性

include和exclude填入的值，都来源于项目的package.json中的name属性

include和exclude二选一，include优先级更高！

```
[
  {
		"path": "path/to/file",
    "include": [], // 用于决定该页面只在指定项目中展示
    "exclude": [] // 用于决定该页面在指定项目中不展示
	},
  ...
]
```

1. 如何引入自动识别的文件，通过findComponent，传入meta中配置的path（一致）；

```
import findComponent from 'common/utils/methods/findCompoent';

const { component } = findComponent('path/to/file');

// component === () => import('real/path/to/file');
```

1. path不再要求移除 `-` 和 `_` 了；当然如何path没写 `-` 或 `_` 也可以匹配上路径带有 `-` 和 `_` 的；

即 meta 中 path 为 appheader 可以识别到 app-header的文件

path 为 app-header 也可以识别到 app-header的文件

### router/index.js

此文件为vue路由的配置文件，已经根据meta.json刷入了一次，后续需要自行维护；

1. staticRoutes 为未登录状态 就可以访问的路由 
2. asyncRoutes 为登录状态才可以访问的路由

1. 需要搞清楚：

1. 1. 是否需要layout的架子，是否需要放入children中
   2. 是否不需要登录就可以进入， 是否放入staticRoutes中

1. name 必须唯一
2. 页面本身的name要与路由的name对应，否则无法启用缓存，切换会导致刷新

1. 页面传入了三个属性`route`,`layRoute`,`templateData`

1. 1. route为vue-router解析当前页面后的路由对象 （相当于this.$route）
   2. layRoute为layui路由解析当前页面后的路由对象（相当于layui.router()），新写页面不需要这个属性

1. 1. templateData为历史遗留html的问题，新写页面不需要这个属性

1. meta中 title 属性为页面选项卡的名字
2. meta中 footer 属性和以前一样，暂失效。后续会使用

1. meta中 affix 为固定页面选项卡，禁止关闭；
2. meta中 iframe 为iframe页面 提供选项卡切换缓存；

```
{
  path: string,
	name: string,
  component: findComponent(string).component, //  () => import(string)
  meta: {
  	title: string,
    footer: string,
    affix: boolean,
    iframe: boolean,
  }
}
```

#### 小技巧：  实现 【/index】为 layout 的子内容

```
// 此为错误用法！！！！
{
	path: '/',
  component: () => import('layout.vue'),
  children: [
    {
    	path: 'index',
      name: 'index',
      component: () => import('index.vue'),
    }
  ]
}

    
// 正确写法
{
	path: '/index',
  component: () => import('layout.vue'),
  redirect: '/index/index',
  children: [
    {
    	path: 'index',
      name: 'index',
      component: () => import('index.vue'),
    }
  ]
}
```

#### 小技巧： 实现/ 登录后转移到 /user/console

```
// 放入 asyncRoutes中即可
{
	path: '/',
  redirect: '/user/console',
}
```

### layout.vue

本文件已经拆分为5个部分，各个部分可以自由在src下进行替换

1. layout/app-side.vue 处理左侧内容：菜单和logo

1. 1. menu-item 用于菜单的控制

1. layout/app-header 处理顶部内容：开关菜单，刷新，选择标段，和右部的辅助菜单

1. 1. app-header-project 用于显示和控制标段的选择
   2. app-header-right 用于控制顶部栏的右侧菜单内容

1. layout/TagsView 页面选线卡的缓存和切换
2. layout/app-main 页面主体内容的显示和缓存

1. layout/app-float-window 页面右侧的悬浮窗

### common/utils/router.js

引入该文件即可使用vue的路由对象

```
import router from 'common/utils/router';

router === this.$router;
```

## 全局状态管理

想弄懂核心函数，请阅读来源文章 ：https://zhuanlan.zhihu.com/p/345963989

## 核心函数

### useProvider(func)

用于提供provide的内容

- func *function* hooks方法 - 必须传入和useInjector同引用的函数

```
import useProvider from 'common/hooks/useProvider';

import func from 'path/hooks';

useProvider(func); // 必须在setup中调用
```

### useInjector(func[, injectType])

用于获取useProvider提供的内容

- func *function* hooks方法 - 必须传入和useProvider同引用的函数
- injectType *string* 可选，'root' | 'optional'

- - 不传则为正常模式，会获取useProvider的结果，没有则会获取全局对象，再没有就报错；
  - 'root' 则为获取全局对象，没有则自动生成全局对象并使用，下次将不会再生成

- - 'optional' 则为获取useProvider的结果，没有则获取全局对象，再没有就返回 null，不会报错；

返回

- func的返回值

```
import useInjector from 'common/hooks/useInjector';

import func from 'path/hooks';

const res = useInjector(func); // 获取useProvider或者全局提供的func生成结果， 没有就报错;

const res = useInjector(func, 'root'); // 获取全局的func生成结果;

const res = useInjector(func, 'optional'); // 获取useProvider或者全局提供的func生成结果;
```

## hooks函数

### useSetter

全局配置相关操作 - 获取全局配置， 等等

返回 object

- setter *object* 包含apiUrl等等；
- 

```
import useInjector from 'common/hooks/useInjector';

import useSetter from 'common/hooks/useSetter';

const { setter } = useInjector(useSetter, 'root');

// setter === { apiUrl: {}, tableName, ... }
```

### useUser

用户相关操作 - 获取用户信息，设置用户信息，登录，退出等等

返回 object

- info *object* 包含ID,Name等等；
- setInfo *function* 设置用户信息

- isLogin ref<boolean> 判断是否登录
- exit *function* 退出

- 等等

```
import useInjector from 'common/hooks/useInjector';

import useUser from 'common/hooks/useUser';

const { info, setInfo, isLogin, exit, ... } = useInjector(useUser, 'root');

// info === { ID, Name, ... }

// isLogin.value === boolean;
```

### useTagsView

视图选项卡相关操作 - 获取已打开过页面，获取缓存的页面，刷新页面，关闭页面 等等

返回 object

打开页面，直接使用router.push或replace即可，不需要使用这个hook里面的方法

- visitedViews *[]route* 包含ID,Name等等；
- cachedViews *[]route* 包含ID,Name等等；

- refreshView *function* 设置用户信息
- delView *function* 关闭页面

- 等等

```
import useInjector from 'common/hooks/useInjector';

import useTagsView from 'common/hooks/useTagsView';

const { visitedViews, cachedViews, refreshView, delView, ... } = useInjector(useTagsView, 'root');
```

### useApp

应用相关的操作 - 获取菜单状态，打开菜单，关闭菜单 等等

返回 object

- sidebar *object* 

- - opened *boolean* 菜单的开关

- openSidebar *function* 打开菜单
- closeSidebar *function* 关闭菜单

- toggleSidebar *function* 切换菜单开关状态
- 等等

```
import useInjector from 'common/hooks/useInjector';

import useApp from 'common/hooks/useApp';

const { sidebar, openSidebar, closeSidebar, toggleSidebar, ... } = useInjector(useApp, 'root');
```

### useProject

项目标段的相关操作 - 获取标段信息，设置标段信息 等等

返回 object

- bidList *[]bidInfo* - 当前项目下的所有标段列表
- bidInfo *ref<object>* 

- - id *number* 标段id
  - caption *string* 标段名称

- proInfo *ref<object>* 

- - id *number* 项目id
  - caption *string* 项目名称

- saveBidList *function* 打开菜单
- saveBidInfo *function* 关闭菜单

- saveProInfo *function* 切换菜单开关状态
- delBidList *function* 清空bidList

- delBidInfo *function* 清空bidInfo
- delProInfo *function* 清空proInfo

- 等等

```
import useInjector from 'common/hooks/useInjector';

import useProject from 'common/hooks/useProject';

const { bidInfo, proInfo, ... } = useInjector(useProject, 'root');
```

## 注意事项

1. 以前使用 setter.userInfo 改为使用 useUser 的 info
2. 以前使用 common/setter 改为使用 useSetter 的 setter

1. 以前是用 hongbo.getBidID 改为使用 useProject 的 bidInfo.id
2. 以前使用 location.hash 改为使用 router.push

1. 以前使用 'view/a=1/b=2' 改为使用 'view?a=1&b=2'
2. 以前使用 layui.router() 改为使用 props.route(针对`?`)， props.layRoute (针对`/`)

1. 编写hooks后，放入hooks文件夹中， 配套放置一个`.d.ts`的ts声明文件，用于提示

如果不知道怎么写，请自行查看typescript文档

1. 编写的hooks禁止直接导出 ref或者reactive对象， 使用readonly包装一下
2. 禁止直接使用provide和inject， 使用写好的 useProvider 和 useInjector

1. meta.json中新增加的exclude或include最好注意配置下（避免无关项目无辜加载不必要的文件）
2. 不需要登录的页面，才可以写在staticRoutes中

1. 用到了iframe的页面，需要路由中meta配置iframe为true