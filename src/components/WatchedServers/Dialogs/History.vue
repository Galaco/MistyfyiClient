<template>
  <Info
    id="serverHistoryDialog"
    :title="$t('servers.dialogs.history.title')"
    :show="show"
    :confirm-disabled="false"
    @deny="close"
  >
    <div v-if="isServerHistoryLoading" class="col-sm-12 loading-spinner">
      <Spinner />
    </div>
    <v-simple-table v-if="!isServerHistoryLoading">
      <thead>
        <tr>
          <th>{{ $t("servers.dialogs.history.body.headers.date") }}</th>
          <th>{{ $t("servers.dialogs.history.body.headers.mapName") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, index) in history" :key="index">
          <td>{{ timestampToLabel(s.dateCreated) }}</td>
          <td>{{ s.mapName }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </Info>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import Info from "@/components/Dialogs/Info.vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"
import { FETCH_SERVER_HISTORY } from "@/store/actions.type"
import { DateToDateTimeString } from "@/locale/time"
import Server from "@/models/api/servers/Server"

export default Vue.extend({
  name: "History",
  components: {
    Info,
    Spinner,
  },
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    // eslint-disable-next-line
    server: {
      type: Server,
      default: () => new Server("", ""),
    },
  },
  computed: {
    ...mapGetters(["history", "historyCount", "isServerHistoryLoading"]),
  },
  watch: {
    // eslint-disable-next-line
    server(newValue: Server) {
      if (newValue == null) {
        return
      }
      this.fetchHistory(newValue.id)
    },
  },
  methods: {
    fetchHistory(id: string) {
      this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch(err => {
        this.$toast.error(err.message)
      })
    },
    close() {
      this.$emit("deny")
    },
    timestampToLabel(timestamp: number): string {
      return DateToDateTimeString(new Date(timestamp * 1000))
    },
  },
})
</script>

<style lang="scss" scoped>
.loading-spinner {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
