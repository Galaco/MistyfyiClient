import Vue from 'vue'

class LocalStorage {
  public getItem (key: string): string | null {
    if (process.server) {
      return ''
    }
    return localStorage.getItem(key)
  }

  public setItem (key: string, value: any) {
    if (process.server) {
      return
    }
    return localStorage.setItem(key, value)
  }
}

const plugin = new LocalStorage()

const P = {
  install: (vue: any) => {
    vue.prototype.$localStorage = plugin
  }
}

Vue.use(P)

export default P

declare module 'vue/types/vue' {
    interface Vue {
      $localStorage: LocalStorage;
    }
}
