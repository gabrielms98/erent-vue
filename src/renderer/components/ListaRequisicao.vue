<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex xs30>
                    <h1>Requisições</h1>
                    <v-card color="#fafafa">
                        <v-card-text>
                            <v-flex xs20 v-for="req in requisicoes">
                                <v-card >
                                   <v-layout row wrap class="text-xs-center">
                                    <v-flex xs3>
                                        <v-container fill-height>
                                            <h3>{{req.titulo}}</h3>
                                        </v-container>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-container fill-height>
                                            <table>
                                                <tr>
                                                    <th>DATA DE ENTRADA</th>
                                                    <th>DATA DE SAIDA</th>
                                                </tr>
                                                <tr>
                                                    <td>{{req.entrada}}</td>
                                                    <td>UNKOWN</td>
                                                </tr>
                                            </table>
                                        </v-container>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-container>
                                            <v-avatar size="110px">
                                                <img :src="req.img">
                                            </v-avatar>
                                        </v-container>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-container>
                                            <v-btn color="red"><v-icon>delete</v-icon><span>RECUSAR</span></v-btn>
                                            <v-btn><v-icon>add</v-icon><span>MAIS INFOMAÇÕES</span></v-btn>
                                        </v-container>
                                    </v-flex>
                                   </v-layout>
                                </v-card>
                                <br>
                            </v-flex>
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
        requisicoes: []
    }),

    mounted: function(){
        this.getAllRequisicoes(Vue.prototype.$appName.id);
    },

    methods: {
        getAllRequisicoes: function(uid){
            this.$backend.getAllRequests((all_req) => {
                if(all_req == null){
                    //ERROR HANDLING
                    return;
                } else {
                    all_req.forEach(req => {
                        this.$backend.getImovelById(req.idImovel, (imovel) => {
                            if(imovel == null){
                                //ERROR HANDLING
                                return;
                            } else {
                                if(imovel.idUsuario == Vue.prototype.$appName.id){
                                    this.$backend.getUsuarioById(req.idUsuario, (user) => {
                                        if(user == null){
                                            //ERROR HANDLING
                                            return;
                                        } else {
                                            this.requisicoes.push({
                                                titulo: imovel.titulo,
                                                entrada: req.data,
                                                img: require('@/' + user.imagem)
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
            })

            // this.$backend.getAllRequests(uid, (all_req) => {
            //     if(all_req == null){
            //         //ERROR HANDLING
            //         return;
            //     } else {
            //         all_req.forEach(req => {
            //             console.log()
            //             this.$backend.getImovelById(req.idImovel, (imovel) => {
            //                 if(imovel == null){
            //                     //ERROR HANDLING
            //                     return;
            //                 } else {
            //                     this.requisicoes.push({
            //                         titulo: imovel.titulo,
            //                         entrada: req.data,
            //                         img: require('@/' + imovel.imagens)
            //                     })
            //                 }
            //             })
            //         })
            //     }
            // })
        }
    }
}
</script>

<style >
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>