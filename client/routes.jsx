const React = require('react');
const Router = require('react-router');
const {DefaultRoute, Route, RouteHandler, NotFoundRoute, Redirect} = Router;
const {DemoPage} = require('./DemoPage');

const {
  FourOhFour
} = require('./../src');

const USER = global.__env.user;
const CONFIG = global.__env.config;

class App extends React.Component {
  render() {
    return <RouteHandler user={USER} {...this.props}/>;
  }
}

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="demo" path="demo" handler={DemoPage}/>
    <NotFoundRoute handler={FourOhFour}/>
  </Route>
);


module.exports = {routes};
