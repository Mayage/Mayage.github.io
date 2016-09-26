###新版本开发记录
## onLanguageChanged：
前提：
1、在目前结构中，需要语言显示的对象，其属性中标识语言的key可以是text\tab\info\reminder\等，但只要是换语言，都要经过T函数转化；
2、之前的结构在BaseApplication中，通过get\set language & skin 接口来保存语言、皮肤信息；当被修改时，将事件逐级分发到Areas-BaseViews-BaseWidgetViews-BasePopup的各个中。
	缺点：
		a)当一个对象的文言在程序中动态改变了，换语言还是会更新为style中的文字；
		b)每增加一个层级结构，例如widget，就要假设一个语言消息传递通道；
	 
新设计考虑：
1、设想，每一个通过StyleView创造出来的View，在进行T函数转化时，通过LocalizationPool式将“view-对象-属性-值”记录起来，保存在这个View上，再将这个view通过registerLanguageEvent注册到语言监听函数中。当语言更换时，所有注册的view被触发更换语言，而且可以2-a,2-b中的麻烦。
	缺点：
        a) 修改了parseMacro函数，增加传递参数；
        b) 当一个view由于没有绑定父，被回收后，还会调用这个函数的onLanguageChanged事件，从而导致crash；
		
2、在1实现的前提上，整个view注册到BaseApplication中的语言监听器上，监听器可以做按顺序、异步的更新，不过目前设计只实现简单的同步刷新；
3、util中增加readLanguageJSON函数负责语言加载：大多数view都会访问相同的目标文件来获取语言值，readLanguageJSON函数进行缓存操作，这样可以减少IO读写次数，提高性能；
4、语言下面也要分目录，以适应多种车型；
#以上为2016-09-20发布记录。


## onSkinChanged：
1、之前的结构在BaseApplication中，通过get\set language & skin 接口来保存语言、皮肤信息；当被修改时，将事件逐级分发到Areas-BaseViews-BaseWidgetViews-BasePopup的各个中。
	缺点：
		a)当一个对象的文言在程序中动态改变了，责换语言还是会更新为style中的文字；
		b)每增加一个画面类型，就要假设一个语言消息传递通道；
2、这个功能是预留的，目前都没有用到，不过还是要兼顾的。
#以上为2016-09-20发布记录。

## 事件绑定、传递



## json文件变动
1、"source": "RES(/res/pic_setting_ldw_02.jpg)" 
#以上为2016-09-20发布记录。

## CommonEvents.js
1、存放不同resolution下，同类view都会用到的函数，比如说画面中点击事件、公用的动画等；也可以通过组合继承，定制各自的事件对象如：exports.LDW10_4 和 exports.LDW8都拓展了LDWCommonEvents对象；
2、LDWCommonEvents中有commonInit函数，是不同resolution下，同类view都会用到的共同的初始化部分，包含模型注册,动画初始化等；
3、CommonEvents中不同resolution下，相同view的不同初始化函数，需要自己重写initialize函数；
#以上为2016-09-20发布记录。
