<template>
  <div>
    <b-row>
      <b-col cols=6 class="col-r-border">
        <h1>Últimos alertas</h1>
        <b-table 
          striped 
          hover 
          :items="alerts"
          :fields="alerts_fields"
          class="mt-4"
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { api_url } from '@/helpers/api_url'

export default {
  data() {
    return {
      device_search_id: null,
      alerts: [],
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
  },
  methods: {
    getAlerts() {
      this.axios.get(`${api_url}/api/alerts.json`, {
        device_id: this.device_search_id
      })
        .then(response => {
          this.alerts = response.data;
        });
    }
  }
}
</script>

<style>
  .col-r-border {
    border-right: 1px solid #c3c2c2;
  }
</style>