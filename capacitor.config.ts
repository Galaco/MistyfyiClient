import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ikamu.app',
  appName: 'Ikamu Server Tracker',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    iosScheme: 'ikamu'
},
};

export default config;
