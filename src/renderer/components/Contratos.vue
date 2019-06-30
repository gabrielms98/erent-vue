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
                          <td><v-icon flat >{{props.item.status}}</v-icon></td>
                          <td><v-btn @click="contrato(props.item.id_contrato)"><v-icon>create</v-icon><span>contrato</span></v-btn></td>
                          
                      </tr>
                  </template>
              </v-data-table>
            </v-card-text>
            <v-dialog max-width="1000" v-model="dialog_contrato">
              <v-card>
                <v-card-title>
                  <h3>Contrato de Aluguel de Apartamento</h3>
                  <v-spacer></v-spacer>
                  <v-btn flat icon @click="dialog_contrato = !dialog_contrato">x</v-btn>
                </v-card-title>
                <v-card-text class="scroll">
                  <div>{{lorem_ipsum}}</div>
                  <br>
                  <hr>
                  <br>
                  <div>
                    Assinatura Locatario: ________________________ 
                  </div>
                  Assinatura Locador: _________________________
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green" @click="aceitar"><v-icon>done</v-icon><span>aceitar</span></v-btn>
                  <v-btn color="red" @click="recusar"><v-icon>delete</v-icon><span>recusar</span></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
        text: "Status",
        value: "status"
    },
    {
        text: "",
        value: "actions"
    }
    ],
    items: [],
    dialog_contrato: false,
    contrato_id: '',
    lorem_ipsum: 'Pensando mais a longo prazo, a necessidade de renovação processual acarreta um processo de reformulação e modernização do retorno esperado a longo prazo. É importante questionar o quanto a mobilidade dos capitais internacionais pode nos levar a considerar a reestruturação das condições financeiras e administrativas exigidas. Evidentemente, a execução dos pontos do programa é uma das consequências dos índices pretendidos. No entanto, não podemos esquecer que o julgamento imparcial das eventualidades assume importantes posições no estabelecimento do impacto na agilidade decisória. Por conseguinte, a consolidação das estruturas desafia a capacidade de equalização de todos os recursos funcionais envolvidos. No mundo atual, a consulta aos diversos militantes possibilita uma melhor visão global dos níveis de motivação departamental. Percebemos, cada vez mais, que a percepção das dificuldades aponta para a melhoria do fluxo de informações. Todavia, a revolução dos costumes nos obriga à análise dos métodos utilizados na avaliação de resultados.  O que temos que ter sempre em mente é que a competitividade nas transações comerciais exige a precisão e a definição das novas proposições. É claro que o acompanhamento das preferências de consumo promove a alavancagem dos modos de operação convencionais. O incentivo ao avanço tecnológico, assim como o desenvolvimento contínuo de distintas formas de atuação apresenta tendências no sentido de aprovar a manutenção das condições inegavelmente apropriadas. Por outro lado, o surgimento do comércio virtual estimula a padronização do processo de comunicação como um todo. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a hegemonia do ambiente político agrega valor ao estabelecimento das diversas correntes de pensamento. Não obstante, o aumento do diálogo entre os diferentes setores produtivos causa impacto indireto na reavaliação do orçamento setorial. Neste sentido, a contínua expansão de nossa atividade talvez venha a ressaltar a relatividade dos paradigmas corporativos. Caros amigos, a valorização de fatores subjetivos garante a contribuição de um grupo importante na determinação das diretrizes de desenvolvimento para o futuro. O cuidado em identificar pontos críticos na determinação clara de objetivos cumpre um papel essencial na formulação das posturas dos órgãos dirigentes com relação às suas atribuições. Gostaria de enfatizar que a estrutura atual da organização ainda não demonstrou convincentemente que vai participar na mudança da gestão inovadora da qual fazemos parte. Ainda assim, existem dúvidas a respeito de como o fenômeno da Internet afeta positivamente a correta previsão do levantamento das variáveis envolvidas. Assim mesmo, a adoção de políticas descentralizadoras prepara-nos para enfrentar situações atípicas decorrentes das direções preferenciais no sentido do progresso.'
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
                    status: (all.status == 1) ? 'check_circle' : (all.status == 2) ? 'alarm' : 'error',
                    id_contrato: all.id
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
                      status: (contrato.status == 1) ? 'check_circle' : (contrato.status == 2) ? 'alarm' : 'error',
                      id_contrato: contrato.id
                    })  
                  });
                })
              }
            })
          })
        }
      })
    },

    contrato: function(contrato_id){
      this.dialog_contrato = true;
      this.contrato_id = contrato_id;
    },

    aceitar: function(){
      console.log(this.contrato_id);
      this.$backend.getContratoById(this.contrato_id, (contrato) => {
        if(contrato.idUsuario == Vue.prototype.$appName.id){
          this.$backend.changeContratoStatus(this.contrato_id, 1, () => {
            this.getAllContratos();
            this.getAllContratosDono();
            this.$backend.getImovelById(contrato.idImovel, (imovel) =>{
              this.$backend.addNotificacao({
                conteudo: 'Contrato Aceito!',
                data: contrato.data,
                idUsuario: imovel.idUsuario
              }, (notf) => {
                console.log(notf);
              })  
            })
            this.dialog_contrato = !this.dialog_contrato;
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
