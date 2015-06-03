const compact = require('lodash/array/compact');
const assign = require('lodash/object/assign');
const defaults = require('lodash/object/defaults');
const mapValues = require('lodash/object/mapValues');

let user = global.__env.user;
let config = {
    officeHours: {
        icon: 'users'
    },
    activity: {
        icon: 'user'
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
    if (/admin|mentor/.test(user.role)) {
        menu.push(config.activity);
        main.push(config.officeHours);
        menu.push(config.takeStudent);

        if (/admin/.test(user.role)) {
            menu.push(config.courses);
            defaults(home, config.dashboard);
        }

        if (/mentor/.test(user.role)) {
            // TODO: Deprecate eagle for mentors, default => dashboard.
            defaults(home, config.courses);
        }
    }
    else { // Student links
        main.push(config.officeHours);
        if (/core/.test(user.student_type)) {
            defaults(home, config.courses);
        }
        else {
            defaults(home, config.dashboard);
        }
    }

    menu.push(config.slack);
    menu.push(config.settings);
    menu.push(config.support);
    menu.push(config.signOut);
}

main = compact(main);
menu = compact(menu);

try {
    let url = location.toString();
    let domain = location.hostname.split('.').slice(-2).join('.');
    [].concat(main, menu).forEach(function (item) {
        item.active = new RegExp(item.url, 'gi').test(url);
        item.external = ! new RegExp(domain, 'gi').test(item.url);
    });
} catch (e) {}

module.exports = {main, menu};
