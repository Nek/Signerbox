var B = require("baconjs");
var parse = require('../parse');

function readFile(file) {
				var fileReadE = new B.Bus();
				var reader = new FileReader();
				reader.onload = function(e) {
					fileReadE.push(e.target.result);
					fileReadE.end();
				};
				reader.readAsArrayBuffer(file);
				return fileReadE;
			}

function toArray(fakeArray) {
	return Array.prototype.slice.call(fakeArray, 0);
}

function parallel(action, arr) {
	return B.mergeAll(arr.map(action));
}

function readParseCollect(files) {
				return parallel(readFile, files)
					.map(parse)
					.reduce([],			
						function(s,v) {
							s.push(v);
							return s;
						})
				}

function parseFiles(fileE) {
		return fileE
		.doAction(".preventDefault")
		.map(".nativeEvent.dataTransfer.files")
		.map(toArray)
		.flatMap(readParseCollect);
	};

var inE = new B.Bus();
var outE = parseFiles(inE);

module.exports = {
	files: inE,
	parsedFiles: outE
}