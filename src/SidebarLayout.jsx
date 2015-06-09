const React = require('react');
const classnames = require('classnames');

require('./sidebarlayout.less');


/**
 *  Menu item element
 *  @property displayName {String} of the display name of the item
 *  @property classes {String/Object/Array} of classes
 *  @property isActive {Boolean} indictaing if the item is currently active
 */
class MenuItem extends React.Component {
  render() {
    const {displayName, classes, isActive} = this.props;
    const itemClasses = classnames(classes, 'menu-item', {'menu-item__active': isActive});

    return (
      <div className={itemClasses}>
        <span aria-hidden="true" className="icon-navigateright"></span>
        {displayName}
      </div>
    );
  }
}


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
        <div className="heading-small">{heading}</div>
        {items}
      </div>
    );
  }
}

/**
 *  Base layout for pages that have a sidebar element.
 *  @property sidebarMenuSets {Array} of objects indicating a SidebarMenu
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


module.exports = {SidebarLayout, MenuItem};
