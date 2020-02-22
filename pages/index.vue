<template>
  <div>
    <v-row
      class="section-1 background-gradient"
      align="center"
      justify="center"
    >
      <v-col cols="3" class="strapline">
        <div>
          <h3>
            {{ $t('home.about.tagline1') }}
          </h3>
          <div>
            <span>{{ $t('home.about.tagline2') }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="7">
        <MockInterface />
      </v-col>
    </v-row>
    <v-row
      id="section-features"
      class="section-2"
      justify="center"
      align="center"
    >
      <v-col cols="12" align="center">
        <h2 class="white--text">
          {{ $t('home.features.title') }}
        </h2>
      </v-col>
      <v-col cols="12" align="center">
        <v-row justify="center">
          <v-col cols="4" class="feature" align="center">
            <v-icon x-large color="#ff607a">
              mdi-heart
            </v-icon>
            <p class="white--text">
              {{ $t('home.features.feature1.paragraph1') }}
            </p>
            <p class="white--text">
              {{ $t('home.features.feature1.paragraph2') }}
            </p>
            <p class="white--text">
              {{ $t('home.features.feature1.paragraph3') }}
            </p>
          </v-col>
          <v-col cols="4" class="feature" align="center">
            <v-icon x-large color="#8a62ff">
              mdi-gamepad
            </v-icon>
            <p class="white--text">
              {{ $t('home.features.feature2.paragraph1') }}
            </p>
            <p class="white--text">
              {{ $t('home.features.feature2.paragraph2') }}
            </p>
            <p class="white--text">
              {{ $t('home.features.feature2.paragraph3') }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      id="section-pricing"
      class="section-3 background-gradient text-white"
      align="center"
      justify="center"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="12" align="center">
          <h2>
            {{ $t('home.pricing.title') }}
          </h2>
        </v-col>
        <v-col cols="8" align="center">
          <p>{{ $t('home.pricing.strapline') }}</p>
        </v-col>

        <v-col cols="12" align="center">
          <v-row justify="center">
            <v-col class="tier-free" cols="4">
              <h4 class="tier-header">
                <v-icon large color="#8fbc8f">
                  mdi-account
                </v-icon>
                {{ $t('home.pricing.free.title') }}
              </h4>
              <ul>
                <li>{{ $t('home.pricing.free.feature1') }}</li>
                <li>{{ $t('home.pricing.free.feature2') }}</li>
              </ul>
            </v-col>
            <v-col class="tier-donator" cols="4">
              <h4 class="tier-header">
                <v-icon large color="#ffcb56">
                  mdi-star-outline
                </v-icon>
                {{ $t('home.pricing.paid.title') }}
              </h4>
              <ul>
                <li>{{ $t('home.pricing.paid.feature1') }}</li>
                <li>{{ $t('home.pricing.paid.feature2') }}</li>
                <li>{{ $t('home.pricing.paid.feature3') }}</li>
              </ul>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MockInterface from '@/components/Home/MockInterface.vue'

export default Vue.extend({
  layout: 'index',
  name: 'Home',
  components: {
    MockInterface
  },
  methods: {
    handleLogin () {
      this.$auth.login()
    },
    handleLogout () {
      this.$auth.logout()
    },
    isLoggedIn (): boolean {
      return this.$auth.isAuthenticated()
    }
  },
  head () {
    return {
      title: 'Home'
    }
  }
})
</script>

<style lang='scss' scoped>
  .section-1, .section-2, .section-3 {
    height: 100vh;
  }

  .section-1 {
    margin-top: -64px;
  }

  .section-2 {
    background-color: #333;
  }

  .background-gradient {
    background: linear-gradient(270deg, #b47cff, #3f1dcb);
    background-size: 400% 400%;
    -webkit-animation: AnimationName 30s ease infinite;
    -moz-animation: AnimationName 30s ease infinite;
    animation: AnimationName 30s ease infinite;
    @-webkit-keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
    @-moz-keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
    @keyframes AnimationName {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
  }
</style>
