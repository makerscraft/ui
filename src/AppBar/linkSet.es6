const _ = require('lodash');

let user = global.__env.user;
let config = {
    officeHours: {
        icon: 'users'
    }
}

config = _.mapValues(global.__env.config,
    (link, key) => _.assign({}, link, config[key]));

let home = {displayName: 'Home', icon: 'home'};
let main = [home]
let menu = [];

if(! user) {
    _.defaults(home, config.www);
}
else {
    if (user.role === 'mentor') {
        _.defaults(home, config.activity);
        menu.push(config.takeStudent);
    }
    else if (user.student_type === 'core') {
        _.defaults(home, config.courses);
        menu.push(config.courses);
    }
    else {
        _.defaults(home, config.dashboard);
        menu.push(config.dashboard);
    }

    main.push(config.officeHours);

    menu.push(config.settings);
    menu.push(config.signOut)
}


module.exports = {main, menu};
