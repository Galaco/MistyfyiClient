import Vue from 'vue'

interface OneSignalMessage {
    title: string;
    message: string;
    url: string;
}

// Interface satisfied by page head included OneSignal lib
interface OneSignalLib {
    appId: string;
    autoResubscribe: boolean;
    requiresUserPrivacyConsent: boolean;
    subdomainName: string;
    notifyButton: object;
    allowLocalhostAsSecureOrigin: boolean;

    init(config: object);
    push(callback: any);
    on(e: string, callback: any);
    once(e: string, callback: any);
    isPushNotificationsEnabled(callback?: any): Promise<boolean>;
    showSlidedownPrompt();
    showNativePrompt();
    getNotificationPermission(): boolean;
    isPushNotificationsSupported(): boolean;
    getUserId(): string;
    sendTag(key: string, value: string);
    setEmail(email: string);
    setExternalUserId(id: string);
}

// OneSignal is global
declare let OneSignal: OneSignalLib

const APP_URL = process.env.NUXT_ENV_URL || ''
const APP_ID = process.env.NUXT_ENV_ONESIGNAL_APP_ID || ''
const APP_ENVIRONMENT = process.env.NUXT_ENV_ENVIRONMENT || ''

class OneSignalPlugin {
    private lib: OneSignalLib;

    constructor (lib: OneSignalLib) {
      this.lib = lib
      this.lib.subdomainName = APP_URL
      this.lib.appId = APP_ID
      this.lib.autoResubscribe = true
      this.lib.allowLocalhostAsSecureOrigin = APP_ENVIRONMENT === 'dev'
      this.lib.notifyButton = {
        enable: true
      }
      this.init()
    }

    public autoResubscribe () {
      this.lib.autoResubscribe = true
    }

    public requestNotificationsPermission (callback: any) {
      this.lib.push(() => {
        this.lib.on('subscriptionChange', (isSubscribed: boolean) => {
          console.log('The users subscription state is now:', isSubscribed)
          callback()
        })
        this.lib.showNativePrompt()
      })
      this.lib.push(['showNativePrompt'])
    }

    public areNotificationPermissionsGranted (): Promise<boolean> {
      // return new Promise((resolve, reject) => {
      //     resolve(false);
      // });
      return this.lib.isPushNotificationsEnabled()
    }

    public setAlias (alias: string) {
      this.lib.setExternalUserId(alias)
    }

    public setEmail (email: string) {
      this.lib.setEmail(email)
    }

    private init () {
      this.lib.push(() => {
        this.lib.init({
          appId: this.lib.appId,
          subdomainName: this.lib.subdomainName,
          autoRegister: false,
          autoResubscribe: this.lib.autoResubscribe,
          allowLocalhostAsSecureOrigin: this.lib.allowLocalhostAsSecureOrigin,
          notifyButton: this.lib.notifyButton
        })
      })
    }
}

const P = {
  install: (vue) => {
    vue.prototype.$onesignal = new OneSignalPlugin(OneSignal)
  }
}

export default P

Vue.use(P)

declare module 'vue/types/vue' {
    interface Vue {
        $onesignal: OneSignalPlugin;
    }
}
