const _  = require('lodash');
const React = require('react');
const Masthead = require('./Masthead');


var defaultLinks = [
    'Dashboard', 'Settings', 'Accounts'
]

const Header = React.createClass({
    render() {
        global;
        let {config} = this.props;

        return (
            <header>
                <div className="nav-container">
                    <nav className="top-nav" rel="main-navigation">
                        <Masthead/>
                        <ul className="nav-list">
                            {defaultLinks.map(displayName => {
                                const link = _.find(config, {displayName});
                                debugger;
                                return <li>
                                    <a className="nav-link selected" href={link.host}>
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