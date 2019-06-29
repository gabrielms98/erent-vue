<template>
  <div>
    <v-container justify-center fill-height>
      <v-layout row wrap>
        <v-flex>
          <h1> Contratos</h1>
          <v-card>
            <v-card-text>
              <v-data-table
              v-model="selected"
              :headers="headers"
              :items="items"
              :pagination.sync="pagination"
              item-key="id"
              class="elevation-1"
              rows-per-page-text="Linhas por página"
              :rows-per-page-items="rowsppitems"
              >
                  <template slot="items" slot-scope="props">
                      <tr>
                          <td>{{props.item.titulo}}</td>
                          <td>{{props.item.data}}</td>
                          <td><v-icon :title="props.item.stat">{{props.item.status}}</v-icon></td>
                          <td><v-btn @click="contrato(props.item.id_contrato)"><v-icon>create</v-icon><span>contrato</span></v-btn></td>
                          <!-- <td><v-btn @click="show(props.item)" flat icon><v-icon>delete</v-icon></v-btn></td> -->
                      </tr>
                  </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data: () => ({
    pagination: {
        sortBy: "name"
    },
    rowsppitems: [10, 25, 50, { text: "Tudo", value: -1 }],
    selected: [],
    headers: [
    {
        text: "Titulo",
        align: "left",
        value: "titulo"
    },
    {
        text: "Data Entrada",
        value: "data"
    },
    {
        text: "Locador",
        value: "locador"
    },
    {
        text: "Locatário",
        value: "locatario"
    },
    {
        text: "Pagamento",
        value: "pagamento"
    },
    {
        text: "Valor",
        value: "valor"
    },
    {
        text: "",
        value: "actions"
    }
    ],
    items: []
  }),

  mounted: function(){
    this.getAllContratos();
  },

  methods: {
    getAllContratos: function(){
      this.items = [];
      this.$backend.getAllContratosByUser(Vue.prototype.$appName.id, (all_contratos) => {
        if(all_contratos == null){
          return;
        }else{
          all_contratos.forEach(all => {
            this.items.push({
              titulo: all.titulo,
              data: all.data
            })
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
