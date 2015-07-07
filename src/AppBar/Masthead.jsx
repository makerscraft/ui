const React = require('react');

class Masthead extends React.Component {

    static propTypes = {
        imgPath: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    }

    render() {
        const {imgPath, className} = this.props;
        return (
            <img src={require(imgPath)} className={className} />
        );
    }
};

module.exports = {Masthead};
