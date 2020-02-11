<template>
  <div class="home">
    <v-row
      class="section-1 background-gradient"
      align="center"
      justify="center"
    >
      <v-col cols="4" class="strapline">
        <div>
          <div>
            <span class="md-body-2">{{ $t('home.about.tagline1') }}</span>
          </div>
          <div>
            <span class="md-body-2">{{ $t('home.about.tagline2') }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="infographic">
          <div class="background">
            <img src="/images/icons/server.svg">
          </div>
          <div class="background">
            <svg class="lines">
              <line
                x1="100"
                y1="125"
                x2="170"
                y2="170"
                stroke-dasharray="4"
                fill-opacity="0.54"
                style="stroke:rgba(0,0,0,0.54);stroke-width:4"
              />
              <line
                x1="275"
                y1="140"
                x2="235"
                y2="170"
                stroke-dasharray="4"
                fill-opacity="0.54"
                style="stroke:rgba(0,0,0,0.54);stroke-width:4"
              />
              <line
                x1="240"
                y1="230"
                x2="315"
                y2="285"
                stroke-dasharray="4"
                fill-opacity="0.54"
                style="stroke:rgba(0,0,0,0.54);stroke-width:4"
              />
              <line
                x1="115"
                y1="275"
                x2="170"
                y2="230"
                stroke-dasharray="4"
                fill-opacity="0.54"
                style="stroke:rgba(0,0,0,0.54);stroke-width:4"
              />
            </svg>
          </div>
          <div class="device1">
            <v-icon x-large>
              mdi-laptop
            </v-icon>
          </div>
          <div class="device2">
            <v-icon x-large>
              mdi-cellphone
            </v-icon>
          </div>
          <div class="device3">
            <v-icon x-large>
              mdi-desktop-mac
            </v-icon>
          </div>
          <div class="device4">
            <v-icon x-large>
              mdi-tablet-ipad
            </v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="section-2"
      justify="center"
    >
      <v-col cols="4" class="feature">
        <v-icon large color="#ff607a">
          mdi-heart
        </v-icon>
        <p>{{ $t('home.features.feature1.paragraph1') }}</p>
        <p>{{ $t('home.features.feature1.paragraph2') }}</p>
        <p>{{ $t('home.features.feature1.paragraph3') }}</p>
      </v-col>
      <v-col cols="4" class="feature">
        <v-icon large color="#8a62ff">
          mdi-gamepad
        </v-icon>
        <p>{{ $t('home.features.feature2.paragraph1') }}</p>
        <p>{{ $t('home.features.feature2.paragraph2') }}</p>
      </v-col>
    </v-row>
    <v-row
      class="section-3 background-gradient text-white"
      align="center"
      justify="center"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="1">
          <h2>
            {{ $t('home.pricing.title') }}
          </h2>
        </v-col>
      </v-row>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="8">
          <p>{{ $t('home.pricing.strapline') }}</p>
        </v-col>
      </v-row>
      <v-row
        class="md-layout-item md-size-80"
        align="center"
        justify="center"
      >
        <div>
          <div class="text-center">
            <b>{{ $t('home.pricing.notice') }}</b>
          </div>
        </div>
      </v-row>
      <v-row
        justify="center"
      >
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
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'index',
  name: 'Home',
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
    .home {
        .navbar {
            position: absolute;
            width: 100vw;
            max-width: 100%;

            .md-toolbar.md-theme-default {
                background: none !important;
                box-shadow: none !important;
            }
        }

        .infographic {
            position: relative;
            height: 400px;
            line-height: 400px;

            .background {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                img {
                    position: absolute;
                    top: 172px;
                    left: 172px;
                    max-width: 60px;
                    max-height: 60px;
                }

                svg.lines {
                    width: 400px;
                    height: 400px;
                }
            }

            [class^="device"] {
                position: absolute;
                line-height: 200px;
            }

            .device1 {
                top: 0;
                left: 68px;
            }

            .device2 {
                top: 16px;
                left: 272px;
            }

            .device3 {
                bottom: 0;
                left: 80px;
            }

            .device4 {
                bottom: 8px;
                left: 320px;
            }
        }

        [class^="section-"] {
            padding: 32px;

            > div {
                max-width: 1000px;
            }
        }

        .section-1 {
            margin: 0;
            padding: 80px 32px 32px 32px;
            height: 600px;
            color: #efefef;

            .strapline {
                text-align: left;
            }
        }

        .section-2 {
            max-width: 100vw;
            min-height: 420px;
            margin: 0;
            padding: 100px 0;
            background: #fff;

            .feature {
                text-align: center;
            }

            .material-icons {
                font-size: 48px;
            }
        }

        .section-3 {
            min-height: 600px;
            text-align: left;
            padding-bottom: 30px;
            background-color: #efefef;

            .header {
                padding-bottom: 30px;
            }

            .tier-header {
                text-align: center;

                .material-icons {
                    font-size: 30px;
                    vertical-align: middle;

                    &.person {
                        color: darkseagreen;
                    }

                    &.star {
                        color: #ffcb56;
                    }
                }
            }
        }
    }

    .text-white {
        color: #fff;
    }
    .text-center {
        text-align: center;
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
