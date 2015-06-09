const React = require('react');

require('./styles/sidebarlayout.less');

const SidebarLayout = React.createClass({
  render() {
    const {sidebarContent, mainContent, sidebarClasses, mainClasses} = this.props;
    return (
      <div className="sidebar-layout-container">
        <div className="sidebar">
          {sidebarContent}
        </div>
        <div className="main">
          {mainContent}
        </div>
      </div>
    );
  }
});


module.exports = {SidebarLayout};
