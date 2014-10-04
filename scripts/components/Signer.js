/** @jsx React.DOM */
'use strict';

var React = require("react/addons");
var filesParser = require("../async/parseFiles");

var Signer = React.createClass({
	getInitialState: function() {
		var self = this;

		filesParser.parsedFiles.onValue(function(data) {
			console.log(data);
			data.forEach(function(v) {
				switch (v.format) {
					case "x509": 
						self.setState({cert: v});
						break;
					case "privkeys":
					case "PBES2":
						self.setState({key: v});
						break;
					default:
						console.log("some bullshit data");
				}
			});
		});

		return {cert: null, key: null, parseFile: function(e){filesParser.files.push(e)}};
	},
	onDragOver: function(e) {
		e.preventDefault();
	},
	render: function() {

		var message = <div>Drop key and certificate</div>;

		if (this.state.cert && this.state.key) {
			message = <div>Key and certificate accepted</div>;
		} else
		if (this.state.cert) {
			message = <div>Certificate accepted.<br/>Drop key.</div>;
		} else 
		if (this.state.key) {
			message = <div>Key accepted.<br/>Drop certificate.</div>;
		}

		return (<div style={{width: 200, height: 200, background: "lightgrey"}} onDrop={this.state.parseFile} onDragOver={this.onDragOver}>{message}</div>)
	}
})

module.exports = Signer;