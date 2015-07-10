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
                <p>The page you are looking for couldn't be found.<br/> You can try
                <a href="javascript: history.go(-1);"> going back</a>.</p>
            </div>
        )
    }
}

module.exports = {FourOhFour};
