const React = require('react');
const {Link} = require('react-router');

class HomePage extends React.Component {
  render() {
    return (<div className="tui-demo-page">
      <h1>Thinkful UI</h1>
      <p>Shared React components for various Thinkful apps. The nav above
      doesn't respond to your actual login-state, but uses a fake <code>__env.js</code> inside
      thinkful-ui.</p>
      <h3><Link to="/demo">
        Interactive Component Demos
      </Link></h3>

      <h3><Link to="/demo">
        Try Modal
      </Link></h3>
    </div>);
  }
}

module.exports = {HomePage};
