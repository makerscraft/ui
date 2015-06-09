const React = require('react');
const classnames = require('classnames');

require('./sidebarlayout.less');


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
