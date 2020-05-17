<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      device_search_id: null,
      devices: [],
    }
  },
  mounted() {
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
    getDevices() {
      this.axios.get(`/devices.json`, {
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