<template>
  <Add
    id="addMapNameDialog"
    :title="$t('servers.mapNames.dialogs.add.title')"
    :show="show"
    :confirm-disabled="(!mapNameValid) || (mapNameValid && mapName === '') || sending"
    @confirm="addWatchedMap"
    @deny="close"
  >
    <span v-show="userProfile.isSubscribed === true">{{ $t('servers.mapNames.dialogs.add.description.paid') }}</span>
    <span v-show="userProfile.isSubscribed === false">{{ $t('servers.mapNames.dialogs.add.description.free') }}</span>
    <form novalidate class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field :class="(!mapNameValid)? 'md-invalid': ''">
          <label for="adduserlevel_name">{{ $t('servers.mapNames.dialogs.add.form.name') }}</label>
          <md-input
            id="adduserlevel_name"
            v-model="mapName"
            name="name"
            required
            :disabled="sending"
          />
          <span v-show="userProfile.isSubscribed === false" class="md-helper-text">{{ $t('servers.mapNames.dialogs.add.form.nameHelperFree') }}</span>
          <span v-show="userProfile.isSubscribed === true" class="md-helper-text">{{ $t('servers.mapNames.dialogs.add.form.nameHelperPaid') }}</span>
          <span class="md-error">{{ $t('servers.mapNames.dialogs.add.form.nameError') }}</span>
        </md-field>
        <md-field>
          <label for="movie">{{ $t('servers.mapNames.dialogs.add.form.server') }}</label>
          <md-select id="serverId" v-model="serverId" name="serverId">
            <md-option :key="-1" value="-1">
              {{ $t('servers.mapNames.dialogs.add.form.server') }}
            </md-option>
            <md-option v-for="(server,index) in servers" :key="index" :value="server.id">
              {{ server.name || `${server.ip_address}:${server.port}` }}
            </md-option>
          </md-select>
          <span class="md-helper-text">{{ $t('servers.mapNames.dialogs.add.form.serverHelper') }}</span>
        </md-field>
      </div>
    </form>
    <md-progress-bar v-if="sending" md-mode="indeterminate" />
  </Add>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Add from '@/components/Dialogs/Add.vue'

const mapNameRegex = /^[a-zA-Z0-9-_*]+$/

export default Vue.extend({
  name: 'AddWatchedMap',
  components: {
    Add
  },
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    mapName: '',
    serverId: -1,
    mapNameValid: true,
    sending: false
  }),
  computed: {
    ...mapGetters(['servers', 'userProfile'])
  },
  watch: {
    mapName (value) {
      this.mapNameValid = mapNameRegex.test(value)
    }
  },
  methods: {
    close () {
      this.reset()
      this.$emit('deny')
    },
    submit () {
      this.$emit('confirm')
      this.reset()
    },
    reset () {
      this.sending = false
      this.mapName = ''
      this.mapNameValid = true
      this.serverId = -1
    },
    addWatchedMap () {
      const name = this.mapName
      const serverId = this.serverId
      this.$repositories.levels.addWatchedLevel(name, serverId).then(() => {
        this.$toasted.global.api_success({
          message: this.$t('servers.mapNames.toast.add.success', { name })
        })
        this.sending = false
        this.submit()
      }).catch((err: Error) => {
        this.sending = false
        this.$toasted.global.api_error({ message: err.message })
      })
    }
  }
})
</script>
