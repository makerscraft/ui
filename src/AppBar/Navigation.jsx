const React = require('react');
const Masthead = require('./Masthead');

const Header = React.createClass({
    render() {
        let {config} = this.props;
        return (
            <header>
                <div className="nav-container">
                    <nav className="top-nav" rel="main-navigation">
                        <Masthead/>
                        <ul className="nav-list">
                            <li><a className="nav-link" href={config.courses.resumeUrl}>Courses</a></li>
                            <li><a className="nav-link selected" href="/">Settings</a></li>
                            <li><a className="nav-link" href={config.auth.logoutUrl}>Logout</a></li>
                        </ul>
                        <a className="nav-link nav-link__mobile"><i alt="Menu" className="burger"></i></a>
                    </nav>
                </div>
            </header>
        );
    }

});

module.exports = Header;