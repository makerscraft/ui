const _  = require('lodash');
const cx = require('classnames')
const React = require('react');
const Masthead = require('./Masthead');

const config = require('./config');

var defaultLinks = [
    'Dashboard', 'Settings', 'Accounts'
]

const Header = React.createClass({
    render() {
        return (
            <header>
                <div className="nav-container">
                    <nav className="top-nav" rel="main-navigation">
                        <Masthead/>
                        <ul className="nav-list">
                            {defaultLinks.map(displayName => {
                                const link = _.find(config, {displayName});
                                const className = cx('nav-link', {
                                    selected: link.displayName ===
                                        this.props.config.app.displayName
                                });

                                return link && <li>
                                    <a className={className} href={link.url}>
                                        {link.displayName}
                                    </a>
                                </li>
                            })}
                        </ul>
                        <a className="nav-link nav-link__mobile"><i alt="Menu" className="burger"></i></a>
                    </nav>
                </div>
            </header>
        );
    }

});

module.exports = Header;