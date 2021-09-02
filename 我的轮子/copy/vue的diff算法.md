# Vue中的Diff算法

```
1.// 1.diff发生时机
// vue构造函数
function Vue(){
    // ... 其他代码
    var updateComponent = () => {
        this._update(this._render())//调用组件update方法，this._render()返回虚拟dom，
    }
    new Watcher(updateComponent);   //watcher使它变成响应式
    // ... 其他代码
}

/*
[相同]
*/
// input 元素还要看type属性
vnode3 = { tag: undefined, key: undefined, text: '111' }
vnode3 = { tag: undefined, key: undefined, text: '222' }

/*
对比子节点：对两个虚拟子节点进行对比（深度优先遍历）
*/

/*1.根节点对比:
    1）是否[相同]
        ·不同：新建新的， 销毁旧的
        ·相同：
            1.新节点指向旧节点的真实DOM： newNode.elm = oldNode.elm
            2.对比新旧节点的属性，更新到真实DOM中
            3.开始[对比子节点]：
                1）尽量只改属性
                2）尽量移动DOM
                2）再不行才创建新DOM
```

流程

新旧DOM分别使用双指针

1. 头头, 尾尾, 头尾, 尾头, 映射
2. 真实DOM位置对应虚拟DOM位置

1. 新头 > 新尾, diff 结束

![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048659400-baa0d941-49fc-447e-b7f7-aaf308102803.png)![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048659385-5069fcb0-e669-425e-8f76-5adfc30666ab.png)![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048659457-9ed43808-5d92-4f30-ae99-37fe10173779.png)![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048659405-991dc1ce-fcce-43c3-90a9-df3a584512e5.png)![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048659454-6276cbdd-aa6a-48df-a39a-e5f0e9bfaaa2.png)![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048660055-b3dc3518-efcd-4656-86dc-3d17eb3a4df0.png)![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048660087-c97bdc98-dac7-49aa-a9ce-507ce49598a4.png)

![img](https://cdn.nlark.com/yuque/0/2021/png/2412630/1630048774810-b9773f35-fd6f-4144-a9be-919da8f58901.png)

例:  数组排序, 删除项, 新增项

当没有key时, 若tag相同: 

->两个虚拟DOM节点判断为相同:

->直接进入子节点的比较, 大量更改



key使用index

排序后, index 无法跟随元素的变动而变动, 导致key错乱

数组头或中部删除增加元素同上

```
// old
[ 
  	{value: 1, key: 0},
 		{value: 2, key: 1},
 		{value: 3, key: 2},
 		{value: 4, key: 3},
 		{value: 5, key: 4}
]

// new
[ 
  	{value: 5, key: 0},
 		{value: 4, key: 1}, 
    {value: 3, key: 2},
 		{value: 2, key: 3},
		{value: 1, key: 4}
]
```