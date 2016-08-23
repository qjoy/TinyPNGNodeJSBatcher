/*
 Creator: AlexQ
 */
var tinify = require("./tinify");

/*
	你可以在global.key数组中输入任意N个key, TinyPNG每个月每个免费的KEY都可以压缩500张图片
	申请key请到：https://tinypng.com/developers/subscription注册获取，将以下数组内容替换成你申请到的key
	compressAllFiles函数使用你的key的时候，会自动切换，如果你输入3个key，那么第一个key本月
	压缩数量用完后，会自动切换到第二个key，以此类推。
 */
global.key = [
	"第一个key",
	"第二个key",
	"第三个key",
	"第四个key",
	"第N个key"
];

//初始化
global.keyindex = 0;

/*
	参数说明：
	1.srcfolder:待压缩文件所在文件夹，绝对路径
	2.dstfolder:压缩完成后文件所在文件夹，绝对路径
	3.blockfoldername：不参与压缩文件夹名称：android工程编译后会生成很多中间目录，这些目录咱们不做压缩，
						例如典型的build目录，这个数组中只输入不进行压缩的文件夹名称，例如：['build'],
						那么所有build目录下的文件都不会进行压缩；
	4.blockkeyword:不参与压缩文件后缀：文件名称带有这个数组中出现的关键字，将不参与压缩，典型应用android
						中.9类型的图片我们一半不做压缩，例如：['.9.png'],那么所有名字带有.9.png的文件
						都不会进行压缩；
 */

//压缩所有指定目录文件到另一个指定目录
tinify.compressAllFiles(
	'srcfolder:待压缩文件所在文件夹',
	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.compressAllFiles('/Users/alex_xq/Desktop/youku WORK/laifeng', '/Users/alex_xq/Desktop/out/', ['build'], ['.9.png']);


//工具方法：查找所有可以压缩的文件 
// tinify.tools_checkImages(
// 	'srcfolder:待压缩文件所在文件夹',
// 	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.tools_checkImages('/Users/alex_xq/Desktop/youku WORK/laifeng', '/Users/alex_xq/Desktop/out/', ['build'], ['.9.png']);

//工具方法：查找并拷贝所有可压缩文件 
// tinify.tools_findImageFiles(
// 	'srcfolder:待压缩文件所在文件夹',
// 	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.tools_findImageFiles('/Users/alex_xq/Desktop/youku WORK/laifeng', '/Users/alex_xq/Desktop/out/', ['build'], ['.9.png']);

//工具方法：反向将压缩后的文件覆盖原来对等目录结构的文件 
// tinify.tools_overWriteFiles(
// 	'srcfolder:待压缩文件所在文件夹',
// 	'dstfolder:压缩完成后文件所在文件夹', ['blockfoldername：不参与压缩文件夹名称'], ['blockkeyword：不参与压缩文件后缀']);
//例如：tinify.tools_overWriteFiles('/Users/alex_xq/Desktop/out', '/Users/alex_xq/Desktop/youku WORK/laifeng/', ['build'], ['.9.png']);