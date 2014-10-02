/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var parse = require('./parse');
var B = require("baconjs");

var Signer = React.createClass({
	getInitialState: function() {
		return {cert: null, key: null};
	},
	onDrop: function(e) {
		e.preventDefault();

		var files = [];

		for (var i = 0, f; f = e.nativeEvent.dataTransfer.files[i]; i++ ) {
			files.push(e.nativeEvent.dataTransfer.files[i]);
		};

		var self = this;

		var types = B.fromArray(files).flatMap(function(f){
			var res = new B.Bus();
			var reader = new FileReader();
			reader.onload = function(e) {
				res.push(e.target.result);
			};
			reader.readAsArrayBuffer(f);
			return res;
		}).map(parse).take(files.length).reduce([],
		function(s,v) {
			s.push(v);
			return s;});

		types.onValue(function(vvv) {
			var certs = vvv.filter(function(s) {
				return s.format === "X.509";
			});
			if (certs.length !== 1) {
				console.log("bullshit");
			} else {
				self.setState({cert: certs[0]});
			}
		})

	},
	onDragOver: function(e) {
		e.preventDefault();
	},
	render: function() {
		if (this.state.cert) {
			return (<div>!!!</div>);
		} else {
			return (<div style={{width: 200, height: 200}} onDrop={this.onDrop} onDragOver={this.onDragOver}>
				Drop key and certificate
			</div>)
		}
	}
})

var App = React.createClass({
  render() {
	return (
		<Signer/>
	);
  }
});

module.exports = App;