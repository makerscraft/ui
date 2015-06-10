const React = require('react');
const classnames = require('classnames');

require('./dropdown.less');


/**
 * Shared dropdown menu element
 * @property data {Array} of items to display in the dropdown,
      containing `value` and `displayName`
 * @property selectedInd {Int} of the selected index in the list
 * @property defaultDisplay {String} of default value that should be displayed
 * @property handleChange {Function} to handle dropdown click/change
 */
const Dropdown = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    selectedInd: React.PropTypes.number,
    defaultDisplay: React.PropTypes.string,
    handleChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {open: false};
  },

  getDefaultProps() {
    return {data: []};
  },

  componentDidMount() {
    document.addEventListener('click', (e) => this._checkClickAway(e));
  },

  componentWillUnmount() {
    document.removeEventListener('click', (e) => this._checkClickAway(e));
  },

  _checkClickAway(e) {
    if (!e.target.hasAttribute('data-clickable')) {
      this.setState({open: false});
    }
  },

  _generateNodes() {
    const {data} = this.props;
    return data.map((item, ind) => {
      return (
        <p
          className="dropdown-item"
          id={ind}
          value={item.value}>
          {item.displayName}
        </p>
      );
    });
  },

  _toggleOpen() {
    this.setState({open: !this.state.open});
  },

  _handleChange(event) {
    let {handleChange} = this.props;
    this._toggleOpen();
    handleChange(event);
  },

  componentClickAway() {
    this.setState({open: false});
  },

  render() {
    let {selectedInd, data, defaultDisplay} = this.props;

    const buttonClasses = classnames('button', 'button__white', 'dd-button');
    const dropdownClasses = classnames(
      'dd-open',
      {'hidden': !this.state.open});

    return (
      <div
          className={buttonClasses}
          onClick={this._toggleOpen}
          data-clickable>
        {data[selectedInd] && data[selectedInd].displayName || defaultDisplay}
        <div
          className={dropdownClasses}
          onClick={this._handleChange}>
          {this._generateNodes()}
        </div>
      </div>
    );
  }
});

module.exports = Dropdown;
