### grunt
1. 在开发根据车型可配置化项目时，使用了grunt工具。
    - grunt的task是按grunt.task.run的调用顺序而执行的；
    - grunt的task在registerTask时，如果有调用其他task，这些会在register函数运行完才开始执行。所以不能依赖一个task.run的结果来registerTask。如果需要，则另外注册一个task，在调用registerTask的时候函数运行完后调用另一个task
    - grunt 

2. nodejs的fs命令
    - fs.rmdir,fs.rmdirSync两个命令，都是用来清除空目录的命令；
    - fs.unlink,fs.unlinkSync两个命令，是用来删除文件的；

3. node.js的child_process
    - 官网https://nodejs.org/api/child_process.html
    - 用来删除一个非空目录：execSync("mv " + appBuildDir + "/* " + configedApps[i].appPath, function(err) {}
    - 异步版本删除非空目录：exec("mv " + appBuildDir + "/* " + configedApps[i].appPath, function(err) {}

4. js端代码的处理：
    - js端的代码，会有压缩，混淆，加密三个；混淆uglify，分离常量、打乱控制流、增加无义代码、检查运行环境如果不对就罢工是常用的方法。
