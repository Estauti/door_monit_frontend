<template>
  <div>
    <h1>Medidas</h1>

    <b-table 
      striped 
      hover 
      :items="measurements"
      :fields=measurements_fields
      class="mt-4"
    >
      <template v-slot:cell(opened)="row">
        <b-badge :variant="formatOpenedVariant(row.value)">
          {{ formatOpened(row.value) }}
        </b-badge>
      </template>

      <template v-slot:cell(created_at)="row">
        {{ $moment.utc(row.value).format("DD/MM/YYYY hh:mm:ss") }}
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
          key: 'device_id',
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
    formatOpened(opened) {
      if (opened) {
        return 'Aberto';
      }
      else {
        return 'Fechado';
      }
    },
    formatYesNo(status) {
      if (status) {
        return 'Sim';
      }
      else {
        return 'Não';
      }
    },
    formatOpenedVariant(opened) {
      if (opened) {
        return 'danger';
      }
      else {
        return 'primary';
      }
    },
    formatVariant(opened) {
      if (opened) {
        return 'primary';
      }
      else {
        return 'danger';
      }
    }
  }
}
</script>

<style>

</style>