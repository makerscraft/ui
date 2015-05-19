module.exports = {
    'accounts': {
        'displayName': 'Accounts'
    ,   'url': '//accounts.thinkful.com'}
,   'activity': {
        'displayName': 'Activity'
    ,   'url': '//activity.thinkful.com'}
,   'courses': {
        'displayName': 'Courses'
    ,   'url': '//courses.thinkful.com'}
,   'dashboard': {
        'displayName': 'Dashboard'
    ,   'url': '//dashboard.thinkful.com'}
,   'officehours': {
        'displayName': 'Office Hours'
    ,   'url': '//open-sessions.thinkful.com'}
,   'profiles': {
        'displayName': 'Profiles'
    ,   'url': '//profiles.thinkful.com'}
,   'progress': {
        'displayName': 'Progress'
    ,   'url': '//progress.thinkful.com'}
,   'records': {
        'displayName': 'Records'
    ,   'url': '//records.thinkful.com'}
,   'settings': {
        'displayName': 'Settings'
    ,   'url': '//settings.thinkful.com'}
,   'www': {
        'url': '//www.thinkful.com'}
}

const development = {
    'accounts': {
        'url': '//t.ful:5005'}
,   'activity': {
        'url': '//t.ful:5003'}
,   'courses': {
        'url': '//t.ful:5001'}
,   'dashboard': {
        'url': '//t.ful:5013'}
,   'officehours': {
        'url': '//t.ful:5008'}
,   'profiles': {
        'url': '//t.ful:5009'}
,   'progress': {
        'url': '//t.ful:5051'}
,   'records': {
        'url': '//t.ful:5018'}
,   'settings': {
        'url': '//t.ful:5050'}
,   'www': {
        'url': '//t.ful:5000'}
}

debugger;
// Assign development configuration properties
if (process.env.NODE_ENV === 'development') {
    Object.keys(development).
        forEach(key => Object.keys(development[key]).
            forEach(prop => module.exports[key][prop] = development[key][prop]))
}





