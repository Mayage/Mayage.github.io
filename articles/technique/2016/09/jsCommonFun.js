进军码农
30段有用的javascript代码

复制代码
1. 如何区分IE及非IE浏览器

if(!+[1,]){    
    console.log("这是IE浏览器")；
} else{
    console.log("这不是IE浏览器")；   
}
复制代码
<script type="text/javascript">
alert([1,2]);//相当于alert([1,2].toString()); --这在IE与非IE上都相同，都会弹出"1,2"
alert([1,]);//相当于alert([1,].toString());--在非IE的标准浏览器上，js引擎会自动删除最后的","，所以在IE上会弹出"1,"，而在非IE上会弹出"1"
alert(+[1,]);//根据上面的解释，这一句在IE上相当于alert(+"1,")，而在非IE上相当于alert(+"1")，正号的作用在于试图将字符串转换为数字，"1,"当然不是数字，而"1"可以转换为数字1，所以最终的结果：IE上会转换失败弹出"NaN"，而非IE浏览器上会弹出数字"1"
 
//上面的+号转换字符串为数字的测试
var s = +"5";
alert(s+1);
 
//ok，到这里为止，我们知道 +[1,] 最终在IE为上NaN,在非IE浏览器上则为数字1
 
//下面再来看看很有个性的NaN
alert(NaN==true);//弹出 false
alert(NaN==false);//弹出 false
alert(NaN==NaN);//弹出 false
 
//即NaN不管与谁比较都是false
alert(!NaN);//相当于alert(!(NaN==true))，根据上面的解释当然是弹出true
 
 
//所以，alert(!+[1,]) 最终在IE上会弹出"true"，下面再来看看firefox等非IE浏览器上的表现
alert(new Boolean(0));//false
alert(new Boolean(1));//true
alert(new Boolean(-1));//true
//即：数字0会转换为false，其它任何数字都会转换为true，所以最终在非IE浏览器上最终等效于：
alert(!1);
//即
alert(!true)//最终会得到false
 
//综上所述：下面的这个判断就能判定浏览器是不是IE
if (!+[1,]){
    alert("我是货真价实的IE浏览器!")
}
else{
    alert("我不是IE!")
}
</script>
复制代码
这个在IE6、7、8里运行是对的，但是在9、10、11里已经修复了，和其他modern浏览器显示效果是一样的，所以，这个使用时要做区分！
复制代码
2. 将日期直接转换成数值
+new Date();
3. 非IE浏览器下将类数组对象'arguments'专为数组

Array.ptrototype.slice.call(arguments);

arguments不是Array的实例，因此不是真正的数组，也就没有slice()方法，但为什么用"Array.prototype.slice"而不是"Array().slice"或"[].slice()"呢？因为这两种方法效率比较低，故使用代码中的写法访问Array的内置函数。
复制代码
 4. 最简单的运算符

var a = 0 || 3;
console.log(a);   //结果3


如果=后面的第一个值计算结果为布尔值“真”，则a的值取第1个，否则取第2个。
复制代码
5.单链式计算

var a = 10;
console.log(a++ -1);

先执行"a-1", 在执行"a = a+1"。
6. 有趣的void操作符

<a href="javascript:void(0)">我是个死链接</a>

void是一种操作符，用来计算一个表达式但不返回值。用法： javascript:void(expression),expression是一个要计算的javascript标准表达式。
7. 跳转至新页面，并且保证浏览器不会再回退
location.replace("url");

location的replace()方法可以用一个新的文档替换当前文档，并且该方法还会覆盖History对象中的记录。
8.几秒钟之后返回上一页
<meta htt-equiv="refresh" content="3, url=javascript:window.hostory.go(-1);">

其中content为设置的时间
9.在打开的子窗口中刷新父窗口
window.opener.location.reload();
1
2
<span style="color: #0000ff;">10. 验证是否为负数的正则表达式</span>
/^-\d+$/.test(str);
 

11. 用javascript打印网页
window.print();

window.print()属于浏览器内置的API，可以直接打印页面
12. 显示/隐藏一个DOM元素
el.style.display = "";
el.style.display = "none";

DOM元素的显示/隐藏主要通过设置元素的样式display属性来实现。
13. 实现alert()中的文本换行
alert("p\np");

"\n"代表换行符。
复制代码
14. 实现ECMAScript5中的Object.create()函数
function clone(proto){
     function _clone() {}
     _clone.prototype =proto;
     _clone.prototype.constructor = _clone;
     return new _clone;                    //等价于Object.create(Person) 
}    
var me = clone(Person);

用原型链形式继承，构造函数重新指向新创建的对象。
复制代码
复制代码
15. 理解javascript中的闭包
//例如，以下代码会输出5次，结果都是5，如何输出1、2、3、4？
for(var i=0; i<5;i++) {
    setTimeout(function(){
         console.log(i);
    },1000);
}       //5次结果都是5

