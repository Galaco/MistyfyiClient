<template>
    <form novalidate class="md-layout">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-card-header>
                <div class="md-title">Contact</div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <label for="email">Email</label>
                            <md-input name="email" id="email" :disabled="sending"/>
                            <span class="md-error" v-if="!true">Your email address is required.</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <label>Your message</label>
                            <md-textarea md-autogrow :disabled="sending"></md-textarea>
                        </md-field>
                    </div>
                </div>
            </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <md-card-actions>
                <vue-recaptcha 
                    :sitekey="recaptchaSiteKey"
                    :loadRecaptchaScript="true"
                    @verify="onVerify"
                    @expired="onExpired">
                    <md-button type="button" class="md-primary" :disabled="sending">Send</md-button>
                </vue-recaptcha>
            </md-card-actions>
        </md-card>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
import VueRecaptcha from 'vue-recaptcha';

const recaptchaSiteKey = process.env.VUE_APP_RECAPTCHA_SITE_KEY;

export default Vue.extend({
    name: 'ContactForm',
    components: {
        VueRecaptcha,
    },
    data() {
        return {
            sending: false,
            recaptchaSiteKey,
        };
    },
    methods: {
        onVerify(response: any) {
            console.log(response);
        },
        onExpired() {
            console.log('hit');
        },
    },
});
</script>

<style lang="scss">
    .grecaptcha-badge {
        display: none !important;
    }
</style>