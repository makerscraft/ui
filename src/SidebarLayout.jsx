const React = require('react');
const classnames = require('classnames');

require('./styles/sidebarlayout.less');

class SidebarLayout extends React.Component {
  static propTypes = {
    sidebar: React.PropTypes.component.isRequired
  }

  render() {
    const {sidebar} = this.props;
    return (
      <div className="sidebar-layout-container">
        <div className="sidebar-layout-sidebar">
          {sidebar}
        </div>
        <div className="sidebar-layout-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}


module.exports = {SidebarLayout};
