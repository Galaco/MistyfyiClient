<template>
  <Dialog
    :show="show"
    :title="title"
    :confirm-label="$t('dialog.buttons.delete')"
    :deny-label="$t('dialog.buttons.cancel')"
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
  name: "Delete",
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
      type: DialogType.Delete,
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
