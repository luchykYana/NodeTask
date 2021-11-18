const {emailActions} = require('../configs');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },

    [emailActions.GOODBYE]: {
        templateName: 'goodbye',
        subject: 'Goodbye!'
    },

    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'Renewal!'
    }
};
