var B = require("baconjs");
var parse = require('../parse');

module.exports = function(fileE) {
	return fileE.doAction(".preventDefault")
		.map(".nativeEvent.dataTransfer.files")
		.map(function(files) {
			return Array.prototype.slice.call(files, 0);
		})
		.flatMap(function(files){
			return B.mergeAll(files.map(function(file) {
				var fileReadE = new B.Bus();
				var reader = new FileReader();
				reader.onload = function(e) {
					fileReadE.push(e.target.result);
					fileReadE.end();
				};
				reader.readAsArrayBuffer(file);
				return fileReadE;
			})).map(parse).reduce([],			
				function(s,v) {
					s.push(v);
					return s;
				});
		});
};