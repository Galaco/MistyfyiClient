<template>
  <v-row justify="center" align="center">
    <v-col cols="12" align="center">
      <h1 class="section">
        {{ title }}
      </h1>
      <div class="section">
        {{ description }}
      </div>
      <v-btn :id="buttonId" @click="buttonOnClick">
        <span>{{ buttonText }}</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Noitems",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    buttonId: {
      type: String,
      default: "",
    },
    buttonOnClick: {
      type: Function,
      default: () => {},
    },
    buttonText: {
      type: String,
      default: "",
    },
  },
})
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 1rem;
}

.loading-spinner {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
