const config = {
    accounts: {
        icon: null
    }
,   activity: {
        icon: null
    }
,   courses: {
        icon: null
    }
,   dashboard: {
        icon: null
    }
,   logout: {
        icon: null
    }
,   officeHours: {
        icon: 'users'
    }
,   profiles: {
        icon: null
    }
,   progress: {
        icon: null
    }
,   records: {
        icon: null
    }
,   settings: {
        icon: null
    }
,   takeStudent: {
        icon: null
    }
,   'www': {
        icon: null
    }
}

if (global.__env.config) {
    let envConfig = global.__env.config;
    Object.keys(config).forEach(key => {
        let link = config[key];
        let defaults = envConfig[key] || {};

        Object.keys(defaults).forEach(
            key => link[key] = link[key] || defaults[key])
    })
}

class LinkSet {
    constructor(user) {
        let home = {displayName: 'Home', icon: 'home'};
        this.left = []
        this.right = []
        this.menu = [];

        if(! user) {
            _.defaults(home, config.www);
        }
        else {
            if (user.role === 'mentor') {
                _.defaults(home, config.activity);
                this.left.push(config.officeHours);
                this.right.push(config.takeStudent);
            }
            else {
                _.defaults(home, config.dashboard);
                debugger;
                this.left.push(config.officeHours);
            }

            this.menu.push(config.settings);
            this.menu.push(config.logout)
        }

        this.left.unshift(home);
    }
}

export default {LinkSet};