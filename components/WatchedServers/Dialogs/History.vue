<template>
  <Info
    id="serverHistoryDialog"
    :title="$t('servers.servers.dialogs.history.title')"
    :show="show"
    :confirm-disabled="false"
    @deny="close"
  >
    <div
      v-if="isServerHistoryLoading"
      class="col-sm-12 loading-spinner"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      />
    </div>
    <v-simple-table>
      <thead>
        <tr>
          <th>{{ $t('servers.servers.dialogs.history.body.headers.date') }}</th>
          <th>{{ $t('servers.servers.dialogs.history.body.headers.mapName') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s,index) in history" :key="index">
          <td>{{ timestampToLabel(s.date_created) }}</td>
          <td>{{ s.map_name }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </Info>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Info from '@/components/Dialogs/Info.vue'
import { FETCH_SERVER_HISTORY } from '@/store/actions.type'
import { DateToDateTimeString } from '@/locale/time'

export default Vue.extend({
  name: 'History',
  components: {
    Info
  },
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    // eslint-disable-next-line
    server: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['history', 'historyCount', 'isServerHistoryLoading'])
  },
  watch: {
    // eslint-disable-next-line
    server (newValue: any) {
      if (newValue == null) {
        return
      }
      this.fetchHistory(newValue.id)
    }
  },
  methods: {
    fetchHistory (id: any) {
      this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch((err) => {
        this.$toast.error(err.message)
      })
    },
    close () {
      this.$emit('deny')
    },
    timestampToLabel (timestamp: number): string {
      return DateToDateTimeString(new Date(timestamp * 1000))
    }
  }
})
</script>

<style lang='scss' scoped>
    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
