const config = {
    officeHours: {
        icon: 'users'
    }
}

if (global.__env.config) {
    let envConfig = global.__env.config;
    Object.keys(envConfig).forEach(key => {
        let link = config[key] = config[key] || {};
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
                this.left.push(config.officeHours);
                this.menu.push(config.dashboard);
            }

            this.menu.push(config.settings);
            this.menu.push(config.signOut)
        }

        this.left.unshift(home);
    }
}

export default {LinkSet};