const _  = require('lodash');
const cx = require('classnames')
const React = require('react');

// TUI Components
const {Icon} = require('../Icon');
const {Gravatar} = require('../Gravatar');
const {Masthead} = require('./Masthead');

const linkSet = require('./linkSet');

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
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        config: React.PropTypes.object.isRequired
    }

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

    handleMouseLeave(event) {
        clearTimeout(this.mouseTimeout);
        this.mouseTimeout = setTimeout(() => {this._hideMenu()}, 360);
    }

    handleMouseEnter(event) {
        if (this.mouseTimeout) {
            clearTimeout(this.mouseTimeout);
        }
    }

    _hideMenu() {
        this.setState({ isMenuVisible: false });
    }

    render() {
        const {user, config} = this.props;
        const navClassName = cx(
            'app-nav', {navigation__visible: this.state.isMenuVisible});

        return (
          <div className="app-nav-container">
                <nav onMouseLeave={this.handleMouseLeave.bind(this)}
                     className={navClassName} rel="main-navigation">
                    <Masthead className="app-nav-logo"/>
                    <ul className="app-nav-main">
                        {linkSet.main.map(
                            (link, key) => <li>
                                <NavLink key={key} {...link}/></li>)}
                    </ul>
                    <ul onMouseEnter={this.handleMouseEnter.bind(this)}
                        className="app-nav-list">
                        {linkSet.main.map(
                            (link, key) => <li>
                                <NavLink key={key} className="app-nav-link__mobile-only" {...link}/></li>)}
                        {linkSet.menu.map(
                            (link, key) => <li>
                                <NavLink key={key} className="app-nav-link__in-menu" {...link}/></li>)}
                    </ul>
                    {user &&
                    <a className="app-nav-link app-nav-link__toggle" onClick={this.toggleMenu.bind(this)}>
                        <span alt="Menu" className="app-nav-burger"></span>
                        <Gravatar className="app-nav-gravatar" email={user.tf_login} size={120}/>
                    </a>
                    }
                </nav>
            </div>
        )
    }
}

module.exports = AppNav;
