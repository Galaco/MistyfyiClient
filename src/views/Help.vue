<template>
    <ContactForm/>
</template>

<script lang="ts">
import Vue from 'vue';
import ContactForm from '@/components/ContactForm/Contact.vue';

export default Vue.extend({
    name: 'Help',
    components: {
        ContactForm,
    },
});
</script>