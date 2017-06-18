## 最近在维护一位老工程师的代码，是使用构造函数来定义的。


1. 构造函数就是初始化一个实例对象
    - 默认函数首字母大写
    - 构造函数并没有显示返回任何东西
    - 在构造函数中用Object.defineProperty()方法来帮助我们初始化
    -

```js
function Person( name){
    this.name =name;
}
var p1=new Person('John');
// 等同于：
function person(name ){
    Object obj =new Object();
    obj.name =name;
    return obj;
}
var p1= person("John");
```

```js
    function Person( name){
        Object.defineProperty(this, "name"{
          get :function(){
             return name;
          },
           set:function (newName){
            name =newName;
          },
          enumerable :true, //可枚举，默认为false
           configurable:true //可配置
         });
      }  
       var p1=new Person('John');
```

```js
function Noti(options) {
    if (!(this instanceof Noti)) {
        // 添加log，这里不会被执行。什么时候会被执行？
        return new Noti(options);
    }
    this.onCreate();
    return this;
}
```


1. 构造函数中使用原型对象
    - 比直接在构造函数中写的效率要高的多

```js
var isServiceCreated = false;

Noti.prototype.onCreate = function () {
    if (isServiceCreated) {
        return;
    }
    console.log("onCtreae");
    isServiceCreated = true;
};
```
    - 直接使用一个对象字面形式替换原型对象，如下(但有一个副作用)
```js
    Person.prototype ={
            sayName :function(){
               console.log(this.name);
            },
            toString :function(){
               return "[Person "+ this.name+"]" ;
            }
    };    
```
        使用字面量形式改写了原型对象改变了构造函数的属性，因此他指向Object而不是Person。这是因为原型对象具有一个constructor属性，这是其他对象实例所没有的。当一个函数被创建时，它的prototype属性也被创建，且该原型对象的constructor属性指向该函数。当使用对象字面量形式改写原型对象时，其constructor属性将被置为泛用对象Object.为了避免这一点，需要在改写原型对象的时候手动重置constructor,如下：

```js
    Person.prototype ={
           constructor :Person,

           sayName :function(){
              console.log(this.name);
           },        
           toString :function(){
              return "[Person "+ this.name+"]" ;
           }
    };
```
        p1.constructor===Person
        true
        p1.constructor===Object
        false
        p1 instanceof Person
        true

        
```js
Noti.hello = function () {
    console.log("hello");
};
no = new Noti(); // 构造时候，打印onCreate
no.onCreate(); // 不会执行，因为全局变量isServiceCreated控制。
no.hello(); // throw error，因为hello是构造函数的自己的方法，不会被实例继承。
Noti.hello();// 打印 hello

```
