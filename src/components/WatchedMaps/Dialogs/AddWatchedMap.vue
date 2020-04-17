<template>
  <Add
    id="addMapNameDialog"
    :title="$t('notifications.dialogs.add.title')"
    :show="show"
    :confirm-disabled="(!mapNameValid) || (mapNameValid && mapName === '') || sending"
    @confirm="addWatchedMap"
    @deny="close"
  >
    <span v-show="userProfile.isSubscribed === true">{{ $t('notifications.dialogs.add.description.paid') }}</span>
    <span v-show="userProfile.isSubscribed === false">{{ $t('notifications.dialogs.add.description.free') }}</span>
    <v-form
      ref="form"
      v-model="formValid"
      :lazy-validation="false"
    >
      <v-text-field
        id="adduserlevel_name"
        v-model="mapName"
        :rules="[v => mapNameRegex.test(v) || $t('notifications.dialogs.add.form.nameError')]"
        :label="$t('notifications.dialogs.add.form.name')"
        required
        :disabled="sending"
      />
      <v-select
        id="serverId"
        v-model="serverId"
        name="serverId"
        :item-text="v => v.name || `${v.ipAddress}:${v.port}`"
        :item-value="v => v.id"
        :items="[{id: '', name: $t('notifications.dialogs.add.form.server')}].concat(servers)"
      />
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
    serverId: '',
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
      this.serverId = ''
    },
    addWatchedMap () {
      const name = this.mapName
      const serverId = this.serverId
      this.$repositories.levels.addWatchedLevel(name, serverId).then(() => {
        this.$toast.success(this.$t('notifications.toast.add.success', { name }))
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
