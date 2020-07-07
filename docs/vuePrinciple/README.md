
## 一.Vue响应式原理
创建vue构造函数 并增加_init初始化函数
```js
function Vue(options) {
    this._init(options);
}
function initMixin(Vue){
    Vue.prototype._init = function (options) {
        const vm  = this;
        vm.$options = options
        // 初始化状态
        initState(vm)
    }
}
```
initState函数
```js
function initState(vm){
    const opts = vm.$options;
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethod(vm);
    }
    if(opts.data){
        // 初始化data
        initData(vm);
    }
}
function initProps(){}
function initMethod(){}
function initData() {}
//init...
```
###   1.初始化数据
```js
function initData(vm){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    observe(data);
}
```

###   2.递归属性进行数据劫持
```js
class Observer { // 观测值
    constructor(value){
        this.walk(value);
    }
    walk(data){ // 让data对象上的所有属性依次进行观测
        let keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let value = data[key];
            defineReactive(data,key,value);
        }
    }
}
function defineReactive(data,key,value){
    observe(value);
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            if(newValue == value) return;
            observe(newValue);
            value = newValue
        }
    })
}
export function observe(data) {
// 判断是否是对象
    if(typeof data !== 'object' && data != null){
        return;
    }
    return new Observer(data);
}
```
### 3.对于数组的处理
```js
class Observer { // 观测值
    constructor(value){
     //给所有响应式数据增加标识，并且可以在响应式上获取Observer实例上的方法
     Object.defineProperty(value,'__ob__',{
                enumerable:false,
                configurable:false,
                value:this
         });
        if(Array.isArray(value)){
            value.__proto__ = arrayMethods; // 劫持数组原型方法
            this.observeArray(value);
        }
    }
    observeArray(value){
        for(let i = 0 ; i < value.length ;i ++){
            observe(value[i]);
        }
    }
}
```
对数组原型方法的劫持
```js
let oldArrayProtoMethods = Array.prototype;
export let arrayMethods = Object.create(oldArrayProtoMethods);
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
];
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        const result = oldArrayProtoMethods[method].apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
       //只有push unshift splice 才会对数组有增删的作用,reverse是改变顺序
        if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测
        return result
    }
})
```
#### 总结
   vue会在初始化数据得时候依次对data返回得属性进行数据劫持核心原理就是Object,defineProperty把data返回得数据重新定义,对于复杂类型得数据,比如数组或者对象,会采用递归属性进行劫持, 对于数组数据得劫持：重写并劫持数组得原型方法,并不会改变原有得数据原型方法,而是在每次使用特定得一些数组方法时比如 push unshift splice，对新增得每一项进行观测,这也就说明了为什么给在vue当前实例中直接用索引修改数组(基础类型)不会触发视图更新得原因.
