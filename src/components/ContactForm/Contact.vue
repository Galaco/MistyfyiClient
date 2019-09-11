<template>
    <form novalidate class="md-layout">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-card-header>
                <div class="md-title">Contact</div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <md-field :class="(!emailAddressValid)? 'md-invalid': ''">
                            <label for="email">{{ $t('help.contact.email.label') }}</label>
                            <md-input name="email" id="email" :disabled="sending" v-model="emailAddress"/>
                            <span class="md-error">{{ $t('help.contact.email.error') }}</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field :class="(!messageValid)? 'md-invalid': ''">
                            <label>{{ $t('help.contact.message.label') }}</label>
                            <md-textarea md-autogrow :disabled="sending" v-model="message"></md-textarea>
                            <span class="md-error">{{ $t('help.contact.message.error') }}</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <vue-recaptcha 
                            :sitekey="recaptchaSiteKey"
                            :loadRecaptchaScript="true"
                            @verify="onVerify"
                            @expired="onExpired">
                        </vue-recaptcha>
                    </div>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button 
                    type="button" 
                    class="md-primary md-raised" 
                    :disabled="!formValid || sending" 
                    @click="send">
                    {{ $t('help.contact.submit') }}
                </md-button>
            </md-card-actions>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            </md-card>
    </form>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import Vue from 'vue';
import VueRecaptcha from 'vue-recaptcha';
import { sendContactRequest } from '../../utils/api/user';
import ApiResponse from '../../models/ApiResponse';

const injectedRecaptchaSiteKey = '6Lcr0bcUAAAAAEcdci0X2j1j0BF5Bq-1Mw8jvhWW';

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default Vue.extend({
    name: 'ContactForm',
    components: {
        VueRecaptcha,
    },
    data: () => ({
        emailAddress: '',
        emailAddressValid: false,
        message: '',
        messageValid: false,
        formValid: false,
        sending: false,
        recaptchaSiteKey: injectedRecaptchaSiteKey,
        recaptchaAuthKey: '',
    }),
    methods: {
        onVerify(response: any) {
            this.recaptchaAuthKey = response;
        },
        onExpired() {
            this.recaptchaAuthKey = '';
            this.validateForm();
        },
        send() {
            this.sending = true;
            sendContactRequest(this.emailAddress, this.message, this.recaptchaAuthKey).then((data: any) => {
                this.$toasted.global.api_success({
                    message : this.$t('help.contact.toast.success'),
                });
                this.emailAddress = '';
                this.message = '';
                this.onExpired();
                this.sending = false;
            }).catch((err: any) => {
                this.$toasted.global.api_error({ message : err.message });
                this.sending = false;
            });
        },
        validateForm() {
            this.formValid = this.emailAddressValid && this.messageValid && this.recaptchaAuthKey !== '';
        },
    },
    watch: {
        emailAddress(value) {
            this.emailAddressValid = emailRegex.test(value);
            this.validateForm();
        },
        message(value) {
            this.messageValid = (value.length >= 50);
            this.validateForm();
        },
    },
});
</script>

<style lang="scss">
    .grecaptcha-badge {
        display: none !important;
    }
</style>