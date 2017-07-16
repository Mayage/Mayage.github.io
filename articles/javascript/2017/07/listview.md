# listview
1. 是一个复杂的控件，又很常见；
1. 精髓是数据驱动，视图量最少话。
1. convertView,是通过data来修饰，描画的。理论上，当data相同时，convertView 不需要再根据数据而更新，可以直接返回该convertView。只有当createItem
函数中，要显示的position的data和convertView不符何时，再创建；
