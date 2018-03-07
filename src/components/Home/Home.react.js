var React = require('react');
var ReactDOM = require('react-dom');
var CategorySummary = require('../commons/CategorySummary.react');

module.exports = React.createClass({
  render: function(){
    return (
      <div className='vcenter'>
        <div className='col-md-2 col-md-offset-1'>
          <CategorySummary category='cost_optimizing' title='Cost Optimization' />
        </div>
        <div className='col-md-2'>
          <CategorySummary category='performance' title='Performance' />
        </div>
        <div className='col-md-2'>
          <CategorySummary category='security' title='Security' />
        </div>
        <div className='col-md-2'>
          <CategorySummary category='fault_tolerance' title='Fault Tolerance' />
        </div>
        <div className='col-md-2'>
          <CategorySummary category='service_limits' title='Service Limits' />
        </div>
      </div>
    )
  }
});
