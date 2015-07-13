const React = require('react');

require('tfstyleguide/core.less')
require('./standalone.less')
const AppBar = require('./Navigation');

module.exports = {
    AppBar,
    mount() {
        let mountElement = document.getElementById('tui-app-bar');

        if (! mountElement) {
            mountElement = document.createElement('div');
            mountElement.id = 'tui-app-bar';
            document.body.insertBefore(mountElement, document.body.firstChild);
        }

        React.render(
            React.createElement(AppBar, global.__env), mountElement);
    }
}
