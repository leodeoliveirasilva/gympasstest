<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container
      fluid
      grid-list-md
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-textarea
            name="logText"
            :rules="logRules"
            label="Cole o log da corrida aqui"
            v-model="logRace"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-btn
            :disabled="!valid"
            dark
            :v-loading="loading"
            color="cyan"
            @click="validate"
          >
            Enviar
          </v-btn>

          <v-btn
            color="error"
            @click="reset"
          >
            Limpar
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    logRace: '',
    loading: false,
    raceResult: [],
    valid: true,
    logRules: [
      v => !!v || 'Log é obrigatório'
    ]
  }),
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const response = await
          axios.post(`${process.env.API_HOST}/race/result`, {
            logData: this.logRace
          })
          this.loading = false
          this.$emit('logResult', response.data.body)
        } catch (error) {
          console.error(error)
          this.loading = false
        }
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
