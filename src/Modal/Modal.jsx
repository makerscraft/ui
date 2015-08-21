const React = require('react');
const cx = require('classnames');

require('./modal.less');

class Modal extends React.Component {
  static displayName = "Modal"

  static propTypes = {
      isOpen: React.PropTypes.boolean,
      className: React.PropTypes.string,
      onClose: React.PropTypes.func
  }

  static defaultProps = {
      isOpen: false
  }

  _closeModal() {
    this.setState()
  }

  render() {
    const {className, isOpen} = this.props;

    const wrapperClasses = cx("tui-modal-wrapper", {
      "tui-modal-wrapper__hidden": ! isOpen
    });
    const modalClasses = cx("tui-modal-content", className);

    return (
      <div className={wrapperClasses}>
        <div className="tui-modal-curtain" onClick={_closeModal}/>
        <div className={modalClasses}>
          {this.props.children}
        </div>
      </div>);
  }
}
