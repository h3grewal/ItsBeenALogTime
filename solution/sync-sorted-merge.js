'use strict'

module.exports = (logSources, printer) => {
	var arr = []; 

	for(let i = 0; i < logSources.length; i++) { 
		arr.push({
			id: i, 
			logSource: logSources[i].pop()
		});  
	}

	arr.sort(function(a,b){		
		var c = a.logSource.date;
		var d = b.logSource.date;
		return d>c ? -1 : d<c ? 1 : 0;
	});

	while(arr.length > 0) {
		var latestLog = arr.shift(); 
		if(latestLog === false) 
			continue; 
	
		printer.print(latestLog.logSource); 
		var newSourceFromSameLogSource = logSources[latestLog.id].pop();
		if(newSourceFromSameLogSource != false) { 
			arr.push({
				id: latestLog.id, 
				logSource: newSourceFromSameLogSource
			});

			arr.sort(function(a,b){		
				var c = a.logSource.date;
				var d = b.logSource.date;
				return d>c ? -1 : d<c ? 1 : 0;
			});
		}
	}

	printer.done(); 
}