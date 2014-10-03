/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var B = require("baconjs");

var parseFiles = require('./async/parseFiles');

var Signer = React.createClass({
	getInitialState: function() {
		var self = this;

		var fileE = new B.Bus();
		var resultE = parseFiles(fileE);

		resultE.onValue(function(vvv) {
			var certs = vvv.filter(function(s) {
				return s.format === "X.509";
			});
			if (certs.length !== 1) {
				console.log("bullshit");
				self.setState({cert: null, key: null});
			} else {
				self.setState({cert: certs[0]});
			}
		});

		return {cert: null, key: null, parseFile: function(e) { fileE.push(e)} };
	},
	onDragOver: function(e) {
		e.preventDefault();
	},
	render: function() {
		if (this.state.cert) {
			return (<div style={{width: 200, height: 200}} onDrop={this.state.parseFile} onDragOver={this.onDragOver}>!!!</div>);
		} else {
			return (<div style={{width: 200, height: 200}} onDrop={this.state.parseFile} onDragOver={this.onDragOver}>
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