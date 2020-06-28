<template>
  <Dialog
    :show="show"
    :title="title"
    :confirm-label="$t('dialog.buttons.delete')"
    :deny-label="$t('dialog.buttons.close')"
    :type="type"
    :confirm-disabled="false"
    @deny="close"
    @confirm="submit"
  >
    <slot />
  </Dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Dialog, { DialogType } from "./Dialog.vue"

export default Vue.extend({
  name: "Info",
  components: {
    Dialog,
  },
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => "",
    },
  },
  data: () => {
    return {
      type: DialogType.NoAction,
    }
  },
  methods: {
    close() {
      this.$emit("deny")
    },
    submit() {
      this.$emit("confirm")
    },
  },
})
</script>
