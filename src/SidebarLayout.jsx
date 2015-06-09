const React = require('react');
const classnames = require('classnames');

require('./styles/sidebarlayout.less');

class SidebarLayout extends React.Component {
  render() {
    return (
      <article className="sidebar-layout-container">
        <aside className="sidebar-layout-sidebar">
          {this.props.children[0]}
        </aside>
        <section className="sidebar-layout-main">
          {this.props.children.slice(1)}
        </section>
      </article>
    );
  }
}


module.exports = {SidebarLayout};
