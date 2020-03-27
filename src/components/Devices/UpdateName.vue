<template>
  <b-modal 
    id="update_name" 
    title="Atualizar Nome"
    ok-title="Atualizar"
    cancel-title="Cancelar"
    @ok="updateDeviceName"
  >
    <b-form>
      <b-form-input v-model="device.name"></b-form-input>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios';
import { api_url } from '@/helpers/api_url'

export default {
  data() {
    return {
      device: {}
    }
  },
  methods: {
    showModal(device) {
      this.device = device
      this.$bvModal.show('update_name');
    },
    updateDeviceName() {
      axios.put(`${api_url}/api/devices/${this.device.id}.json`, {
        name: this.device.name
      })
      .catch(error => {
        console.log(error);
      });
    }
  } 
}
</script>