const React = require('react');

require('./styles/demo.less')

class DemoPage extends React.Component {
  render() {
    return (<div className="tui-demo-page">
      <h1>Should look like h1</h1>
    </div>);
  }
}

module.exports = {DemoPage};
