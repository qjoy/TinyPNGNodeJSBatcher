
var m_allCompressFilesMap;
var m_compressfunc;
var m_indexCompressing = 0;
var m_countCompressing = 0;

global.sMaxCompress = 5;

function compressLogicDo(compressfunc, preCompressFilesMap){

	m_allCompressFilesMap = preCompressFilesMap;
	m_compressfunc = compressfunc;

	//激发压缩逻辑
	doCompressArray();
} 

function doCompressArray(){

	for (; m_indexCompressing < m_allCompressFilesMap.length; m_indexCompressing++){

		if (m_countCompressing === global.sMaxCompress)
			return;

		var compressfile = m_allCompressFilesMap[m_indexCompressing];
		m_countCompressing++;
		m_compressfunc(compressfile.a, compressfile.b);
	}
}

//单个压缩任务完成
global.eventCompress.on("compressFinish",function(){
    m_countCompressing--;
    if (m_countCompressing === 0){
    	global.recomputingkey = false;
    	doCompressArray();
    }
})

//单个压缩任务完成
global.eventCompress.on("FinishAll",function(){
	var srcSize = 0;
	var desSize = 0;
    m_allCompressFilesMap.forEach(function(element, index){
    	var fs = require('fs');
    	srcSize += fs.lstatSync(element.a).size;
    	desSize += fs.lstatSync(element.b).size;
    });
    console.log('before:'+(srcSize/1024).toFixed(2)+'KB, after:'+(desSize/1024).toFixed(2)+'KB, compressed:'+((1-desSize/srcSize)*100).toFixed(1)+'%');
})

exports.compressLogicDo = compressLogicDo;
