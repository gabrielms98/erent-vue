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
                          <td>{{props.item.locador}}</td>
                          <td>{{props.item.locatario}}</td>
                          <td>{{props.item.metodo_pagamento}}</td>
                          <td>{{props.item.valor}}</td>
                          <td><v-btn @click="contrato(props.item.id_contrato)"><v-icon>create</v-icon><span>contrato</span></v-btn></td>
                          
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
    this.getAllContratosDono();
  },

  methods: {
    getAllContratos: function(){
      this.items = [];
      this.$backend.getAllContratosByUser(Vue.prototype.$appName.id, (all_contratos) => {
        if(all_contratos == null){
          return;
        }else{
          all_contratos.forEach(all => {
            this.$backend.getImovelById(all.idImovel, (imovel) => {
              if(imovel == null){
                return;
              } else {
                this.$backend.getNameUserById(imovel.idUsuario, (name) =>{
                  this.items.push({
                    titulo: imovel.titulo,
                    data: all.data,
                    metodo_pagamento: (all.metodoPagamento == 1) ? 'Boleto' : 'Cartão',
                    locador: name,
                    locatario: Vue.prototype.$appName.nome + " " + Vue.prototype.$appName.sobrenome,
                    valor: imovel.valor
                  })
                });


              }
            })
          })
        }
      })
    },

    getAllContratosDono: function(){
      this.$backend.getAllImovelByUser(Vue.prototype.$appName.id, (all) => {
        if(all == null){
          return;
        } else {
          all.forEach((imovel) => {
            this.$backend.getAllContratosByIdImovel(imovel.id, (contratos) => {
              if(contratos == null){
                return;
              } else {
                contratos.forEach((contrato) => {
                  this.$backend.getNameUserById(contrato.idUsuario, (name) =>{
                    this.items.push({
                      titulo: imovel.titulo,
                      data: contrato.data,
                      metodo_pagamento: (all.metodoPagamento == 1) ? 'Boleto' : 'Cartão',
                      locador: Vue.prototype.$appName.nome + " " + Vue.prototype.$appName.sobrenome,
                      locatario: name, 
                      valor: imovel.valor
                    })  
                  });
                })
              }
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
