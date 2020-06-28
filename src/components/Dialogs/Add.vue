<template>
  <Dialog
    :show="show"
    :title="title"
    :confirm-label="$t('dialog.buttons.save')"
    :deny-label="$t('dialog.buttons.cancel')"
    :type="type"
    :confirm-disabled="confirmDisabled"
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
  name: "Add",
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
    confirmDisabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => {
    return {
      type: DialogType.Add,
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
