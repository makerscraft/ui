const _  = require('lodash');
const cx = require('classnames')
const React = require('react');

// TUI Components
const {Icon} = require('../Icon');
const {Gravatar} = require('../Gravatar');
const {Masthead} = require('./Masthead');

const {LinkSet} = require('./LinkSet');

/**
 * NavLink
 * @property {} description
 */
class NavLink extends React.Component {
    static propTypes = {
        displayName: React.PropTypes.string,
        icon: React.PropTypes.string,
        url: React.PropTypes.string.isRequired
    }

    render() {
        const {url, className, displayName, icon} = this.props;
        return (
            <a className={cx(className, "app-nav-link")} href={url}>
                {icon &&
                    <Icon className="app-nav-icon" name={icon}/>}
                {displayName &&
                    <span className="app-nav-text">{displayName}</span>}
            </a>
        )
    }
}

/**
 * AppNav
 * @property {} description
 */
class AppNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuVisible: false
        };
    }

    toggleMenu() {
        this.setState({
            isMenuVisible: ! this.state.isMenuVisible
        });
    }

    render() {
        const {user, config} = this.props;
        const navClassName = cx(
            'app-nav', {navigation__visible: this.state.isMenuVisible});

        const linkSet = new LinkSet(user);

        return (
          <div className="nav-container">
                <nav className={navClassName} rel="main-navigation">
                    <Masthead className="app-nav-logo"/>
                    <ul className="app-nav-main">
                        {linkSet.left.map(
                            (link, key) => <li>
                                <NavLink key={key} {...link}/></li>)}
                        {linkSet.right.map(
                            (link, key) => <li>
                                <NavLink key={key} {...link}/></li>)}
                    </ul>
                    <ul className="app-nav-list">
                        {linkSet.left.map(
                            (link, key) => <li>
                                <NavLink key={key} className="app-nav-link__mobile-only" {...link}/></li>)}
                        {linkSet.right.map(
                            (link, key) => <li>
                                <NavLink key={key} className="app-nav-link__mobile-only" {...link}/></li>)}
                        {linkSet.menu.map(
                            (link, key) => <li>
                                <NavLink key={key} className="app-nav-link__in-menu" {...link}/></li>)}
                    </ul>
                    <a className="app-nav-link app-nav-link__toggle" onClick={this.toggleMenu.bind(this)}>
                        <span alt="Menu" className="app-nav-burger"></span>
                        <Gravatar className="profile-img-placeholder" email={user.tf_login} size={120}/>
                    </a>
                </nav>
            </div>
        )
    }
}

module.exports = AppNav;