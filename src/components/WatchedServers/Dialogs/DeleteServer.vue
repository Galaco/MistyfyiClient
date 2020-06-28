<template>
  <Delete
    id="deleteServerDialog"
    :title="$t('servers.dialogs.delete.title')"
    :show="show"
    @confirm="submit"
    @deny="close"
  >
    <span>{{ $t("servers.dialogs.delete.body") }}</span>
  </Delete>
</template>

<script lang="ts">
import Vue from "vue"
import Delete from "@/components/Dialogs/Delete.vue"

export default Vue.extend({
  name: "DeleteServer",
  components: {
    Delete,
  },
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
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
