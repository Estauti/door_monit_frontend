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
        {{ $moment(row.value).format("DD/MM/YYYY HH:mm:ss") }}
      </template>

      <template v-slot:cell(name)="row">
        {{ row.value }}
        <font-awesome-icon 
          icon="edit"
          class="cursor-pointer"
          @click="openUpdateNameModal(row.item)" />
      </template>

      <template v-slot:cell(in_alert)="row">
        <b-form-checkbox 
          v-model="row.value" 
          name="check-button" 
          switch
          @change="updateAlert(row.item, !row.value)"
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

    <UpdateNameModal 
      ref="update_name_modal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { api_url } from '@/helpers/api_url'
import UpdateNameModal from "@/components/Devices/UpdateName"

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
          key: 'authorized',
          label: 'Autorizado'
        },
        {
          key: 'in_alert',
          label: 'Em Alerta'
        }
      ],
      devices: []
    }
  },
  created() {
    this.getDevices();
  },
  components: {
    UpdateNameModal
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
    updateAlert(device, new_status) {
      axios.put(`${api_url}/api/devices/${device.id}.json`, {
        in_alert: new_status
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
    },
    openUpdateNameModal(device) {
      this.$refs.update_name_modal.showModal(device);
    }
  }
}
</script>

<style>

</style>