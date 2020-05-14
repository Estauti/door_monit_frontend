<template>
  <div>
    <h1 class="text-center">Medições</h1>

    <b-table 
      striped 
      hover 
      :items="measurements"
      :fields=measurements_fields
      class="mt-4"
    >
      <template v-slot:cell(opened)="row">
        <font-awesome-icon :icon="row.value ? 'door-open' : 'door-closed'" size="lg" />
      </template>

      <template v-slot:cell(created_at)="row">
        {{ $moment(row.value).format("DD/MM/YYYY HH:mm:ss") }}
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';
import { api_url } from '@/helpers/api_url'

export default {
  data() {
    return {
      measurements_fields: [
        {
          key: 'opened',
          label: "Status"
        },
        {
          key: 'device_name',
          label: 'Dispositivo'
        },
        {
          key: 'created_at',
          label: 'Data Criação'
        }
      ],
      measurements: []
    }
  },
  created() {
     this.getMeasurements();
  },
  methods: {
    getMeasurements() {
      axios.get(`${api_url}/api/measurements.json`)
      .then(response => {
        this.measurements = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
  }
}
</script>

<style>

</style>