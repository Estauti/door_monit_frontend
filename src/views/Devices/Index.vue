<template>
  <div>
    <h1>Tela de listagem de Dispositivos</h1>

    <b-table 
      striped 
      hover 
      :items="devices"
      :fields=devices_fields
    >
      <template v-slot:cell(opened)="row">
        <b-badge :variant="formatOpenedVariant(row.value)">
          {{ formatOpened(row.value) }}
        </b-badge>
      </template>

      <template v-slot:cell(created_at)="row">
        {{ $moment.utc(row.value).format("DD/MM/YYYY hh:mm:ss") }}
      </template>

      <template v-slot:cell(active)="row">
        <b-badge :variant="formatVariant(row.value)">
          {{ formatYesNo(row.value) }}
        </b-badge>
      </template>

      <template v-slot:cell(authorized)="row">
        <b-badge :variant="formatVariant(row.value)">
          {{ formatYesNo(row.value) }}
        </b-badge>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      devices_fields: [
        {
          key: 'opened',
          label: "Status Porta"
        },
        {
          key: 'mac',
          label: 'MAC'
        },
        {
          key: 'name',
          label: 'Nome'
        },
        {
          key: 'created_at',
          label: 'Data Criação'
        },
        {
          key: 'active',
          label: 'Ativo'
        },
        {
          key: 'authorized',
          label: 'Authorizado'
        },
      ],
      devices: []
    }
  },
  created() {
    this.getDevices();
  },
  methods: {
    getDevices() {
      axios.get('http://localhost:3000/api/devices')
      .then(response => {
        this.devices = response.data;
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