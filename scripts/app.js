/** @jsx React.DOM */
'use strict';

var React = require("react/addons");
var Signer = require("./components/Signer");



var App = React.createClass({
  render() {
	return (
		<Signer/>
	);
  }
});

module.exports = App;