<template>
    <div class="home">
        <Header/>
        <div class="section-1 font-weight-light mt-4 text-white">
            <div class="container">
                <div class="row">
                    <div class="col-sm-5 offset-sm-1 strapline">
                        <h4>{{ $t('home.about.title') }}</h4>
                        <p>{{ $t('home.about.tagline1') }}</p>
                        <p>{{ $t('home.about.tagline2') }}</p>
                    </div>
                    <div class="col-sm-4 offset-sm-1">
                        <video src="#" poster="#" controls muted>
                            <img src="fallback.jpg" v-bind:alt="$t('home.about.taglineImageFallback')">
                        </video>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-2">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4 offset-sm-1 text-center">
                        <i class="material-icons heart">favorite_border</i>
                        <p>{{ $t('home.features.feature1.paragraph1') }}</p>
                        <p>{{ $t('home.features.feature1.paragraph2') }}</p>
                    </div>
                    <div class="col-sm-4 offset-sm-2 text-center">
                        <i class="material-icons games">games</i>
                        <p>{{ $t('home.features.feature2.paragraph1') }}</p>
                        <p>{{ $t('home.features.feature2.paragraph2') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-3">
            <div class="container">
                <div class="row header">
                    <div class="col-sm-10 offset-sm-1">
                        <h4>{{ $t('home.pricing.title') }}</h4>
                        <p>{{ $t('home.pricing.strapline') }}</p>
                        <b>{{ $t('home.pricing.notice') }}</b>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-5 offset-sm-1 tier-free">
                        <h5 class="tier-header"><i class="material-icons person">person_outline</i>{{ $t('home.pricing.free.title') }}</h5>
                        <ul>
                            <li>{{ $t('home.pricing.free.feature1') }}</li>
                            <li>{{ $t('home.pricing.free.feature2') }}</li>
                        </ul>
                    </div>
                    <div class="col-sm-5 tier-donator">
                        <h5 class="tier-header"><i class="material-icons star">star_border</i>{{ $t('home.pricing.paid.title') }}</h5>
                        <ul>
                            <li>{{ $t('home.pricing.paid.feature1') }}</li>
                            <li>{{ $t('home.pricing.paid.feature2') }}</li>
                            <li>{{ $t('home.pricing.paid.feature3') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/layout/Header";
    export default {
        name: 'Home',
        components: {Header}
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
        padding-top: 48px;
        min-height: 520px;
        top: 64px;
        color: #efefef;
        background: #007bff;
        background: linear-gradient(to right, #0062E6, #33AEFF);
    }
    .section-1 .container {
        padding-top: 120px;
    }
    .section-1 .container .strapline {
        text-align: left;
    }

    .section-2 {
        min-height: 380px;
        padding-top: 100px;
        background: #fff;
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
