<template>
  <v-container>
    <ContactForm />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ContactForm from '@/components/Contact/Form.vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Help',
  transition: {
    css: true
  },
  components: {
    ContactForm
  },
  head () {
    return {
      title: 'Help'
    }
  }
})
</script>