//利用闭包原理实现， 代码如下
for(var i=0; i<5;i++) {
    (function(e) {
        setTimeout(function(){
         console.log(e);
    },1000);
    })(i)
}      //5次结果都是0,1,2,3,4
复制代码
16. 检测Shift、Alt、Ctrl键
//以下是浏览器内置的检测方法
event.shiftKey;         //检测Shift
event.altKey;         //检测Alt
event.ctrlKey;         //检测Ctrl
17.获取屏幕分辨率的宽、高
window.screen.height;   //获取屏幕高度
window.screen.width;    //获取屏幕宽度

window.screen这个对象包含了有关用户屏幕的信息
18.脚本永不出错的方法
window.onerror = function(m, f, l){
   return true; 
};
19.让javascript处理字符与ASCLL码之间的转换
console.log("a".charCodeAt(0));      //97
console.log(String.fromCharCode(75));  //K

charCodeAt()返回指定位置字符的Unicode编码； fromCharCode()接受一个指定的Unicode值，然后返回一个字符串。
复制代码
20. 访问对象属性的代码
var demo = {name: "ki"}

demo.name;         //ki
demo['name'];      //ki
//访问对象属性一般存在两种方式，通过","或 "[]"。 一般情况下两种方式等效，但是"[]"还可以动态设置属性。
var get = 'name';
demo[get];     //ki
复制代码
复制代码
21. 把一个值转化为布尔值的最简单方式
!!"demo"      //true
!!";              //false
!!'0';            //true
!!'1';            //true
!!{};            //true
!!true;         //true

使用"！"操作符两次，可以把一个值转化为布尔值
复制代码
22. 判断浏览器是否支持HTML5
!!navigator.geolocation;

在HTML5中，navigator.geolocation可以获取设备的当前位置，通过"!"就可以判断是否支持此API，即是否支持HTML5。
23. 判断是否支持Canvas
function isCanvas() {
    return !!document.createElement('canvas').getContext;  
}
24.判断IE版本
window.navgator.appVersion

上述代码返回一个字符串， 表示所使用浏览器的版本号。他可能只包含一个数字，比如5.0，还可能包含一些其它信息。
复制代码
25. 声明变量的缩略写法与复杂写法
/*复杂写法*/
var x;
var y;
var z=3;

/*缩略写法*/
var x, y, z=3;

javascript是比较灵活的语言，编程时尽量使用缩略写法，这样会提高javascript性能。
复制代码
复制代码
26. 采取惰性载入的方案提高函数代码的性能
function addEvents(type, element, fun) {
    if(element.addEventListener) {
        element.addEventListener(type, fun, false);
    }
else if(element.attachEvent) {
        element.attachEvent('on' + type, fun);
    }
    else{
         element['on'+tyoe] =fun;
    }   
}

//所谓惰性载入就是在第一次执行代码后，用函数代码内部的方法覆盖原有代码，代码如下：
var addEvents = (function() {
     if(element.addEventListener) {
        element.addEventListener(type, fun, false);
    }
else if(element.attachEvent) {
        element.attachEvent('on' + type, fun);
    }
    else{
         element['on'+tyoe] =fun;
    }   
})();
复制代码
27. 捕捉Ctrl+Enter按键
if(event.ctrlKey && event,keyCode == 13) {
    console.log("you pressed the Ctrl+Enter")
}

enter.ctrlKey检测Ctrl键，event.keyCode == 13检测Enter键。
28. 获取浏览器插件的数目
navigator.plugins.length;

用navigator用来检测浏览器的版本、所支持的MIME类型，已安装的外挂程序（plugin）。
复制代码
29. 实现对Window、 Mac、 UNIX操作系统的操作
var osType = "",
    windows = (navigator.userAgent.indexOf("Windows",0)!=-1)?1:0,
    mac = (navigator.userAgent.toLowerCase().indexOf("mac",0)!=-1)?1:0,
    linux = (navigator.userAgent.indexOf("Linux",0)!=-1)?1:0,
    unix = (navigator.userAgent.indexOf("X11",0)!=-1)?1:0;

    if(windows) osType = "Windows";
    else if(mac) osType = "Mac";
    else if(linux) osType = "Linux";
    else if(unix) osType = "Unix";
    console.log(osType);

navigator.userAgent表示用户代理。
复制代码
复制代码
30. 使用原生javascript判断是否是移动设备浏览器
var MobileReg =/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i ; 
if(mobileReg.test(window.navigator.userAgent.toLowerCase())) {
    alert("移动设备！")；
}else {
    alert("非移动设备！");
}

