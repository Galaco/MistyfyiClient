import VueToasted from 'vue-toasted';

export default VueToasted;

declare global {
    interface Window {
      $toasted: VueToasted;
    }
}

window.$toasted = VueToasted.install;
