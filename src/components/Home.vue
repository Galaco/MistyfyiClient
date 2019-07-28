<template>
    <div class="home">
        <div class="section-1 font-weight-light mt-4 text-white">
            <div class="container">
                <div class="row">
                    <div class="col-sm-5 offset-sm-1 strapline">
                        <h4>MapTracker</h4>
                        <p>MapTracker is a near-realtime notification tool for watching map rotations on dedicated video game servers.</p>
                        <p>Receive notifications on your device when servers you like switch to a map you enjoy.</p>
                    </div>
                    <div class="col-sm-4 offset-sm-1">
                        <video src="#" poster="#" controls muted>
                            <img src="fallback.jpg" alt="How does MapTracker work?">
                        </video>

                    </div>
                </div>
            </div>
        </div>
        <div class="section-2">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4 offset-sm-1">
                        <i class="material-icons heart">favorite_border</i>
                        <p>Never miss a map again! Play only the maps you love, in the places you love.</p>
                        <p>Near-realtime notifications pushed to your device when your favourite games servers switch to maps you love.</p>
                    </div>
                    <div class="col-sm-4 offset-sm-2">
                        <i class="material-icons games">games</i>
                        <p>All popular Source Engine games are supported, including Counterstrike: Global Offensive, Garry's Mod, Counterstrike: Source</p>
                        <p>Is your favorite game not supported? Please make a request and we'll endeavour to add it to our service.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-3">
            <div class="container">
                <div class="row header">
                    <div class="col-sm-10 offset-sm-1">
                        <h4>Pricing</h4>
                        <p>This is a one-map hobby project, but is expensive to keep running. By supporting this project with a small yearly fee, you can keep this project running, and you'll receive plenty of benefits.</p>
                        <b>All money received will go towards hosting costs.</b>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-5 offset-sm-1 tier-free">
                        <h5 class="tier-header"><i class="material-icons person">person_outline</i>Free</h5>
                        <ul>
                            <li>Monitor up to 3 game servers concurrently</li>
                            <li>Watch for up to 3 specific map/level names across watched game servers</li>
                        </ul>
                    </div>
                    <div class="col-sm-5 tier-donator">
                        <h5 class="tier-header"><i class="material-icons star">star_border</i>Donator (coming soon...)</h5>
                        <ul>
                            <li>Monitor up to 100 game servers concurrently</li>
                            <li>Watch for up to 100 specific map/level names across watched game servers</li>
                            <li>Wildcard map/level name support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home'
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
