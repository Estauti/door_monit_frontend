<template>
  <div>
    <b-row>
      <b-col xl=6 lg=6>
        <DevicesGrid />        
      </b-col>

      <b-col xl=6 lg=6>
        <LastAlerts />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DevicesGrid from './DevicesGrid'
import LastAlerts from './LastAlerts'

export default {
  components: {
    DevicesGrid,
    LastAlerts
  }
}
</script>

<style>
</style>