<template>
  <vue-stripe-checkout
    ref="checkoutRef"
    :items="items"
    :successUrl="successUrl"
    :cancelUrl="cancelUrl"
  >
    <template slot="checkout-button">
      <button @click="checkout">Shutup and take my money!</button>
    </template>
  </vue-stripe-checkout>
</template>
 
<script lang="ts">
import Vue from 'vue';
import { forceCast } from '@/utils/forceCast';
import { Stripe } from '@/plugins/stripe';

const yearlyPlanSKU = process.env.VUE_APP_STRIPE_PREMIUM_YEARLY_PLAN;

export default Vue.extend({
  data: () => ({
    loading: false,
    items: [
      {
        sku: yearlyPlanSKU,
        quantity: 1,
      },
    ],
    successUrl: `${process.env.VUE_APP_URL}/subscribe/success`,
    cancelUrl: `${process.env.VUE_APP_URL}/subscribe/canceled`,
  }),
  methods: {
    checkout() {
      forceCast<Stripe>(this.$refs.checkoutRef).redirectToCheckout();
    },
  },
});
</script> 