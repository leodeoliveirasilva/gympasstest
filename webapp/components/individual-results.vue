<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-data-iterator
      :items="raceResult"
      :no-data-text="tableConfig.noDataText"
      :rows-per-page-text="tableConfig.rowsPerPageText"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title>
              <h4>{{ props.item.pilotCode }} - {{ props.item.pilot }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Colocação:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.position }}º</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Tempo Total de Corrida:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.totalRaceTime }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Horário do Término:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.raceEndTime }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Voltas Completadas:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.turnQuantity }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Velocidade Média:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.averageSpeed }} Km/h</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: {
    raceResult: {
      type: Array,
      required: true,
      defaultValue: []
    }
  },
  data: () => ({
    tableConfig: {
      rowsPerPageText: 'Linhas por Página',
      noDataText: 'Sem Dados'
    },
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      }
    ]
  })
}
</script>
