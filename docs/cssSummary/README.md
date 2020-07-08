## 一 页面布局
实现已知高度，左右宽300px，中间自适应的三栏布局
```css
*{
  padding: 0;
  margin: 0;
}

.left {
  background: red;
}

.center {
  background: yellow;
}

.right {
  background: blue;
}

.layout {
  margin-top: 10px;
}
```

### 1.float方案
```html
<style>
.flot-layout .left {
  float: left;
  width: 300px;
  height: 100px;
}

.flot-layout .center {
  height: 100px;
}

.flot-layout .right {
  float: right;
  width: 300px;
  height: 100px;
}
</style>
<section class="layout flot-layout">
  <div class="left"></div>

  <div class="right"></div>
  <div class="center">
    <h2>float解决方案</h2>
  </div>
</section>

```
### 2.absolute方案

```html
<style>
.absolute-layout {
  position: relative;
  width: 100%;
  height: 100px;
}

.absolute-layout > div {
  position: absolute;
  top: 0;
}

.absolute-layout .left {
  width: 300px;
  left: 0;
  height: 100%;
}

.absolute-layout .center {
  height: 100%;
  left: 300px;
  right: 300px;
}

.absolute-layout .right {
  width: 300px;
  height: 100%;
  right: 0;
  top: 0;
}
</style>
<section class="layout absolute-layout">
  <div class="left"></div>
  <div class="center">
    <h2>absolute绝对定位解决方案</h2>
  </div>
  <div class="right"></div>
</section>

```
### 3.flex解决方案

```html
<style>
.flex-layout {
  display: flex;
  width: 100%;
}

.flex-layout .left,
.flex-layout .right {
  width: 300px;
  height: 100px;
}

.flex-layout .center {
  flex: 1;

}
</style>
<section class="layout flex-layout">
  <div class="left"></div>
  <div class="center">
    <h2>flex解决方案</h2>
  </div>
  <div class="right"></div>
</section>
<style>
```
### 4.table解决方案

```html
<style>
.table-layout {
  display: table;
  width: 100%;
}

.table-layout .left,
.table-layout .right {
  display: table-cell;
  width: 300px;
  height: 100px;
}

.table-layout .center {
  display: table-cell;
  height: 100px;
}
</style>
<section class="layout table-layout">
  <div class="left"></div>
  <div class="center">
    <h2>table解决方案</h2>
  </div>
  <div class="right"></div>
</section>
```
### 5.grid解决方案
```html
<style>
.grid-layout {
  width: 100%;
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 300px auto 300px;;
}
</style>
<section class="layout grid-layout">
  <div class="left"></div>
  <div class="center">
    <h2>grid解决方案</h2>
  </div>
  <div class="right"></div>
</section>
```
<img :src="$withBase('/image/layout.png')" alt="foo">

## 二 CSS盒模型

  
  css盒模型分为两种，标准盒模型和IE盒模型
  
### 1.标准盒模型和IE盒模型的区别

  标准盒模型的宽高只包括内容区（content）
  
  IE盒模型的宽高包括内容区(content)、内边距(padding)、边框线(border)
  
### 2.如何设置盒模型  

  首先标准盒模型，也是默认的
  ```css
  div{
   box-sizing: content-box;
  }
```
  IE盒模型
  ```css
  div{
   box-sizing: border-box;
  }
```
若不声明DOCTYPE类型，IE浏览器会将盒子模型解释为IE盒子模型，FireFox等会将其解释为W3C盒子模型；若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。
### 3.js如何获取盒模型对应的宽高

```html
//只能获取dom到内联样式的宽高，相对来说不准确
dom.style.width/height

//可以获取到dom实际渲染后的宽高，只有IE支持
dom.currentStyle.width/height

//同上，兼容火狐 谷歌
window.getComputedStyle(dom).width/height

//也可以拿到dom的实际宽高，适用场景-》计算dom的绝对位置，基于视窗左上角的绝对位置，
dowm.getBoundingClientRect().width/height
```
### 2.边距重叠
MDN是这样描述的:块的上外边距(margin-top)和下外边距(margin-bottom)有时合并(折叠)为单个边距，其大小为单个边距的最大值(或如果它们相等，则仅为其中一个)，这种行为称为边距折叠。

两个或多个盒子(可能相邻也可能嵌套)的相邻边界(其间没有任何非空内容、补白、边框)重合在一起而形成一个单一边界。

  #### 两个相邻元素垂直方向margin重叠
  
  渲染规则
   
    1.如果两个外边界值都为正，则两个盒子垂直方向的距离是两个外边距值中的最大的值。
    2.如果一正一负，则是正边界值减去负边距值中的绝对值。
    3.如果都是负数，则用零减去绝对值最大的负边距。
  
  解决方案  
    
    1：给底部元素设置float浮动
    2：给同级元素设置display:inline-block
    3：设置position:absolute或者fixed
    4：给其中一个元素加一层容器，生成一个新的BFC
    
   #### 相邻元素水平方向margin重叠
   
  
   渲染规则
     
    1.取相邻元素margin最大值
    2.如果一正一负，则是正边界值减去负边距值中的绝对值。 
    3.如果都是负数，则用零减去绝对值最大的负边距。   
    
  解决方案
  
    1：给每个元素都生成BFC  
    
  #### 父子元素margin重叠
  
  渲染规则  
    
      若父元素的margin-top与它的第一个子元素的margin-to之间没有pborder、 padding、  行内内容（inline content）也没有创建BFC或者清除浮动进行分割，或者父元素的margin
    -bottom与它的最后一个子元素的margin-bottom之间没有border、 padding、 inline content、 height、min-height、max-height进行分割，那么就会出现父块元素和其内后代块元素外边界重叠，重叠部分最终会溢出到父级块元素外面。
   
  解决方案
    
    为父元素设置BFC 
    
    
  总结：防止边距重叠就是要用BFC来解决  
