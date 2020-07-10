## 1.浏览器是如何渲染UI的？

 
    1.用户输入URL   
    
    2.浏览器解析URL解析出主机名
    
    3.浏览器将主机名转化为IP地址（浏览器将先查找本地DNS缓存列表。没有的话向浏览器默认的DNS服务器发送
    查询请求 同时缓存）
    
    4.浏览器将端口号从URL中解析出来
    
    5.浏览器建立一条与目标web服务器的TCP链接
    
    6.浏览器向服务器发送一条HTTP请求报文
    
    7.服务器向浏览器返回一条HTTP响应报文
    
    8.关闭链接，浏览器开始解析文档
    
    9.首先根据获取到的HTML文件解析出DOM Tree
    
    10.进行css解析，生成Style Rules（css规则）
    
    11.执行js代码，遇到script标签的时候会立即解析脚本停止解析文档（因为js可能会改动DOM和CSS，所以把script标签放在最下方）
    如果script脚本是外部的，会等待脚本下载完毕，再继续解析文档（可以在script标签上增加属性defer会async优化
    加载速度）脚本解析完会将脚本中改变COM和CSS的地方分别解析出来，追加到DOM Tree和Style Rules上
    
    11.将DOM Tree与Style Rules合并成为Render Tree（渲染树）
    
    12.接着进入布局阶段，为每一个节点分配一个在页面中对应的坐标
    
    13.随后进行页面的绘制，遍历Render Tree的节点，将页面元素呈现出来
    
    如果请求文件有重复资源的话，重复678动作，直至资源全部加载完毕
    



##  2.浏览器的回流与重绘 

    1.回流必将引起重绘，重绘不一定会引起回流
    
    2.当Render Tree中部分或者全部元素的尺寸、结构或者某些属性发生改变时，浏览器重新渲染的或者称为回流
        引起回流的操作：
          页面首次渲染
          浏览器窗口大小发生改变
          元素尺寸或者位置发生改变
          元素内容发生改变（文字数量，字体大小）
          添加或者删除可见的DOM元素
          激活css伪类(例如:hober :active)
    
    3.当页面中元素样式的改变并不影响刀它在文档流中的位置时，浏览器会将新样式赋予元素并重新绘制它，这个过程称为重绘     
        引起重绘的操作：
          字体颜色
          背景颜色
          
    回流和重绘的代价是很高的，首先会破环用户体验，比如渲染页面速度会相对迟缓，相比之下回流的影响更大
    
       优化：
         避免使用table布局
         经可能在DOM的最末端改变class
         避免使用css表达式（calc（））
         js避免重复操作样式，最好一次性重写style或者将样式定义为class一次性更改
         使用DocumentFragment，创建一个游离于DOM树之外的节点，然后在此节点上批量操作，最后插入DOM树中，因此只触发一次回流
   

        
## 3.DOM事件流
    
    事件捕获阶段-处于目标阶段和事件冒泡阶段
    捕获是从上到下  冒泡是从下往上
    
    DOM事件捕获得具体流程
    window -> document -> html -> body -> div 
    事件冒泡阶段
    与事件捕获相反
    
## 4.Event对象得常见应用
  
    1. event.preventDefault() 
    
       阻止默认事件。比如a得点击事件，form标签得submit事件。可以使用此方法来阻止默认事件
       
    2. event.stopPropagation()
    
       阻止事件冒泡，如果给父元素和子元素都加上事件得话，就需要阻止冒泡了，不然，子元素得事件会执行两次  
    
    3. event.stopImmediatePropagation()
    
      阻止事件冒泡并且阻止相同事件的其他侦听器被调用。
      如果有多个相同类型事件的事件监听函数绑定到同一个元素，当该类型的事件触发时，它们会按照被添加的顺序执行。如果其中某个监听函数执行了 event.stopImmediatePropagation() 方法，则当前元素剩下的监听函数将不会被执行。
    
    4. event.currentTarget   
       
       指向事件绑定的元素
    
    5. event.target
       
       触发事件的对象 (某个DOM元素) 的引用.可以用来实现事件委托 (event delegation)。

## 5.reaact渲染DOM的过程
  ```html
 1. state数据
         this.state = {
           content:'item'
          }
          
 2. JSX模板
     
          rander(
            <div> <span>{this.state.content}</span> <div>
          )   
  
 3. JSX模板转化为createElement函数
    
      React.createElement('div',{},React,createElement('span',{},this.state.content))  
      
 4.  再由createElement函数生成虚拟DOM，所谓虚拟DOM就是一个JS对象，来描述真实DOM
      
      {
       type:'div',
       props:{},
       children:{
         type:'span',
         props:{},
         children:'item'
        }
      }
      
5. 由虚拟DOM生成真实DOM，
      
      <div> <span> item </span> </div>
      
 6. state数据发生变化 setState异步改变数据
      
7. 重复2.3.4步生成新的虚拟DOM，和原始的虚拟DOM进行比较,找出改变的部分。（同层比对）
        
        利用diff算法同层比对新旧虚拟DOM 如果第n层就发现不同的时候，就会停止比较（就算下面n层下的DOM结构一致），虽然有些渲染DOM
        上的浪费，但是大大提升两个虚拟DOM比较算法的速度。 
        
        如果给虚拟DOM节点加上key值得话，diff算法会比较得更加高效迅速，不建议用index作为key值，因为一旦发生删除或者插入，当前得节点虽然发生变化但是key值可能不会变，可能导致渲染内容缺失。key值最好是独一无二得。
       
 8. 操作DOM，渲染被改变的部分 
```
