import React from 'react';

const Masthead = React.createClass({
    render() {
        return (
            <a className="nav-logo" href="/">
              <img src="/public/assets/masthead-blue.svg" alt="Thinkful"/>
            </a>
        );
    }
});

export default Masthead;