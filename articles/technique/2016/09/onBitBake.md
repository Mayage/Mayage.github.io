#bitBake thought

##bitbake 
	*放工具的bitbake目录
	*放元数据的目录
	*执行构建的build目录

### bitbake目录
	这个目录里是我们的烹饪工具:bitbake。我们使用它,但通常不需要访问它
###元数据目录
	*classes
	*conf
	*packages

###build目录下有tmp目录，和config目录。tmp目录下面存放了cache、cross、rootfs、staging、work、deploy和stamps目录
1. cross交叉编译器
1. cache是bitbake中使用的缓存目录
1. rootfs是制作文件系统映像前临时建立的根文件系统
1. work目录
	所有软件包的解包、打补丁、配置、编译、安装等工作都是在work目录进行的。所以work目录包含了整个嵌入式系统的完整源代码。
	work目录下按照硬件平台、发行人、目标平台的不同又分了几个子目录。所有软件包都被放在对应子目录中。每个软件包都有一个独立的目录。因为软件包总是 根据一个配方(recipes)文件构建的,所以软件包所在的目录就是对应配方(recipes)文件的工作目录。在讨论bitbake和配方(recipes)文件时我们还会回来,更仔细地观察配方(recipes)文件的工作。
1. staging目录
	软件包B在构建时可能依赖软件包A提供的头文件、库文件,也可能要使用软件包C生成的工具。 staging目录就是放这些输出文件的地方。
	我们必须在配方(recipes)文件中用“DEPENDS”变量声明构建时的依赖关系。bitbake就会在构建软件包B前先构建软件包A和软件包C,并将软件包B需要的头文件、库文件、和工具放在staging目录。这样,在构建软件包, 时就可以从staging目录得到需要的头文件、库文件、和工具。
1. deploy目录
	这是保存输出成果的目录。其中images目录保存构建成功后产生的文件系统映像、内核映像。
1. stamps目录
	和work目录类似,stamps目录也按照硬件平台、发行人、目标平台的不同又分了几个子目录。软件包在完成每个bitbake任务后都会在对应子目录里touch一个对应任务的时间戳。有时我们会手工删除某个软件包的时间戳,强制bitbake重新构建这个软件包。
	
	
##1. Overview BB
###1.3 concepts
	*recipes:

	BitBake Recipes, which are denoted by the file extension .bb, are the most basic metadata files. These recipe files provide BitBake with the following:

Descriptive information about the package

The version of the recipe

Existing Dependencies

Where the source code resides

Whether the source code requires any patches

How to compile the source code

Where on the target machine to install the package being compiled

Within the context of BitBake, or any project utilizing BitBake as its build system, files with the .bb extension are referred to as recipes.


	*configuration file
	*Classes
	*Layers
	*Append files
Information in append files overrides the information in the similarly-named recipe file.

###1.5 the bitbake commonds
	*usage and syntax
		
	


##名词解释
*fetcher：提取程序
*corner stone：基石
*better leverage the power of BitBake:最大限度使bitbake的力量；
*rudimentary: 初步
*curly braces:大括号
*iterates:迭代
*prioritized:优先
*Checksums:jiao yan


##2. Execution

###2.1. Parsing the Base Configuration Metadata

* The execution process is launched using the command:`$ bitbake <target>`
* parallel thread execution by setting the BB_NUMBER_THREADS
* BBPATH is used to search for configuration and class files under conf/ and class/ directories, respectively. 
* The layer.conf files are used to construct key variables such as BBPATH and BBFILES. 
* BBFILES is used to find recipe files (.bb and .bbappend). If there is no bblayers.conf file, it is assumed the user has set the BBPATH and BBFILES directly in the environment.
* Prior to parsing configuration files, Bitbake looks at certain variables, including:
	*BB_ENV_WHITELIST
	*BB_PRESERVE_ENV
	*BB_ENV_EXTRAWHITE
	*BITBAKE_UI



###2.2. Locating and Parsing Recipes
###2.3. Preferences and Providers
###2.4. Dependencies
###2.5. The Task List
###2.6. Executing Tasks
###2.7. Checksums (Signatures)
###2.8. Setscene


## install HelloWorld
1. need python 3.4 or higher, best way is to get the code from offcial site
2. while compiling python, shuld: sudo apt-get install libsqlite3-dev
3. then follow the instruction on bitbake.
 


>>>>>>> 58455274ec62c3e51eafe5571d085c30d6681a35:articles/technique/2016/09/onBitBake.md
