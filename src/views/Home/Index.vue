<template>
  <div>
    <b-row>
      <b-col xl=6 lg=6>
        <h1>Visão Geral</h1>
        <b-row class="mt-4">
          <b-col v-if="devices.length == 0">
            Você não possui Dispositivos autorizados
          </b-col>

          <b-col 
            v-for="device in devices" 
            :key="device.id" 
            cols=4
            class="mb-3 text-center"
          >
            <div class="icons-parent">
              <font-awesome-icon 
                :icon="device.opened ? 'door-open' : 'door-closed'" 
                :class="{'text-danger': device.opened && device.in_alert}"
                class="door-icon"
                size="5x" 
              />
              <font-awesome-icon 
                icon="exclamation" 
                v-show="device.in_alert"
                class="alert-icon text-danger"
                size="2x" 
              />
            </div>
            <div class="mt-1">{{ device.name }}</div>
          </b-col>
        </b-row>
      </b-col>

      <b-col xl=6 lg=6>
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
      devices: [],
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
    this.getDevices();
    this.$cable.subscribe({
      channel: 'MeasurementChannel',
      room: 'public',
      user_id: this.$auth.user().id
    });
  },
  channels: {
    MeasurementChannel: {
      connected() {},
      received(data) {
        this.deviceOpenedChanged(data.device_id, data.opened)
      }
    }
  },
  methods: {
    getAlerts() {
      this.axios.get(`${api_url}/api/alerts.json`, {
        params: {
          device_id: this.device_search_id,
          page: this.pagination.page
        }
      })
        .then(response => {
          this.alerts = response.data;
          console.log(response.headers)
          this.pagination.total_pages = parseInt(response.headers['total-pages'])
        });
    },
    getDevices() {
      this.axios.get(`${api_url}/api/devices.json`, {
        params: {authorized: true}
      })
      .then(response => {
        this.devices = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    deviceOpenedChanged(device_id, opened) {
      let index = this.devices.findIndex(device => device.id == device_id);

      this.devices[index].opened = opened
    }
  }
}
</script>

<style>
  .icons-parent {
    position: relative;
    top: 0;
    left: 0;
  }
  .door-icon {
    position: relative;
    top: 0;
    left: 0;
  }
  .alert-icon {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>