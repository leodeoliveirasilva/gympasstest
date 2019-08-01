<template>
  <v-card color="cyan">
    <v-tabs
      v-model="active"
      centered
      color="cyan"
      dark
      icons-and-text
    >
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab href="#tab-1">
        Input de Log
        <v-icon>fas fa-file</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        Colocação
        <v-icon>fas fa-flag-checkered</v-icon>
      </v-tab>
      <v-tab href="#tab-3">
        Avaliação Individual
        <v-icon>account_box</v-icon>
      </v-tab>

      <v-tab-item :value="'tab-1'">
        <v-card flat>
          <log-input @logResult="onLogResult" />
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-2'">
        <v-card flat>
          <race-table :raceResult="raceResult" />
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-3'">
        <v-card flat>
          <individual-results :raceResult="raceResult" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import raceTable from '@/components/race-table'
import individualResults from '@/components/individual-results'
import logInput from '@/components/log-input'

export default {
  components: {
    raceTable,
    individualResults,
    logInput
  },
  head() {
    return {
      title: 'Resultados da Corrida'
    }
  },
  data() {
    return {
      active: null,
      raceResult: []
    }
  },
  methods: {
    next() {
      this.active = 'tab-2'
    },
    onLogResult(logResult) {
      this.raceResult = logResult
      this.next()
    }
  }
}
</script>
