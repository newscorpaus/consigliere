var React = require('react');
var ReactDOM = require('react-dom');
var jquery = require('jquery');
var Menu = require('./Menu/Menu.react');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    )
  }
});
