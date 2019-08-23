/* eslint-disable */
let PushBot = {};

const COOKIE_NOTIFICATION_POPUP_SEEN = 'notificationPopupClosed';

function shouldDisplayNotificationPopup() {
    return window.$cookies.get(COOKIE_NOTIFICATION_POPUP_SEEN) !== true && !areNotificationsEnabled();
}

function areNotificationsEnabled() {
    return Notification.permission === "granted";
}

function enableNotifications(uuid) {
    PB.domain = process.env.VUE_APP_URL;
    PB.auto_subscribe = true;
    PB.logging_enabled = true;
    PB.welcome = {title:"Welcome ",message:"Thanks for subscribing!", url :PB.domain};
    PushBot = PB;

    PushBot.init();

    PushBot.register();
    PB.q.push(["alias", uuid]);
    console.log("Request notification registration with uuid: " + uuid);
}

function sendNotification(title, message){
    PushBot.q.push(["sendNotification", {title: title ,message: message, url: process.env.VUE_APP_URL}]);
}

export {
    COOKIE_NOTIFICATION_POPUP_SEEN,
    shouldDisplayNotificationPopup,
    areNotificationsEnabled,
    enableNotifications,
    sendNotification,
};
