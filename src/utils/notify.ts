/* eslint-disable */
// let PushBot = {};


function shouldDisplayNotificationPopup() {
    // @TODO this is a bug
    return true;
}

function areNotificationsEnabled() {
    return Notification.permission === 'granted';
}

function enableNotifications(uuid: string) {
    // PB.domain = process.env.VUE_APP_URL;
    // PB.auto_subscribe = true;
    // PB.logging_enabled = true;
    // PB.welcome = {title: 'Welcome ', message: 'Thanks for subscribing!', url: PB.domain};
    // PushBot = PB;

    // PushBot.init();

    // PushBot.register();
    // PB.q.push(['alias', uuid]);
    console.log('Request notification registration with uuid: ' + uuid);
}

function sendNotification(title: string, message: string) {
 //   PushBot.q.push(['sendNotification', {title, message, url: process.env.VUE_APP_URL}]);
}

export {
    shouldDisplayNotificationPopup,
    areNotificationsEnabled,
    enableNotifications,
    sendNotification,
};
