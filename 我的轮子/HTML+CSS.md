# HTML+CSS

#### **BFC**:

开启BFC，使该元素变成一个独立的布局区域

特点：元素不会被浮动元素覆盖，子元素和父元素外边距不会重叠，可以包含浮动的子元素

开启BFC的方法：1、float;（不推荐) 2、display: inline-block;（不推荐)  3、overfloat:hidden;

#### **高度塌陷的问题:**   

在浮动布局中,父元素的高度默认是被子元素撑开的，当子元素浮动后,其会完全脱离文档流，子元素从文档流中脱离将会无法撑起父元素的高度，导致父元素的高度丢失父元素高度丢失以后，其下的元素会自动上移，导致页面的布局混乱所以高度塌陷是浮动布局中比较常见的一个问题，这个问题我们必须要进行处理!

​	**开启BFC**，1、float;（不推荐) 2、display: inline-block;（不推荐)	3、overflow: hidden;

​	**clear**：在受到影响的元素上添加clear：both ，清楚浮动。

​				或者在元素末尾手动添加一个div，设置clear：both

​	**伪元素方法**：

```javascript
/*解决浮动高度坍塌 */
.box1::after{                     
    content: '';
    display: block;
    clear: both;
}
 /* 解决浮动高度坍塌或者外边距重叠 */
.clearfix::before,
.clearfix::after{
    content:'';
    display: table;
    clear: both;
    }
```

#### 定位：position

1. 相对定位：relative，提升元素的层级，不会脱离文档流
2. 绝对定位：absolute，提升元素的层级，脱离文档流，改变元素的性质，行内变成块，宽高被内容撑开。
3. 固定定位：fixed， 参照浏览器的视口进行定位
4. 粘滞定位：sticky，可以设置到达某个位置后固定

#### 文本文字

垂直对齐：vertical-align：middle ；可选值：baseling基线对齐，top、bottom、middle

文字省略号：

```javascript
p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

#### 渐变

background-image:linear-gradient(to right,red,yellow)

```javascript
/*渐变的开头可以指定方向*/
.linear{
    width: 100px;
    height: 100px;
    background-image: linear-gradient(red,blue);/* 线性渐变 */
     background-image: radial-gradient(red,blue);/* 径向渐变 ，放射性，圆心根据元素的形状计算，at改变位置*/
}
```

#### 弹性盒子

- display:flex  弹性容器
- flex-direction : row, row-reverse, column, column-reverse  排列方式
- flex-grow:1;  默认0，元素伸展，父元素有剩余空间，按照比例进行分配
- flex-flow:row wrap; wrap和direction的简写
- flex-shrink:0; 默认1，当父元素空间不足时，对子元素进行收缩收缩
- flex-wrap:nowrap, wrap, wrap-reverse; 元素在弹性盒子内不换行
- justify-content:flex-start, flex-end, center, space-around, space-evevly, space-betwwen; 分配主轴上的空白空间
  1. flex-start :元素沿着主轴起边排列
  2. flex-end：元素沿着主轴终边排列
  3. center：元素居中排列
  4. space-around：空分布到元素两侧
  5. space-evevly：空白均匀分布到元素的单侧
  6. space-betwwen：空白分布到元素的单侧 
- align-items:center; 元素在辅轴上如何对齐
  1. stretch 默认值，将元素的长度设置为相同的值
  2. flex-start 元素不会拉伸，沿着辅轴起边对齐
  3. flex-end 元素不会拉伸，沿着辅轴终边对齐
  4. center 居中对齐
- align-content:center ; 辅轴空白空间的分布



## 实现水平以及垂直居中的几种方法

链接：https://blog.csdn.net/qq_43620719/article/details/112610911?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162126626316780269877020%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162126626316780269877020&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-1-112610911.pc_search_result_hbase_insert&utm_term=%E5%9E%82%E7%9B%B4%E6%B0%B4%E5%B9%B3%E5%B1%85%E4%B8%AD%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95



