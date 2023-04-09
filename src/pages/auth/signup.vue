<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="4">
        <v-card class="theme--dark">
          <v-card-title>
            <BrandLogo />
          </v-card-title>
          <v-card-text class="text-center">
            <label class="" for="email">
              Email
            </label>
            <input
              v-model="formData.email"
              placeholder="Email"
              type="email"
              autocomplete="username"
            />

            <label class="" for="email">
              Password
            </label>
            <input
              v-model="formData.password"
              placeholder="Password"
              type="password"
              autocomplete="current-password"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn @click="createUser">Sign up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState, mapGetters } from 'vuex'
import BrandLogo from "@/components/Layout/BrandLogo.vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"

export default Vue.extend({
  layout: "empty",
  name: "auth-signup",
  components: {
    BrandLogo,
    Spinner,
  },
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        this.postLogin()
      } catch (e) {
        alert(e)
      }
    },
    postLogin() {
      console.log('authenticated');
      this.$router.push({name: 'manage-feed'})
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
  head() {
    return {
      title: "Login",
    }
  },
})
</script>
