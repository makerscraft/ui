const React = require('react');
const {Link} = require('react-router');
const {Modal} = require('./../src');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
  }

  toggleModal() {
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    })
  }

  render() {
    const {modalIsOpen} = this.state;
    return (<div className="tui-demo-page">
      <h1>Thinkful UI</h1>
      <p>Shared React components for various Thinkful apps. The nav above
      doesn't respond to your actual login-state, but uses a fake <code>__env.js</code> inside
      thinkful-ui.</p>
      <h3>
        <Link to="/demo">
          Interactive Component Demos
        </Link>
      </h3>
      <h3>
        <Link to="/demo/modal">
          Demo Page w/ Modal
        </Link>
      </h3>
      <h3>
        <a onClick={this.toggleModal.bind(this)}>
          Open Modal
        </a>
      </h3>
      {modalIsOpen &&
        <Modal close={this.toggleModal.bind(this)}>
          <h1> Foo barlicious</h1>
          <p>Content in ze modal</p>
          <div className="tui-modal-centered-buttons">
            <a onClick={this.toggleModal.bind(this)} className="button button__secondary">Close Modal</a>
          </div>
        </Modal>
      }
    </div>);
  }
}

module.exports = {HomePage};
