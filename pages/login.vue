<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="4">
        <v-card>
          <v-card-title>Ikamu</v-card-title>
          <v-card-text class="text-center">
            <v-btn color="primary" @click="login">
              Login
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'empty',
  name: 'Login',
  mounted () {
    if (String(this.$route.query.passthrough) === '1') {
      this.login()
    }
  },
  methods: {
    login () {
      this.$auth.login()
    }
  },
  head () {
    return {
      title: 'Logging you in...'
    }
  }
})
</script>
