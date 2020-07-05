#reaact渲染DOM的过程


    `
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
    
      
`

    

