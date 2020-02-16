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
    <v-form
      ref="form"
      v-model="formValid"
      :lazy-validation="false"
    >
      <v-text-field
        id="adduserlevel_name"
        v-model="mapName"
        :rules="[v => mapNameRegex.test(v) || $t('servers.mapNames.dialogs.add.form.nameError')]"
        :label="$t('servers.mapNames.dialogs.add.form.name')"
        required
        :disabled="sending"
      />
      <v-select
        id="serverId"
        v-model="serverId"
        name="serverId"
        :item-text="v => v.name || `${v.ip_address}:${v.port}`"
        :item-value="v => v.id"
        :items="[{id: -1, name: $t('servers.mapNames.dialogs.add.form.server')}].concat(servers)"
      >
        <!-- <md-option :key="-1" value="-1">
          {{ $t('servers.mapNames.dialogs.add.form.server') }}
        </md-option>
        <md-option v-for="(server,index) in servers" :key="index" :value="server.id">
          {{ server.name || `${server.ip_address}:${server.port}` }}
        </md-option> -->
      </v-select>

      <div class="md-layout-item md-small-size-100">
        <!-- <md-field :class="(!mapNameValid)? 'md-invalid': ''">
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
        </md-field> -->
        <!-- <md-field>
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
        </md-field> -->
      </div>
    </v-form>
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
    formValid: false,
    mapName: '',
    serverId: -1,
    mapNameValid: true,
    sending: false,
    mapNameRegex: /^[a-zA-Z0-9-_*]+$/
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
        this.$toast.success(this.$t('servers.mapNames.toast.add.success', { name }))
        this.sending = false
        this.submit()
      }).catch((err: Error) => {
        this.sending = false
        this.$toast.error(err.message)
      })
    }
  }
})
</script>
