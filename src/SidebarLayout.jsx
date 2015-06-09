const React = require('react');
const classnames = require('classnames');

require('./styles/sidebarlayout.less');

const SidebarLayout = React.createClass({
  render() {
    const {sidebarContent, mainContent, sidebarClasses, mainClasses} = this.props;
    const sidebarClassNames = classnames('sidebar', sidebarClasses);
    const mainClassNames = classnames('main', mainClasses);

    return (
      <div className="sidebar-layout-container">
        <div className={sidebarClassNames}>
          {sidebarContent}
        </div>
        <div className={mainClassNames}>
          {mainContent}
        </div>
      </div>
    );
  }
});


module.exports = {SidebarLayout};
