<template>
  <div class="navbar-brand" :class="light? 'light': 'dark'">
    <img src="/images/logo.svg" alt="logo" class="navbar-brand-icon">
    <span class="navbar-brand-title">{{ $t('app_title') }}</span>
  </div>
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
        .navbar-brand-title {
            vertical-align: middle;
            font-family: 'Saira Semi Condensed', sans-serif;
        }

        .navbar-brand-icon {
            font-size: 20px;
            color: #fb7e14;
            height: 36px;
            width: 36px;
            line-height: 36px;
            border-radius: 50%;
            text-align: center;
            background-color: #292929;
            vertical-align:middle;
            margin-right: 16px;
        }

        &.light {
            .navbar-brand-icon:hover {
                color: #fff;
            }
        }

        &:hover {
            .navbar-brand-icon {
                background-color: rgb(50, 50, 50);
                color: rgb(255, 150, 24);
            }
        }
    }
</style>
