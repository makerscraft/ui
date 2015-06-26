const React = require('react');
const MD5 = require('spark-md5');

const URL = 'https://www.gravatar.com/avatar';

/**
 * Gravatar
 * @property {string} email the users email to use with gravatar
 */
class Gravatar extends React.Component {
    static propTypes = {
        email: React.PropTypes.string.isRequired,
        default: React.PropTypes.string,
        size: React.PropTypes.number,
        style: React.PropTypes.object
    }

    static defaultProps = {
        default: 'retro',
        size: 200,
        style: {}
    }

    render() {
        return <img
            className={`gravatar ${this.props.className || ''}`}
            src={`${URL}/${MD5.hash(this.props.email)}?d=${this.props.default}&s=${this.props.size}`}
            style={this.props.style || {}}
            {...this.props}/>
    }
}

export {Gravatar};
