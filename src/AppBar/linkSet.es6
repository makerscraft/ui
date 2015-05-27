const assign = require('lodash/object/assign');
const defaults = require('lodash/object/defaults');
const mapValues = require('lodash/object/mapValues');

let user = global.__env.user;
let config = {
    officeHours: {
        icon: 'users'
    }
}

config = mapValues(global.__env.config,
    (link, key) => assign({}, link, config[key]));

let home = {displayName: 'Home', icon: 'home'};
let main = [home]
let menu = [];

if(! user) {
    defaults(home, config.www);
}
else {
    main.push(config.officeHours);

    if (user.role === 'admin' || user.role === 'mentor') {
        menu.push(config.activity);

        // if (user.role === 'admin') {}

        if (user.role === 'mentor') {
            defaults(home, config.activity);
            menu.push(config.takeStudent);
        }
    }
    else {
        if (user.student_type === 'core') {
            defaults(home, config.courses);
            menu.push(config.courses);
        }
        else {
            menu.push(config.dashboard);
        }
    }

    defaults(home, config.dashboard);

    menu.push(config.settings);
    menu.push(config.signOut)
}


module.exports = {main, menu};
