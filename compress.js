var tinify = require("tinify");
var fs = require("fs");
var counter = 0;
var successcounter = 0;
var failedcounter = 0;
global.varA = 0;
global.recomputingkey = false;

var events = require("events");
global.eventCompress = new events.EventEmitter();

function tinifyCompress(srcfile, desfile){

	fs.readFile(srcfile, function(err, sourceData) {
	  if (err) throw err;

	  console.log('compress started.'+srcfile);

	  tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
	    // if (err) throw err;
	    // fs.writeFileSync(desfile, resultData);

	    if (err instanceof tinify.ConnectionError ||
	    	err instanceof tinify.ServerError){
	    	console.log('compress failed.'+srcfile+', recompress.');
			tinifyCompress(srcfile, desfile);
			return;
		}
		else if(err instanceof tinify.ClientError ||
				err instanceof tinify.AccountError){

			if (err.message.indexOf('Your monthly limit has been exceeded') >= 0){
				/*该账户数目超过，换下一个key重试*/
				//查看是否还有可用的账户
				if (global.recomputingkey === false){
				//尚未在本次换过key
					global.recomputingkey = true;
					global.keyindex++;
					if (global.keyindex < global.key.length){
						console.log('use no'+global.keyindex+' account key.');
						tinify.key = global.key[global.keyindex] ;
						tinifyCompress(srcfile, desfile);
					}
					else{
						console.log('no valide account.');
						process.exit();
					}
				}
				else{
				//已经在本次换过key
					tinifyCompress(srcfile, desfile);
				}
				return;
			}
			
			console.log('comressed failed:'+(counter+1)+'/'+global.varA+'('+desfile+')');
			tinifyCounter(1);
			return;
		}

		fs.writeFileSync(desfile, resultData);
		console.log('comressed:'+(counter+1)+'/'+global.varA+'('+desfile+')');
		tinifyCounter(0);

	  });
	});
}

function tinifyCounter(type){
	switch(type){
		case 0:
			successcounter++;
			break;
		case 1:
			failedcounter++;
			break;
		default:
			break;
	}
	counter++;

	global.eventCompress.emit('compressFinish');

	if (counter === global.varA){
		global.eventCompress.emit('FinishAll');
		var result = "result  {success:"+successcounter+"/"+counter+",failed:"+failedcounter+"/"+counter+"}";
		console.log(result);
	}
}

exports.tinifyCompress  = tinifyCompress;