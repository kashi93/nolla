const React = require("react");
require('./app.scss')

function Welcome(props) {
  return <div>Hello {props.app}</div>;
}

module.exports = Welcome;
