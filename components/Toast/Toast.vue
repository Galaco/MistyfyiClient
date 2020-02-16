<template>
    <v-snackbar
      v-model="show"
      :color="type"
      :timeout="5000"
      :top="true"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    props: {
        type: {
            type: String,
            default: () => 'success'
        },
        text: {
            type: String,
            default: () => ''
        },
        show: {
            type: Boolean,
            default: () => false
        },
    }
  }
  </script>