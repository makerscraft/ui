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
let main = [];
let menu = [];

if(! user) {
    defaults(home, config.www);
    menu.push(config.officeHours);
    menu.push(config.mentors);
    menu.push(config.pricing);
    menu.push(config.signIn)
}
else {
    main.push(home);
    if (/admin|mentor/.test(user.role)) {
        menu.push(config.activity);
        main.push(config.officeHours);
        menu.push(config.takeStudent);
        defaults(home, config.dashboard);

        if (/admin/.test(user.role)) {
            menu.push(config.courses);
        }
    }
    else { // Student links
        main.push(config.officeHours);
        if (/core/.test(user.student_type)) {
            defaults(home, config.dashboard);
        }
        else if (/tfl/.test(user.student_type)) {
            assign(home,{
                displayName: 'Library',
                icon: 'book',
                host: config.dashboard.host,
                url: `${config.dashboard.url}/library`
            });
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

module.exports = {home, main, menu};
