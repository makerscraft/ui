const React = require('react');

const Masthead = React.createClass({
    render() {
        return (
            <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" {...this.props}>
                <g id="masthead" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                    <path d="M9,20 L12,20 L12,8.02439022 L3,8.02439022 L3,3 L20,3 L20,0 L0,0 L0,11 L9,11 L9,20 L9,20 Z" id="Shape"></path>
                    <path d="M17,8.02439022 L17,25 L9,25 L9,28 L20,28 L20,11 L28,11 L28,0 L25,0 L25,8.02439022 L17,8.02439022 L17,8.02439022 Z" id="Shape"></path>
                </g>
            </svg>
        );
    }
});

module.exports = {Masthead};