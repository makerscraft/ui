const log = require('debug')('ui:analytics');
const result = require('lodash/object/result');

function track(action, type, data={}) {
    action = `${action}: ${global.__env.config.appDisplayName}-${type}`;
    data = {
        app: result(global.__env.config, 'app.name', '').toLowerCase(),
        appDisplayName: result(global.__env.config, 'app.displayName', '').toLowerCase(),
        ...data
    }

    log(action, data);

    global.analytics &&
        global.analytics.track(action, data);
}

module.exports = {
    track
}
