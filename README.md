# TinyPNGNodeJSBatcher
**by AlexQ （[email](alexq_andr@163.com) alexq_andr@163.com）**


##**工程源码托管在 [GitHub](https://github.com/xueqing325/TinyPNGNodeJSBatcher.git) ** follow&star

###[TinyPNG](https://tinypng.com)
	Smart PNG and JPEG compression
	Optimize your images with a perfect balance in quality and file size.
如果你想进一步了解TinyPNG压缩图片请移步官网[TinyPNG](https://tinypng.com)查看。

![tinypngPanda](http://7xox5k.com1.z0.glb.clouddn.com/tinypngPanda.png)


###什么是TinyPNGNodeJSBatcher?
提供一个NodeJS环境下，基于TinyPNG服务的，批量压缩任意数量图片的工具。

###使用
熟悉tinypng的朋友可以直接进入使用阶段，不熟悉的可以先阅读下面的内容再回头来看这个部分。

1. 安装NodeJS环境：随便百度一下你使用的平台如何安装吧，大把大把的资料；
2. 修改index.js工程文件：
	* 申请API KEY（如何申请下面的部分找一下），填写到global.key中 ；
	* 使用**compressAllFiles**入口，将参数设置成自己的吧；
3. 启动执行压缩：
	* cd到工程目录
	* node index.js	

demo运行结果(工程中很多图片都已经被压缩过了，所以压缩率demo中不高，你可以用你的工程看一下，效果明显)：

![demo](http://7xox5k.com1.z0.glb.clouddn.com/tinypng-demo.png)	

###实际场景中的批量压缩
TinyPNG提供了不错的图片压缩，但是免费版本每个月只能免费压缩500张图片，而且我看到产品同学、设计同学往往都是手动的将每一张图片拖动到TinyPNG中，手动的话每次20张图片，这样很不方便，白白耗费人力耗费时间。

![tinypngcomplex](http://7xox5k.com1.z0.glb.clouddn.com/tinypngcomplex.png)

###申请TinyPNG的KEY
https://tinypng.com/developers/subscription

![getapikey](http://7xox5k.com1.z0.glb.clouddn.com/tinypnggetapikey.png)

###解决痛点
我们实际应用中，可能是需要对一个成型的产品里面所有图片文件统一执行压缩，而且图片可能会分散在不同的目录下，那么**TinyPNGNodeJSBatcher**就是解决这些痛点的。

###简单易用
1. 一个调用就将你指定目录下（允许带有子文件夹的任意目录）图片文件多线程利用tinypng在线压缩;
2. 如果你指定了多个tinypng可用的key,那么在第一个key每月500张使用完后，**TinyPNGNodeJSBatcher**会自动切换使用第二个key，依此类推，做到不限数量的批量压缩，多找几个邮箱注册就可以获得多个可用的APIKey啦;
3. 结合实际，接口中可以指定那些你不想它们参与压缩的目录，例如：android工程编译后会生成很多中间目录，这些目录咱们不做压缩，典型的就是build目录;
4. 接口中可以指定那些不想参与压缩的，带有关键字文件名称，也就是说名字包含这些字串的文件将不参与压缩，典型应用android中“.9”类型的图片我们一般不做压缩，例如：['.9.png'];

###浏览接口
1. **compressAllFiles:核型功能－压缩所有指定目录文件到另一个指定目录**
2. *tools_checkImages:工具方法*－查找所有可以压缩的文件
3. *tools_findImageFiles:工具方法*－查找并拷贝所有可压缩文件 
4. *tools_overWriteFiles:工具方法*－反向将压缩后的文件覆盖原来对等目录结构的文件

###测试
Mac上测试可用

###License

	Copyright 2016 AlexQ
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

   	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.




