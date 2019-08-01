<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-card
          flat
        >
          <v-data-table
            :headers="headers"
            :items="raceResult"
            :loading="tableConfig.tableLoading"
            :no-data-text="tableConfig.noDataText"
            :rows-per-page-items="[10,20,50,100]"
            :rows-per-page-text="tableConfig.rowsPerPageText"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.position }}</td>
              <td class="text-xs-left">{{ props.item.pilotCode }}</td>
              <td class="text-xs-left">{{ props.item.pilot }}</td>
              <td class="text-xs-left">{{ props.item.turnQuantity }}</td>
              <td class="text-xs-left">{{ props.item.totalRaceTime }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    raceResult: {
      type: Array,
      required: true,
      defaultValue: []
    }
  },
  data() {
    return {
      tableConfig: {
        rowsPerPageText: 'Linhas por Página',
        noDataText: 'Sem Dados',
        tableLoading: false
      },
      headers: [
        {
          text: 'Posição',
          align: 'left',
          sortable: true,
          value: 'position'
        },
        { text: 'Código Piloto', value: 'pilotCode' },
        { text: 'Piloto', value: 'pilot' },
        { text: 'Qtde Voltas Completadas', value: 'turnQuantity' },
        { text: 'Tempo Total de Prova', value: 'totalRaceTime' },
      ]
    }
  },
  // created() {
  //   this.getRaceData()
  // },
  methods: {
    // async getRaceData() {
    //   this.tableConfig.tableLoading = true
    //   try {
    //     const response = await axios.get(`${process.env.API_HOST}/race/result/test`)
    //     this.raceResult = response.data.body
    //     this.tableConfig.tableLoading = false
    //   } catch (error) {
    //     console.error(error)
    //     this.tableConfig.tableLoading = false
    //   }
    // }
  }
}
</script>
