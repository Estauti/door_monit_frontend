<template>
  <div>
    <h1>Últimos alertas</h1>
    <ul>
      <li v-for="alert in alerts" :key="alert.id">
        {{ alert.device_name }}
        {{ $moment(alert.started_at).format("DD/MM/YYYY HH:mm:ss") }}
        {{ $moment(alert.finished_at).format("DD/MM/YYYY HH:mm:ss") }}
      </li>
    </ul>
  </div>
</template>

<script>
import { api_url } from '@/helpers/api_url'

export default {
  data() {
    return {
      alerts: []
    }
  },
  mounted() {
    this.getDeviceAlerts(2);
  },
  methods: {
    getDeviceAlerts(device_id) {
      this.axios.get(`${api_url}/api/alerts.json`, {device_id})
        .then(response => {
          this.alerts = response.data;
        });
    }
  }
}
</script>

<style>

</style>