interface PushbotMessage {
    title: string;
    message: string;
    url: string;
}

// Interface satisfied by page head included Pushbots lib
interface PushBotLib {
    domain: string;
    auto_subscribe: boolean;
    app_id: string;
    logging_enabled: boolean;
    welcome: PushbotMessage;
    age: number;
    notification_permission_granted: boolean;
    overlay: boolean;
    prompt_allow_button: string;
    prompt_body: string;
    prompt_button_color: string;
    prompt_icon: string;
    prompt_later_button: string;
    prompt_title: string;
    safari_push_id: string;
    scope: string;
    show_prompt: boolean;
    worker_url: string;

    q: any;
    events: any;

    init();
    register();
    alias();
    email();
    f_name();
    gender();
    l_name();
    name();
    sendNotification();
    show_overlay();
    show_prompt_popup();
    subscribe();
    tag();
    trakEvent();
    untag();
    update();
}

// Pushbots is global
declare var PB: PushBotLib;

class Pushbots {
    private lib: PushBotLib;

    constructor(lib: PushBotLib) {
        this.lib = lib;
        this.lib.events = [];
        this.lib.q = [];
        this.lib.domain = process.env.VUE_APP_URL;
        this.lib.app_id = process.env.PUSHBOTS_APP_ID;
    }

    public requestNotificationsPermission() {
        this.lib.init();
    }

    public areNotificationPermissionsGranted(): boolean {
        return Notification.permission === 'granted';
    }

    public setAlias(alias: string) {
        this.lib.q.push(['alias', alias]);
    }

    public setEmail(email: string) {
        this.lib.q.push(['email', email]);
    }
}

export default {
    install: (vue) => {
        vue.prototype.$pushbots = new Pushbots(PB);
    },
};

declare module 'vue/types/vue' {
    interface Vue {
        $pushbots: Pushbots;
    }
}
