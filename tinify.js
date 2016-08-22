/*
 Creator: AlexQ
 */
var walkDir = require("./walkDir");
var compress = require("./compress")
var compresslogic = require("./compresslogic");

// 检查所有符合要求可以上传的图片，并上传等待压缩结果
function compressAllFiles(srcpath, despath, blackfoldername, blackfilenamekeywords) {

	echoStartInfo();

	var tinify = require("tinify");

	tinify.key = global.key[global.keyindex];

	var preCompressFilesMap = new Array();
	//1.遍历纪录所有需要上传压缩的信息11
	console.log('checking files ......');
	walkDir.walk(srcpath, srcpath, despath, 0, walkDir.handleFile, preCompressFilesMap, blackfoldername, blackfilenamekeywords);
	global.varA = preCompressFilesMap.length;

	//2.压入队列开始上传
	console.log('compressing files ......');
	preCompressFilesMap.sort(function(a, b) {
		return Math.random() > .5 ? -1 : 1;
	});
	compresslogic.compressLogicDo(compress.tinifyCompress, preCompressFilesMap);

}

// 检查所有符合要求可以上传的图片的数量
function checkImageFilesCount(srcpath, despath, blackfoldername, blackfilenamekeywords) {

	echoStartInfo();
	var preCompressFilesMap = new Array();
	//1.遍历纪录所有需要上传压缩的信息
	console.log('checking files ......');
	walkDir.walk(srcpath, srcpath, despath, 0, walkDir.handleFile, preCompressFilesMap, blackfoldername, blackfilenamekeywords);
	//2.打印结果
	console.log('image files:' + preCompressFilesMap.length);

	var srcSize = 0;
	preCompressFilesMap.forEach(function(element, index) {
		var fs = require('fs');
		srcSize += fs.lstatSync(element.a).size;
	});
	console.log('before:' + (srcSize / 1024).toFixed(2) + ' KB');
}

// 检查所有符合要求可以上传的图片的数量将所有筛选的图片拷贝到指定文件夹
function findCanCompressedImageFiles(srcpath, despath, blackfoldername, blackfilenamekeywords) {

	echoStartInfo();
	var preCompressFilesMap = new Array();
	//1.遍历纪录所有需要上传压缩的信息
	console.log('checking files ......');
	walkDir.walk(srcpath, srcpath, despath, 0, walkDir.handleFile, preCompressFilesMap, blackfoldername, blackfilenamekeywords);
	//2.打印结果
	console.log('image files:' + preCompressFilesMap.length);

	var srcSize = 0;
	preCompressFilesMap.forEach(function(element, index) {
		var fs = require('fs');
		srcSize += fs.lstatSync(element.a).size;

		//copy
		var desfilepath = despath + element.a.substr(srcpath.length + 1);
		var srcfilepath = element.a;

		copy(srcfilepath, desfilepath);

	});
	console.log('before:' + (srcSize / 1024 / 1024).toFixed(2) + ' MB');
}

// 将指定目录的图片强制按照目录对等结构覆盖
function overWriteCompressedImageFiles(srcpath, despath, blackfoldername, blackfilenamekeywords) {

	echoStartInfo();
	var preCompressFilesMap = new Array();
	//1.遍历纪录所有需要上传压缩的信息
	console.log('checking files ......');
	walkDir.walk(srcpath, srcpath, despath, 0, walkDir.handleFile, preCompressFilesMap, blackfoldername, blackfilenamekeywords);
	//2.打印结果
	console.log('image files:' + preCompressFilesMap.length);

	var srcSize = 0;
	preCompressFilesMap.forEach(function(element, index) {
		var fs = require('fs');
		srcSize += fs.lstatSync(element.a).size;

		//copy
		var desfilepath = despath + element.a.substr(srcpath.length + 1);
		var srcfilepath = element.a;

		copy(srcfilepath, desfilepath);

	});
	console.log('before:' + (srcSize / 1024 / 1024).toFixed(2) + ' MB');
}

function echoStartInfo() {
	console.log('start \n{info ' + '(key counts:' + global.key.length + ')' + '/n}\n');
}

function copy(src, dst) {
	var fs = require('fs');
	fs.writeFileSync(dst, fs.readFileSync(src));
}

exports.compressAllFiles = compressAllFiles
exports.tools_findImageFiles = findCanCompressedImageFiles
exports.tools_checkImages = checkImageFilesCount
exports.tools_overWriteFiles = overWriteCompressedImageFiles