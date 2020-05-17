<template>
  <div>
    <h1>Últimos Alertas</h1>
    <b-table 
      striped 
      hover 
      :items="alerts"
      :fields="alerts_fields"
      class="mt-4"
      show-empty
      empty-text="Não ocorreram alertas"
    >

    <template v-slot:cell(finished_at)="row">
      <span v-if="row.value == 'Invalid date'">
        <font-awesome-icon 
          icon="exclamation-triangle"
          size="lg" 
          class="text-danger"
        />
        Aberta
      </span>
      <span v-else>{{ row.value }}</span>
    </template>

    </b-table>

    <paginate
      v-model="pagination.page"
      :page-count="pagination.total_pages"
      :click-handler="getAlerts"
      :prev-text="'Ante.'"
      :next-text="'Próx.'"
      :page-range="5"
      :margin-pages="2"
      page-class="pagination"
      :container-class="'pagination justify-content-center'"
    ></paginate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alerts: [],
      pagination: {
        total_pages: 0,
        page: 1
      },
      alerts_fields: [
        {
          key: 'device_name',
          label: "Dispositivo"
        },
        {
          key: 'started_at',
          label: 'Início',
          formatter: (value) => {
            return this.$moment(value).format("DD/MM/YYYY HH:mm:ss")
          }
        },
        {
          key: 'finished_at',
          label: 'Encerrado',
          formatter: (value) => {
            return this.$moment(value).format("DD/MM/YYYY HH:mm:ss")
          }
        },
        {
          key: 'duration',
          label: 'Duração',
          formatter: (value, key, item) => {
            let duration = this.$moment(item.finished_at).from(this.$moment(item.started_at), true);

            if (duration == 'Invalid date') {
              return '--';
            }
            return duration;
          }
        }
      ]
    }
  },
  mounted() {
    this.getAlerts();
    this.$cable.subscribe({
      channel: 'AlertChannel',
      room: 'public',
      user_id: this.$auth.user().id
    });
  },
  channels: {
    AlertChannel: {
      connected() {},
      received(data) {
        if (data.action == 'started') {
          this.getAlerts();
        }
        else if (data.action == 'finished') {
          this.updateAlertFinishedAt(data)
        }
      }
    }
  },
  methods: {
    getAlerts() {
      this.axios.get(`/alerts.json`, {
        params: {
          device_id: this.device_search_id,
          page: this.pagination.page
        }
      })
        .then(response => {
          this.alerts = response.data;
          this.pagination.total_pages = parseInt(response.headers['total-pages'])
        });
    },
    updateAlertFinishedAt(data) {
      let index = this.alerts.findIndex(alert => alert.id == data.id)
      if (index < 0) return;

      this.alerts[index].finished_at = data.finished_at;
    }
  }
}
</script>

<style>

</style>