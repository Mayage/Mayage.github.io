1. 调用getSystemService(NOTIFICATION_SERVICE)方法获取系统的NotificationManager服务，它是一个重要的系统服务。应用程序可以通过NotificationManager 向系统发送全局通知；
2. 构造Notification.Builder对象；
3. 设置Notification.Builder对象的各种属性；
4. 通过NotificationManager 的notify()方法发送Notification。


NotificationManager  manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
builder = new Notification.Builder(this);
builder.setAutoCancel(true);
builder.setSmallIcon(R.drawable.alert);
builder.setContentTitle("标题");
builder.setContentText("文本");
builder.setDefaults(Notification.DEFAULT_SOUND| Notification.DEFAULT_VIBRATE);
Intent intent = new Intent(this, SecondActivity.class);
PendingIntent pIntent = PendingIntent.getActivity(this, 1, intent,PendingIntent.FLAG_ONE_SHOT);
builder.setContentIntent(pIntent);
manager.notify(0, builder.build());



（六）、Intent和PendingIntent的区别：【掌握，以备面试之需】
 Intent是立即使用的，而PendingIntent可以等到事件发生后触发，PendingIntent可以cancel；
 Intent在程序结束后即终止，而PendingIntent在程序结束后依然有效；
 PendingIntent自带Context，而Intent需要在某个Context内运行；
 Intent在原task中运行，PendingIntent在新的task中运行。
