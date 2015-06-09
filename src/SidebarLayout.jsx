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
      <article className="sidebar-layout-container">
        <aside className="sidebar-layout-sidebar">
          {sidebar}
        </aside>
        <section className="sidebar-layout-main">
          {this.props.children}
        </section>
      </article>
    );
  }
}


module.exports = {SidebarLayout};
