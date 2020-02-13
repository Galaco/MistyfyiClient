<template>
  <ContactForm />
</template>

<script lang="ts">
import Vue from 'vue'
import ContactForm from '@/components/Contact/Form.vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Help',
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
