const omit = require('lodash/object/omit');
const React = require('react');

const actions = require('./actions');

/**
 * Usage
 *  <TrackedLink
 *      href="/cats"
 *      label="cat"
 *      category="feline"
 *      data={{hello: "world"}}
 *  />
 *
 *  Produces an analytics event with the following fields:
 *  {
 *      app: "BirdName",
 *      appDisplayName: "ProjectName",
 *      category: "feline",
 *      data: {hello: "world"},
 *      label: "cat",
 *      type: "link"
 *  }
 */
class TrackedLink extends React.Component {
    static propTypes = {
        data: React.PropTypes.object,
        href: React.PropTypes.string.isRequired,
        type: React.PropTypes.string
    }

    static defaultProps = {
        type: 'link'
    }

    _handleClick(event) {
        let data = omit(this.props, 'children', 'className', 'href', 'target');

        actions.track('clicked', this.props.type, {url: this.props.href, ...data});

        this.props.onClick &&
            this.props.onClick(event);
    }

    render() {
        const {children, className, href, onClick, ...props} = this.props;

        return (
            <a
                className={className}
                href={href}
                onClick={event => this._handleClick(event)}
                {...props}
            >
                {children}
            </a>
        )
    }

}

module.exports = {TrackedLink};
