const React = require('react');

require('./fourohfour.less');

/**
 * FourOhFour
 *
 * Shared "Not Found" error page for Thinkful SPA's.
 */
class FourOhFour extends React.Component {
    render() {
        return (
            <div className="tfui-error-page">
                <h1>404</h1>
                <h3>Page not found</h3>
            </div>
        )
    }
}

module.exports = {FourOhFour};
