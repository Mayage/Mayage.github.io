
AppWidgetProvider / AppWidgetService(IAppWidgetService) / AppWidgetManager等组件做简要的阐述。Android中的AppWidget也就是“窗口小部件”,实现了桌面(Launcher)上显示控件的机制,并能响应用户的点击操作。而实际上,提供显示的UI元素和对点击事件的响应是由Remote端的AppWidgetProvider实现;具体显示是Local的AppWidgetHost通过AppWidgetHostView实现。AppWidgetHost、AppWidgetProvider与AppWidgetService和AppWidgetManager按照特有的机制组合在一起,才能完整的实现AppWidget机制。



1. RemoteViews remoteViews = new RemoteViews(getPackageName(), R.layout.layout_notification);

1. AppWidgetProvider
    - 桌面小部件通过AppWidgetProvider来实现的，它的本质是一个广播。AppWidgetProvider提供了几个主要的方法， onUpdate, onEnable, onDisable, onDeleted 以及 onReceive。 其中onReceive会根据广播的Action响应， 然后再调用其它方法。

1. PendingIntent
    - is a token that you give to a foreign application (e.g. NotificationManager, AlarmManager, HomeScreen AppWidgetManager , or other 3rd party applications), which allows the foreign application to use your application's permissions to execute a predefined piece of code.
    - PendingIntent支持3种特定意图： getActivity(), getService()，getBroadcast()， 分别是打开activity, service和broadcast
1. RemoteView
    - 可以看到一个现象：RemoteView没有提供findViewById方法， 因此无法直接访问里面的view元素，而必须通过一系列的set方法（例如 setTextViewText(int viewId, CharSequence text)）
    - 上述的两个例子NotificationManager/AppWidgetmanager分别通过Binder和NotificationManagerService/AppWidgetService进程通信， 所以通知栏和桌面部件的界面也是在SystemService中被加载， 从而构成了跨进程通信的场景。
    - RemoteView实现了Parcelable接口，会通过Binder传递到SystemServer进程。
    - 如果View的操作通过Binder实现的话，view的方法太多成本较高，而且大量的IPC操作会影响效率。解决方法：Android系统提供了Action的概念，Action封装了具体的操作， 然后传输到远程SystemServer进程中。
    - RemoteViews内部有主要的方法（apply,reapply）来实现Action的操作。
    
1. AppWidgetProvider & AppWidgetHost
Android中AppWidget的图形资源是由AppWidgetProvider通过RemoteViews提供的;而显示是由AppWidgetHost通过AppWidgetHostView把RemoteView提供的内容显示在本地View上的。AppWidgetProvider和AppWidgetHostView运行在不同的程序中,而它们沟通的图形元素和点击回馈的桥梁就是RemoteViews。



### 推荐阅读

- [Android中RemoteViews的实现][ref1]
- [Android中AppWidget的分析与应用：AppWidgetProvider][ref2]
- [Android中Launcher对于AppWidget处理的分析：AppWidgetHost角色][ref21]
- [Android中选取并绑定AppWidget][ref3]
- [Android AppWidget系统框架][ref4]
- [UML类图与类的关系详解][uml]
    
[ref1]: http://blog.csdn.net/thl789/article/details/7893908
[ref2]: http://blog.csdn.net/thl789/article/details/7887968
[ref21]: http://blog.csdn.net/thl789/article/details/7893292 
[ref3]: http://blog.csdn.net/thl789/article/details/7880650
[ref4]: http://blog.csdn.net/thl789/article/details/7879257
[uml]: http://www.uml.org.cn/oobject/201104212.asp


