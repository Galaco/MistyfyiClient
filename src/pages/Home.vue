<template>
    <div class="home">
        <Header/>
        <div class="md-layout md-alignment-center-center section-1">
            <div class="md-layout-item md-size-40 strapline">
                <h4>{{ $t('home.about.title') }}</h4>
                <p>{{ $t('home.about.tagline1') }}</p>
                <p>{{ $t('home.about.tagline2') }}</p>
            </div>
            <div class="md-layout-item md-size-40">
                <video src="#" poster="#" controls muted>
                    <img src="fallback.jpg" v-bind:alt="$t('home.about.taglineImageFallback')">
                </video>
            </div>
        </div>
        <div class="section-2 md-layout md-alignment-top-center">
            <div class="md-layout-item md-size-40 feature">
                <i class="material-icons heart">favorite_border</i>
                <p>{{ $t('home.features.feature1.paragraph1') }}</p>
                <p>{{ $t('home.features.feature1.paragraph2') }}</p>
            </div>
            <div class="md-layout-item md-size-40 feature">
                <i class="material-icons games">games</i>
                <p>{{ $t('home.features.feature2.paragraph1') }}</p>
                <p>{{ $t('home.features.feature2.paragraph2') }}</p>
            </div>
        </div>
        <div class="section-3">
            <div class="md-layout md-alignment-top-center">
                <div class="md-layout-item md-size-80">
                    <h4>{{ $t('home.pricing.title') }}</h4>
                    <p>{{ $t('home.pricing.strapline') }}</p>
                    <b>{{ $t('home.pricing.notice') }}</b>
                </div>
                <div class="md-layout-item md-size-40 tier-free">
                    <h5 class="tier-header"><i class="material-icons person">person_outline</i>{{ $t('home.pricing.free.title') }}</h5>
                    <ul>
                        <li>{{ $t('home.pricing.free.feature1') }}</li>
                        <li>{{ $t('home.pricing.free.feature2') }}</li>
                    </ul>
                </div>
                <div class="md-layout-item md-size-40 tier-donator">
                    <h5 class="tier-header"><i class="material-icons star">star_border</i>{{ $t('home.pricing.paid.title') }}</h5>
                    <ul>
                        <li>{{ $t('home.pricing.paid.feature1') }}</li>
                        <li>{{ $t('home.pricing.paid.feature2') }}</li>
                        <li>{{ $t('home.pricing.paid.feature3') }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "../components/layout/Header";
    import Footer from "../components/layout/Footer";
    export default {
        name: 'Home',
        components: {
            Header,
            Footer,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        margin-top: -108px;
    }
    [class^="section-"] {
        padding: 32px;

    }
    .section-1 {
        margin-top: 96px;
        padding: 128px 32px 32px 32px;
        min-height: 520px;
        color: #efefef;
        background: #007bff;
        background: linear-gradient(to right, #0062E6, #33AEFF);
    }
    .section-1 .strapline {
        text-align: left;
    }

    .section-2 {
        min-height: 380px;
        padding: 100px 0;
        background: #fff;
    }

    .section-2 .feature {
        text-align: center;
    }

    .section-2 .material-icons {
        font-size: 48px;
    }

    .section-2 .material-icons.heart {
        color: #ff607a;
    }

    .section-2 .material-icons.games {
        color: #8a62ff;
    }

    .section-3 {
        min-height: 380px;
        text-align: left;
        padding-bottom: 30px;
        background-color: #efefef;
    }

    .section-3 .header {
        padding-bottom: 30px;
    }

    .section-3 .tier-header {
        text-align: center;
    }

    .section-3 .tier-header .material-icons {
        font-size: 30px;
        vertical-align: middle;
    }

    .section-3 .tier-header .material-icons.person {
        color: darkseagreen;
    }

    .section-3 .tier-header .material-icons.star {
        color: #ffcb56;
    }

    .section-3 .col-sm-6 ul li {
        line-height: 200%;
    }
</style>
