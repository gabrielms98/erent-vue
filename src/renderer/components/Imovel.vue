<template>
    <div>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex xs30>
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap>
                                <v-flex d-flex xs12 sm6 md8>
                                    <img :src="primary_image" width="580px" height="300px" alt="">
                                </v-flex>
                                <v-flex d-flex xs12 sm6 md4 >
                                    <v-layout row wrap>
                                        <v-flex d-flex >
                                            <img @click="change_primary_image(imgs[0], 0)" :src="imgs[0]" height="150px" width="100px">
                                        </v-flex>
                                        <v-flex d-flex >
                                            <img @click="change_primary_image(imgs[1], 1)" :src="imgs[1]" height="150px" width="100px">
                                        </v-flex>
                                        <v-flex d-flex >
                                            <img @click="change_primary_image(imgs[2], 2)" :src="imgs[2]" height="142px" width="100px">
                                        </v-flex>
                                            <v-flex d-flex >
                                            <img @click="change_primary_image(imgs[3], 3)" :src="imgs[3]" height="142px" width="100px">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                    </v-card>
                    <br>
                    <v-card>
                      <v-card-title>
                          <h2>{{titulo}}</h2>
                      </v-card-title>
                      <v-card-text>
                          <v-layout row wrap>
                              <v-flex xs12 sm6 md8>
                                  <v-card>
                                      <v-card-title>
                                            <h3>R${{preco}}</h3>
                                            <v-spacer></v-spacer>
                                            <v-dialog
                                            v-model="dialog_request"
                                            max-width="600px"
                                            >
                                            <v-btn slot="activator" :color="color_primary">REQUISITAR</v-btn>
                                            <v-card style="max-width: 610px;">
                                                <v-card-title>
                                                    <p><h3>Selectione o período que deseja alugar o apartamento.</h3></p>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-spacer></v-spacer>
                                                    <v-date-picker v-model="inicio" :color="color_primary"></v-date-picker>
                                                    <v-spacer></v-spacer>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="request" :color="color_primary">REQUISITAR</v-btn>
                                                    <v-spacer></v-spacer>
                                                </v-card-actions>
                                            </v-card>
                                          </v-dialog>
                                      </v-card-title>
                                      <v-card-text>
                                          <h3>Descrição: </h3>
                                          {{descricao}}<br><br>
                                          <h3>Regras: </h3>
                                          {{regras}}
                                      </v-card-text>
                                  </v-card>
                              </v-flex>
                              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                              <v-flex xs12 sm6 md3 >
                                    <v-card>
                                        <v-card-title>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm10 md6>
                                                    <v-avatar size="100px">
                                                        <img :src="dono_image">
                                                    </v-avatar>
                                                </v-flex>
                                                <v-flex d-flex>
                                                    <ul>
                                                        <br>
                                                        <li>Bonito</li>
                                                        <li>Inteligente</li>
                                                        <li>Ceraroido</li>
                                                    </ul>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-title>
                                        <v-card-text>
                                            <div class="text-xs-center"><v-icon color="amber"  v-for="i in n_estrelas">star</v-icon></div>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn class="text-xs-center" :color="color_primary">CONTATO</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                  </v-card>
                              </v-flex>
                          </v-layout>
                      </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import {remote}from 'electron'
import Vue from 'vue'
export default {
    data: () => ({
        n_estrelas: 5,
        color_primary: '#7b6ff9',
        primary_image: '',
        preco: '',
        imgs: [require('@/assets/2.png'), require('@/assets/3.png'), require('@/assets/4.png'), require('@/assets/5.png')],
        descricao: '',
        regras: '',
        titulo: '',
        dono_id: '',
        dono_image: '',
        imovel_id: '',
        dialog_request: false,
        inicio: null,
    }),
    props: {
        id: {
            default: -1
        }
    },
    mounted: function(){
        this.$backend.getImovelById(this.id, imovel => {
            if(imovel == null){
                remote.dialog.showMessageBox({type: 'warning', title: 'Algo de errado não está certo', message: 'Imóvel não encontrado!'});
                this.$router.push('/');
                return;
            } else {
                this.primary_image = require('@/' + imovel.imagens);
                this.descricao = imovel.descricao;
                this.preco = imovel.valor;
                this.dono_id = imovel.idUsuario;
                this.titulo = imovel.titulo;
                this.regras = imovel.regras;
                this.imovel_id = imovel.id;

                this.$backend.getUsuarioById(this.dono_id, user => {
                    if(user == null){
                        remote.dialog.showMessageBox({type: 'warning', title: 'Algo de errado não está certo', message: 'Dono não encontrado!'});
                        this.$router.push('/');
                        return;
                    } else {
                        this.dono_image = require('@/' + user.selfie)
                    }
                })
            }
        })

    },
    methods: {
        change_primary_image: function(img, i){
            let aux = this.primary_image;
            this.primary_image = img;
            this.imgs[i] = aux;
        },

        request: function(){
            this.$backend.addRequest({
                data: this.inicio,
                idUsuario: Vue.prototype.$appName.id,
                idImovel: this.imovel_id,
                status: 2
            }, (req) => {
                if(req == null){
                    remote.dialog.showMessageBox({type: 'warning', title: 'Algo de errado não está certo', message: 'Falha ao enviar requisição\n Tente novamente mais tarde'});
                    return;
                } else {
                    this.$backend.addNotificacao({
                        conteudo: 'Solicitação de aluguel',
                        data: this.inicio,
                        idUsuario: this.dono_id
                    }, (not) => {

                    });
                    this.dialog_request = false;
                }
            })
        }
    }
}
</script>

<style>

</style>
