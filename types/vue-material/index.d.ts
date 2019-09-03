declare module 'vue-material' {
    import _Vue from 'vue';
}

declare module 'vue-material/dist/components' {
    import _Vue from 'vue';
  
    // export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
    export function MdCore(Vue: typeof _Vue, options?: any): void 
    export function MdAvatar(Vue: typeof _Vue, options?: any): void 
    export function MdBackdrop(Vue: typeof _Vue, options?: any): void 
    export function MdBottomBar(Vue: typeof _Vue, options?: any): void 
    export function MdButton(Vue: typeof _Vue, options?: any): void 
    export function MdButtonToggle(Vue: typeof _Vue, options?: any): void 
    export function MdCard(Vue: typeof _Vue, options?: any): void 
    export function MdCheckbox(Vue: typeof _Vue, options?: any): void 
    export function MdChips(Vue: typeof _Vue, options?: any): void 
    export function MdDialog(Vue: typeof _Vue, options?: any): void 
    export function MdDivider(Vue: typeof _Vue, options?: any): void 
    export function MdFile(Vue: typeof _Vue, options?: any): void 
    export function MdIcon(Vue: typeof _Vue, options?: any): void 
    export function MdImage(Vue: typeof _Vue, options?: any): void 
    export function MdInputContainer(Vue: typeof _Vue, options?: any): void 
    export function MdLayout(Vue: typeof _Vue, options?: any): void 
    export function MdList(Vue: typeof _Vue, options?: any): void 
    export function MdMenu(Vue: typeof _Vue, options?: any): void 
    export function MdProgress(Vue: typeof _Vue, options?: any): void 
    export function MdRadio(Vue: typeof _Vue, options?: any): void 
    export function MdSelect(Vue: typeof _Vue, options?: any): void 
    export function MdSidenav(Vue: typeof _Vue, options?: any): void 
    export function MdSnackbar(Vue: typeof _Vue, options?: any): void 
    export function MdSpeedDial(Vue: typeof _Vue, options?: any): void 
    export function MdSpinner(Vue: typeof _Vue, options?: any): void 
    export function MdSubheader(Vue: typeof _Vue, options?: any): void 
    export function MdSwitch(Vue: typeof _Vue, options?: any): void 
    export function MdTable(Vue: typeof _Vue, options?: any): void 
    export function MdTabs(Vue: typeof _Vue, options?: any): void 
    export function MdToolbar(Vue: typeof _Vue, options?: any): void 
    export function MdTooltip(Vue: typeof _Vue, options?: any): void 
    export function MdWhiteframe(Vue: typeof _Vue, options?: any): void 
  }

declare const options: Options;
export default options;

type Color = "red"
  | "pink"
  | "purple"
  | "deep-purple"
  | "indigo"
  | "blue"
  | "light-blue"
  | "cyan"
  | "teal"
  | "green"
  | "light-green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deep-orange"
  | "brown"
  | "grey"
  | "blue-grey"
  | "white"
  | "black";

type ThemeOption = Color | {
  color?: Color;
  hue?: string | number;
  textColor?: Color;
};

interface ThemeType {
  primary?: ThemeOption;
  accent?: ThemeOption;
  warn?: ThemeOption;
  background?: ThemeOption;
}

declare module 'vue/types/vue' {
  namespace VueM {
    const material: {
      registerTheme(name: string | { [key: string]: ThemeType }, spec?: ThemeType): void,
      setCurrentTheme(name: string): void
    };
  }
}