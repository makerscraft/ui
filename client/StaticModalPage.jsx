const React = require('react');
const {Modal} = require('../src');

class StaticModalPage extends React.Component {
  render() {
    return (<Modal>
      <h1>This is a modal</h1>
      <p>It has things but isn't tied to any sort of user action, rather it's
        sitting on a route.</p>
    </Modal>);
  }
}

module.exports = {StaticModalPage};
