const React = require('react');
const classnames = require('classnames');

require('./sidebarmenucomponents.less');


/**
 *  Menu element for sidebar
 *  @property heading {String} of the heading to display above the menu
 *  @property items {Array} of components to include in the menu
 */
class SidebarMenu extends React.Component {
  static propTypes = {
    heading: React.PropTypes.string,
    items: React.PropTypes.array
  }

  getDefaultProps() {
    return {items: []}
  }

  render() {
    const {heading, items} = this.props;

    return (
      <div className="sidebar-menu">
        <div className="heading-small">{heading}</div>
        {items}
      </div>
    );
  }
}

module.exports = {SidebarMenu};
