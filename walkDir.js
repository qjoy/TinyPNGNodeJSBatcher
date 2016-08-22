/*
 Creator: AlexQ
 */

/**
	遍历文件夹查找文件，并进行compress操作
**/

var fs = require('fs');
var path = require('path');

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function handleFile(filepath, curpath, despath, floor, preCompressFilesMap, blackfilenamekeywords) {
    var files = new Array()
    var blankStr = '';
    for (var i = 0; i < floor; i++) {
        blankStr += '    ';
    }

    var stats = fs.statSync(curpath);


    if (stats.isDirectory()) {
        // 文件夹不处理
        // console.log('+' + blankStr + curpath);  
    } else {

        // console.log('-' + blankStr + curpath);  

        //按照原始路径创建对应的目录
        var subdirpath = curpath.substr(filepath.length + 1);
        var newPath = despath + subdirpath;
        var subdir = path.dirname(newPath);

        mkdirsSync(subdir);

        // tinifyCompress(curpath, newPath);
        var obj = new Object();
        obj.a = curpath;
        obj.b = newPath;
        preCompressFilesMap.push(obj);
    }


}

function walk(srcpath, curpath, despath, floor, handleFile, preCompressFilesMap, blackfoldername, blackfilenamekeywords) {

    handleFile(srcpath, curpath, floor, preCompressFilesMap);
    floor++;
    var files = fs.readdirSync(curpath);

    files.forEach(function(item) {

        if ((blackfoldername && !blackfoldername.contains(item)) || (!blackfoldername)) {
            var tmpPath = curpath + '/' + item;

            var stats = fs.statSync(tmpPath);


            if (stats.isDirectory()) {
                walk(srcpath, tmpPath, despath, floor, handleFile, preCompressFilesMap, blackfoldername, blackfilenamekeywords);
            } else {

                var isblackfile = false;

                //仅对图片进行处理png, jpeg, jpg
                if (path.extname(tmpPath).toLowerCase() !== '.png' &&
                    path.extname(tmpPath).toLowerCase() !== '.jpeg' &&
                    path.extname(tmpPath).toLowerCase() !== '.jpg') {
                    isblackfile = true;
                }

                //查看文件命名规则黑名单是否符合
                if (isblackfile == false && blackfilenamekeywords) {

                    blackfilenamekeywords.forEach(function(itemblackkeyword) {

                        if (tmpPath.indexOf(itemblackkeyword) > 0) {
                            isblackfile = true;
                        }
                    });
                }


                if (!isblackfile)
                    handleFile(srcpath, tmpPath, despath, floor, preCompressFilesMap, blackfilenamekeywords);
            }
        }

    });

}

//创建多层文件夹 同步
function mkdirsSync(dirpath) {

    if (!fs.existsSync(dirpath)) {

        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {

            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                pathtmp = dirname;
            }

            if (pathtmp !== '' && !fs.existsSync('/' + pathtmp)) {
                if (!fs.mkdirSync('/' + pathtmp)) {
                    return false;
                }
            }
        });
    }
    return true;
}

exports.walk = walk;
exports.handleFile = handleFile;
exports.mkdirsSync = mkdirsSync;