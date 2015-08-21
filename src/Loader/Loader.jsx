const cx = require('classnames');
const React = require('react/addons');

require('./loader.less');

class Loader extends React.Component {
  static propTypes = {
    className: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
  }

  render() {
    return <div
      className={cx('tui-loader', this.props.className)}>
      Loading <span className="tui-loader-dot"></span>
    </div>;
  }
}
