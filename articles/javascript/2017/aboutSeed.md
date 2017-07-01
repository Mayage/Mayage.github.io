### module的理解
1. 几乎所有的编程语言都有自己的模块组织方式，比如Java中的包、C#中的程序集等，node.js使用模块和包来组织。
    其机制实现参照了CommonJS标准，虽未完全遵守，但差距不大，使用起来非常简单。

1. node.js使用exports和require对象来解决对外提供接口和引用模块的问题。

1.  require('./test').Student 很丑陋的样子，我们可以简单修改一下exports方式，使require优雅一些：module.exports = Student;

1. Module.exports才是真正的接口，exports只不过是它的一个辅助工具。最终返回给调用的是Module.exports而不是exports。

1. 所有的exports收集到的属性和方法，都赋值给了Module.exports。如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。
```js
module.exports=exports＝{};
......

module.exports=new Object();

exports=xxx;//和new Object没有关系了，最后返回module.exports，所以改动都无效了
```
1. 无论调用多少次require，对于同一模块node.js只会加载一次，引用多次获取的仍是相同的实例.

1. require搜索module方式
    - 核心模块优先级最高，直接使用名字加载，在有命名冲突的时候首先加载核心模块
    - 文件模块只能按照路径加载（可以省略默认的.js拓展名，不是的话需要显示声明书写）
        - 绝对路径
        - 相对路径
    - 查找node_modules目录，我们知道在调用 npm install <name> 命令的时候会在当前目录下创建node_module目录(如果不存在) 安装模块，当 require 遇到一个既不是核心模块,又不是以路径形式表示的模块名称时,会试图 在当前目录下的 node_modules 目录中来查找是不是有这样一个模块。如果没有找到,则会 在当前目录的上一层中的 node_modules 目录中继续查找,反复执行这一过程,直到遇到根 目录为止。


1. 模块是一个特定的类型就用Module.exports。如果，模块是一个典型的“实例化对象”就用exports。

1. 你的模块并不一定非得返回“实例化对象”。你的模块可以是任何合法的javascript对象--boolean, number, date, JSON, string, function, array等等。

1. hack require

```js

    _require = module.require;
    module.require = function(path){
        console.log("require path is ",path);
        return _require(path);
    }
    var b  =require("./index") // require path is ./index ; b is function

```
