import React from 'react';
import loremIpsum from 'lorem-ipsum';


class LoremIpsum extends React.Component {

    render() {
        let {count, units} = this.props;

        count = count || 1;
        units = units || 'sentences';

        return (
            <span className="ipsum-text">
                {loremIpsum({units, count})}
            </span>
        )
    }
}


module.exports = {LoremIpsum};
