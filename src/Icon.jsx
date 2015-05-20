const cx = require('classnames')
const React = require('react');

/**
 * Icon
 * @property {String} Icon the icon class to use
 */
class Icon extends React.Component {
    render() {
        return <span
            aria-hidden="true"
            className={cx(`icon-${this.props.name}`, this.props.className)}/>
    }
}

module.exports = {Icon};