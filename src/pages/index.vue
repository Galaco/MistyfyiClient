<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon>
        <img src="/images/logo.svg" alt="logo" class="navbar-brand-icon"/>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="signup">
        <span v-if="!autoRedirect"> {{ $t("header.links.signup") }}</span>
        <span v-if="autoRedirect">
                {{ $t("header.links.redirecting") }}
                <Spinner size="16" width="2"/>
              </span>
      </v-btn>
      <v-btn variant="plain" @click="login">
        <span v-if="!autoRedirect"> {{ $t("header.links.login") }}</span>
        <span v-if="autoRedirect">
                {{ $t("header.links.redirecting") }}
                <Spinner size="16" width="2"/>
              </span>
      </v-btn>
    </v-app-bar>
    <v-container fill-height class="full-height">
      <v-row align="center" justify="center">
        <v-col xs="10" sm="10">
          <v-row align="center" justify="center">
            <v-col xs="10" sm="10" justify="center">
              <div class="deep-purple--text text--lighten-5">
                <h1 class="strapline">
                  {{ $t('home.about.tagline1') }}
                </h1>
              </div>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col xs="10" sm="10" justify="center">
              <div class="deep-purple--text text--lighten-5 text-center">
                <div>
                  <span>{{ $t('home.about.tagline2') }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <MockInterfaceTable/>
      </v-row>
    </v-container>

    <div id="section-features">
      <v-container class="full-height" fill-height justify="center" align="center">
        <v-col cols="12">
          <v-row justify="center">
            <h2 class="white--text">
              {{ $t('home.features.title') }}
            </h2>
          </v-row>
          <v-row justify="center" class="deep-purple--text text--lighten-5">
            <v-col cols="10" sm="6" class="feature">
              <v-row>
                <v-col>
                  <v-icon x-large color="#ff607a">
                    mdi-heart
                  </v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p>
                    {{ $t('home.features.feature1.paragraph1') }}
                  </p>
                  <p>
                    {{ $t('home.features.feature1.paragraph2') }}
                  </p>
                  <p>
                    {{ $t('home.features.feature1.paragraph3') }}
                  </p>
                  <p>
                    {{ $t('home.features.feature1.paragraph4') }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="10" sm="6" class="feature">
              <v-row>
                <v-col>
                  <v-icon x-large color="#8a62ff">
                    mdi-gamepad
                  </v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p>
                    {{ $t('home.features.feature2.paragraph1') }}
                  </p>
                  <p>
                    {{ $t('home.features.feature2.paragraph2') }}
                  </p>
                  <p>
                    {{ $t('home.features.feature2.paragraph3') }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </div>
    <div id="section-pricing">
      <v-container
        class="full-height" fill-height
        align="center"
        justify="center"
      >
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-row justify="center">
              <h2>
                {{ $t('home.pricing.title') }}
              </h2>
            </v-row>
          </v-col>
          <v-col cols="8">
            <p>{{ $t('home.pricing.strapline') }}</p>
            <p><b>{{ $t('home.pricing.notice') }}</b></p>
          </v-col>

          <v-col cols="12">
            <v-row justify="center">
              <v-col cols="10" sm="4">
                <h4>
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
              <v-col cols="10" sm="4">
                <h4>
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
      </v-container>
    </div>
  </v-app>

</template>

<script lang="ts">
import Vue from "vue"
import BrandLogo from "@/components/Layout/BrandLogo.vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"
import MockInterfaceTable from "~/components/Homepage/MockInterfaceTable.vue";

export default Vue.extend({
  layout: "empty",
  name: "Home",
  components: {
    MockInterfaceTable,
    BrandLogo,
    Spinner,
  },
  data: () => ({
    autoRedirect: false,
  }),
  mounted() {
    if (this.isLoggedIn()) {
      this.$router.push({name: "feed"})
    }
    if (String(this.$route.query.passthrough) === "1") {
      this.autoRedirect = true
      this.login()
    }
  },
  methods: {
    isLoggedIn(): boolean {
      return this.$auth.loggedIn
    },
    login() {
      this.$auth.loginWith('auth0')
    },
    signup() {
      this.$auth.loginWith('auth0')
    },
  },
  head() {
    return {
      title: "Realtime game server notifications",
    }
  },
})
</script>


<style lang='scss' scoped>
* {
  font-family: "Source Sans Pro", sans-serif;
}

h2 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-bottom: 2rem;
}

.full-height {
  min-height: 100vh;
}

.strapline {
  font-size: 32px;
  text-align: center;
}

#section-features {
  background-color: #333;

  text-align: center;
  padding-top: 32px;
  padding-bottom: 32px;
}

#section-pricing {
  background-color: #FFF;
  color: #2b2b2b;
  text-align: center;

  padding-top: 5rem;
  padding-bottom: 5rem;
}
</style>
