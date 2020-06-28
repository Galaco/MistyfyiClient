<template>
  <div class="row text-center">
    <div class="col-sm-12 loading-spinner">
      <Spinner />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"

export default Vue.extend({
  name: "TableLoading",
  components: {
    Spinner,
  },
})
</script>

<style lang="scss" scoped>
.loading-spinner {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
