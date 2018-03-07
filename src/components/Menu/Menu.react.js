var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var MenuItem = require('./MenuItem.react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <img alt="Consigliere" src="images/consigliere_400x147_white.png" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <MenuItem category="cost_optimizing" title="Cost Optimizing" />
                <MenuItem category="performance" title="Performance" />
                <MenuItem category="security" title="Security" />
                <MenuItem category="fault_tolerance" title="Fault Tolerance" />
                <MenuItem category="service_limits" title="Service Limits" />
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/accounts">Accounts <span className="label label-danger label-as-badge"></span></Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
});
