<template>
  <nuxt-link
    :class="light? 'light': 'dark'"
    class="navbar-brand"
    :to="{ name: 'index' }"
  >
    <img src="/images/logo.svg" alt="logo" class="navbar-brand-icon">
    <span class="navbar-brand-title">{{ $t('app_title') }}</span>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BrandLogo',
  props: {
    light: Boolean
  }
})
</script>

<style lang='scss' scoped>
    .navbar-brand {
        color: #efefef;
        text-decoration: none;

        &:hover, &:visited {
          color: #efefef;
        }

        .navbar-brand-title {
            vertical-align: middle;
            font-family: 'Saira Semi Condensed', sans-serif;
            font-size: 24px;
            margin-left: 16px;
            transition-duration: .28s;
            transition-property: color;
            transition-timing-function: cubic-bezier(.4,0,.2,1);
        }

        .navbar-brand-icon {
            font-size: 20px;
            color: #fb7e14;
            height: 40px;
            width: 40px;
            border-radius: 5px;
            text-align: center;
            background-color: #797979;
            vertical-align: middle;
            transition-duration: .28s;
            transition-property: background-color;
            transition-timing-function: cubic-bezier(.4,0,.2,1);
            border: 1px solid #aaa;
        }

        &.light {
            .navbar-brand-icon:hover {
                color: #fff;
            }
        }

        &:hover {
            .navbar-brand-icon {
                background-color: #4d4d4d;
                color: rgb(255, 150, 24);
            }

            .navbar-brand-title {
                color: #797979;
            }
        }
    }
</style>
