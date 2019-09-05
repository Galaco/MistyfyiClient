<template>
    <div class="home">
        <nav class="navbar">
            <md-toolbar>
                <router-link class="md-title" :to="{ name: 'home' }">
                    <BrandLogo light/>
                </router-link>

                <div class="md-toolbar-section-end" style="overflow-x: hidden;">
                    <router-link :to="{ name: 'servers' }" v-show="isLoggedIn()" id="toolbarOpenAppButton">
                        <md-button class="md-secondary" v-show="isLoggedIn()">
                            <span class="text-white">{{ $t('header.links.openApp') }}</span>
                        </md-button>
                    </router-link>
                    <md-button class="md-accent md-raised" v-show="isLoggedIn()" @click="handleLogout()" id="toolbarLogoutButton">
                        <span>{{ $t('header.links.logout') }}</span>
                    </md-button>
                    <md-button class="md-secondary" v-show="!isLoggedIn()" @click="handleLogin()" id="toolbarLoginButton">
                        <span class="text-white">{{ $t('header.links.login') }}</span>
                    </md-button>
                </div>
            </md-toolbar>
        </nav>
        <div class="section-1 md-layout md-gutter md-alignment-center-center background-gradient">
            <div class="md-layout-item md-size-40 md-small-size-80 strapline">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <span class="md-body-2">{{ $t('home.about.tagline1') }}</span>
                    </div>
                    <div class="md-layout-item md-size-100" style="height: 16px;"></div>
                    <div class="md-layout-item md-size-100">
                        <span class="md-body-2">{{ $t('home.about.tagline2') }}</span>
                    </div>
                </div>
            </div>
            <div class=" md-layout-item md-size-40 md-small-hide">
                <div class="infographic">
                    <div class="background">
                        <img src="/images/icons/server.svg"/>
                    </div>
                    <div class="background">
                        <svg class="lines">
                            <line x1="100" y1="125" x2="170" y2="170" stroke-dasharray="4" fill-opacity="0.54" style="stroke:rgba(0,0,0,0.54);stroke-width:4"/>
                            <line x1="275" y1="140" x2="235" y2="170" stroke-dasharray="4" fill-opacity="0.54" style="stroke:rgba(0,0,0,0.54);stroke-width:4" />
                            <line x1="240" y1="230" x2="315" y2="285" stroke-dasharray="4" fill-opacity="0.54" style="stroke:rgba(0,0,0,0.54);stroke-width:4" />
                            <line x1="115" y1="275" x2="170" y2="230" stroke-dasharray="4" fill-opacity="0.54" style="stroke:rgba(0,0,0,0.54);stroke-width:4" />
                        </svg> 
                    </div>
                    <div class="device1">
                        <md-icon class="md-size-2x">laptop</md-icon>
                    </div>
                    <div class="device2">
                        <md-icon class="md-size-2x">smartphone</md-icon>
                    </div>
                    <div class="device3">
                        <md-icon class="md-size-2x">desktop_windows</md-icon>
                    </div>
                    <div class="device4">
                        <md-icon class="md-size-2x">tablet_mac</md-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-2 md-layout md-alignment-top-center md-gutter">
            <div class="md-layout-item md-size-40 md-xsmall-size-100 feature">
                <i class="material-icons heart">favorite_border</i>
                <p>{{ $t('home.features.feature1.paragraph1') }}</p>
                <p>{{ $t('home.features.feature1.paragraph2') }}</p>
                <p>{{ $t('home.features.feature1.paragraph3') }}</p>
            </div>
            <div class="md-layout-item md-size-40 md-xsmall-size-100 feature">
                <i class="material-icons games">games</i>
                <p>{{ $t('home.features.feature2.paragraph1') }}</p>
                <p>{{ $t('home.features.feature2.paragraph2') }}</p>
            </div>
        </div>
        <div class="section-3 md-layout md-alignment-top-center background-gradient text-white">
            <div class="md-layout-item md-size-80">
                <span class="md-title">{{ $t('home.pricing.title') }}</span>
            </div>
            <div class="md-layout-item md-size-80">
                <p>{{ $t('home.pricing.strapline') }}</p>
            </div>
            <div class="md-layout-item md-size-80">
                <div class="md-layout md-layout md-alignment-top-center">
                    <div class="md-layout-item md-size-80 text-center">
                        <b>{{ $t('home.pricing.notice') }}</b>
                    </div>
                </div>
            </div>
            <div class="tier-free md-layout-item md-size-40 md-xsmall-size-100">
                <h5 class="tier-header"><i class="material-icons person">person_outline</i>{{ $t('home.pricing.free.title') }}</h5>
                <ul>
                    <li>{{ $t('home.pricing.free.feature1') }}</li>
                    <li>{{ $t('home.pricing.free.feature2') }}</li>
                </ul>
            </div>
            <div class="tier-donator md-layout-item md-size-40 md-xsmall-size-100">
                <h5 class="tier-header"><i class="material-icons star">star_border</i>{{ $t('home.pricing.paid.title') }}</h5>
                <ul>
                    <li>{{ $t('home.pricing.paid.feature1') }}</li>
                    <li>{{ $t('home.pricing.paid.feature2') }}</li>
                    <li>{{ $t('home.pricing.paid.feature3') }}</li>
                </ul>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BrandLogo from '@/components/Branding/BrandLogo.vue';
import UserProfile from '@/components/Layout/Toolbar/UserProfile.vue';
import Footer from './../components/Layout/Footer.vue';

export default Vue.extend({
    name: 'Home',
    components: {
        Footer,
        BrandLogo,
        UserProfile,
    },
    methods: {
        handleLogin() {
            this.$auth.login();
        },
        handleLogout() {
            this.$auth.logout();
        },
        isLoggedIn() {
            return this.$auth.isAuthenticated();
        },
    },
});
</script>

<style lang="scss" scoped>

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

                &.heart {
                    color: #ff607a;
                }

                &.games {
                    color: #8a62ff;
                }
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
