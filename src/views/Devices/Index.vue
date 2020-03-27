<template>
  <div>
    <h1>Dispositivos</h1>

    <b-table 
      striped 
      hover 
      :items="devices"
      :fields=devices_fields
      class="mt-4"
    >
      <template v-slot:cell(opened)="row">
        <font-awesome-icon :icon="row.value ? 'door-open' : 'door-closed'" size="lg" />
      </template>

      <template v-slot:cell(created_at)="row">
        {{ $moment.utc(row.value).format("DD/MM/YYYY hh:mm:ss") }}
      </template>

      <template v-slot:cell(active)="row">
        <b-form-checkbox 
          v-model="row.value" 
          name="check-button" 
          switch
          @change="updateActive(row.item, !row.value)"
        ></b-form-checkbox>
      </template>

      <template v-slot:cell(authorized)="row">
        <b-form-checkbox 
          v-model="row.value" 
          name="check-button" 
          switch
          @change="updateAuthorized(row.item, !row.value)"
        ></b-form-checkbox>
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
      devices_fields: [
        {
          key: 'opened',
          label: "Status Porta"
        },
        {
          key: 'name',
          label: 'Nome'
        },
        {
          key: 'mac',
          label: 'MAC'
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
          label: 'Autorizado'
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
      axios.get(`${api_url}/api/devices.json`)
      .then(response => {
        this.devices = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    updateActive(device, new_status) {
      axios.put(`${api_url}/api/devices/${device.id}.json`, {
        active: new_status
      })
      .then(response => {
        const index = this.devices.findIndex(d => d.id == device.id)
        this.devices[index] = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    updateAuthorized(device, new_status) {
      axios.put(`${api_url}/api/devices/${device.id}.json`, {
        authorized: new_status
      })
      .then(response => {
        const index = this.devices.findIndex(d => d.id == device.id)
        this.devices[index] = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>

</style>