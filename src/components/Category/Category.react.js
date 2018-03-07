var React = require('react');
var ReactDOM = require('react-dom');
var jquery = require('jquery');
var CategorySummary = require('../commons/CategorySummary.react');
var CheckContainer = require('../Check/CheckContainer.react');


module.exports = React.createClass({
  getInitialState : function (){
    return {checks:[]}
  },
  componentWillUpdate : function(nextProps) {
    if(nextProps.params.category !== this.props.params.category){
      this.fetchData(nextProps.params.category);
      return true;
    }
  },
  fetchData : function(category) {
    jquery.get('api/category/'+category,function(data){
      this.setState({checks:data});
    }.bind(this));
  },
  componentDidMount: function() {
    this.fetchData(this.props.params.category);
  },
  render: function(){
    var title;
    switch(this.props.params.category){
      case 'cost_optimizing':
        title = "Cost Optimization";
      break;
      case 'fault_tolerance':
        title = "Fault Tolerance";
      break;
      case 'performance':
        title = "Performance";
      break;
      case 'security':
        title = "Security";
      break;
      case 'service_limits':
        title = "Service Limits";
      break;
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4'>
          </div>
          <div className='col-lg-4'>
            <CategorySummary category={this.props.params.category} title={title} />
          </div>
          <div className='col-lg-4'>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-lg-12'>
              <CheckContainer category={this.props.params.category} checks={this.state.checks}/>
          </div>
        </div>
      </div>
    )
  }
});
