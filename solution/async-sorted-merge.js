'use strict'
var asyncLoop = require('node-async-loop');


module.exports = (logSources, printer) => {
	var arr = []; 
	var logSourcesCt = logSources.length; 
	var logSourcesLen = logSources.length; 

	var queryNextLog = function(index) {
		//initially we want to query all the logSources at once
		if(index === -1)  { 
			for(let i = 0; i < logSources.length; i++) { 
				logSources[i].popAsync().then(function(val) {
					printSomething(i, val); 
				}); 
			}
		} else { 
			logSources[index].popAsync().then(function(val) {
				printSomething(index, val); 
			}); 
		}
	}

	var printSomething = function(i, val) { 
		if(val === false) { 
			logSourcesCt--; 
			if(logSourcesCt === 0) { 
				printer.done(); 
				return;
			}
		} else {
			arr.push({id: i, log: val});
		}

		if(arr.length >= logSourcesCt) {
			arr.sort(function(a,b){		
				var c = a.log.date;
				var d = b.log.date;
				return d>c ? -1 : d<c ? 1 : 0;
			});
			var latest = arr.shift(); 
			printer.print(latest.log); 
			queryNextLog(latest.id); 
		}
	}

	queryNextLog(-1); 
}