const React = require('react');
const classnames = require('classnames');

require('./sidebarlayout.less');


/**
 *  Menu element for sidebar
 *  @property heading {String} of the heading to display above the menu
 *  @property items {Array} of components to include in the menu
 */
class SidebarMenu extends React.Component {
  getDefaultProps() {
    return {items: []}
  }

  render() {
    const {heading, items} = this.props;

    return (
      <div className="sidebar-menu">
        <p className="heading-small">{heading}</p>
        {items}
      </div>
    );
  }
}

/**
 *  Base layout for pages that have a sidebar element.
 *  @property sidebarMenuSets {Array} of objects of the menu sets to include.
 *    @property heading {String} of the heading to display above the menu
 *    @property items {Array} of components to include in the menu
 */
class SidebarLayout extends React.Component {
  render() {
    const {sidebarMenuSets} = this.props;

    return (
      <div className="sidebar-layout-container">
        <div className="sidebar-layout-sidebar">
          {sidebarMenuSets.map(menuSet => <SidebarMenu {...menuSet}/>)}
        </div>
        <div className="sidebar-layout-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}


module.exports = {SidebarLayout};
