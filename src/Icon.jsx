const React = require('react');

/**
 * Icon
 * @property {String} name  the icon class to use
 */
class Icon extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired
    }

    render() {
        return <span
            aria-hidden="true"
            className={`icon-${this.props.name} ${this.props.className || ''}`}/>
    }
}

module.exports = {Icon};