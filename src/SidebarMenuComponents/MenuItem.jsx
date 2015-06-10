const React = require('react');
const classnames = require('classnames');

require('./sidebarmenucomponents.less');

/**
 *  Menu item element
 *  @property displayName {String} of the display name of the item
 *  @property classes {String/Object/Array} of classes
 *  @property isActive {Boolean} indictaing if the item is currently active
 */
class MenuItem extends React.Component {
  static propTypes = {
    displayName: React.PropTypes.string,
    classes: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
        React.PropTypes.array
      ]),
    isActive: React.PropTypes.bool
  }

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


module.exports = {MenuItem};
