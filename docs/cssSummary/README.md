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
  grid-template-columns: 300px auto 300px;
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

