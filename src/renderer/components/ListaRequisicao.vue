<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex xs30>
                    <h1>Requisições recebidas</h1>
                    <v-card color="#fafafa">
                        <v-card-text v-if="noreq">
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
                                            <br>
                                            <v-icon color="amber" v-for="i in 5">star</v-icon>
                                        </v-container>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-container>
                                            <v-btn style="margin-top: 20px;" color="red"><v-icon>delete</v-icon><span>RECUSAR</span></v-btn>
                                            <v-dialog max-width="1000" v-model="dialog_req">
                                                <v-btn slot="activator" @click="salvaUser(req)"><v-icon>add</v-icon><span>MAIS INFOMAÇÕES</span></v-btn>
                                                <v-card>
                                                    <v-card-title>
                                                        Informações da Requisição do apartamento: &nbsp<h4>{{titulo}}</h4>
                                                        <v-spacer></v-spacer>
                                                        <v-btn flat icon @click="dialog_req = false">x</v-btn>
                                                        </v-card-title>
                                                    <v-card-text >
                                                        <v-layout row wrap>
                                                        <v-flex xs4>
                                                            <v-container fill-height>
                                                                <v-avatar size="150">
                                                                    <img :src="imagem">
                                                                </v-avatar>
                                                            </v-container>
                                                        </v-flex>
                                                        <v-flex xs4>
                                                            <v-container fill-height>
                                                                <ul>
                                                                    <li><h3>Nome: {{nome}}</h3></li>
                                                                    <li><h3>Usuario: {{usuario}}</h3> </li>
                                                                    <li><h3>CPF: {{cpf}}</h3></li>
                                                                    <li><h3>Email: {{email}}</h3></li>
                                                                </ul>
                                                            </v-container>
                                                        </v-flex>
                                                        <v-flex xs4>
                                                            <v-container fill-height>
                                                                <table>
                                                                    <tr>
                                                                        <th>DATA DE ENTRADA</th>
                                                                        <th>DATA DE SAIDA</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>{{entrada}}</td>
                                                                        <td>UNKOWN</td>
                                                                    </tr>
                                                                </table>
                                                            </v-container>
                                                        </v-flex>
                                                        </v-layout>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="green" @click="aceitar"><v-icon>done</v-icon><span>aceitar</span></v-btn>
                                                        <v-btn color="red"><v-icon>delete</v-icon><span>recusar</span></v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-container>
                                    </v-flex>
                                   </v-layout>
                                </v-card>
                                <br>
                            </v-flex>
                        </v-card-text>
                        <v-card-text v-else>
                          <v-container fill-height>
                            <v-layout row wrap justify-center>
                                <h4><v-icon>report</v-icon><span> &nbsp Você não possui requisições</span></h4>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

                <v-container>
            <v-layout>
                <v-flex xs30>
                    <h1>Requisições feitas</h1>
                    <v-card color="#fafafa">
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Vue from 'vue'
import { remote } from 'electron'
export default {
    data: () => ({
        requisicoes: [],
        seila: false,
        dialog_req: false,
        titulo: '',
        nome: '',
        usuario: '',
        email: '',
        imagem: '',
        entrada: '',
        cpf: '',
        req_id: '',
        user_id: '',
        show: true
    }),

    mounted: function(){
        this.getAllRequisicoes(Vue.prototype.$appName.id);
    },

    methods: {
        getAllRequisicoes: function(uid){
            this.$backend.getAllRequests((all_req) => {
                if(all_req.length == 0){
                    this.noreq = false;
                    return;
                } else {
                    this.noreq = true;
                    all_req.forEach(req => {
                        this.$backend.getImovelById(req.idImovel, (imovel) => {
                            if(imovel == null){
                                //ERROR HANDLING
                                return;
                            } else {
                                if(imovel.idUsuario == Vue.prototype.$appName.id){
                                    this.$backend.getUsuarioById(req.idUsuario, (user) => {
                                        console.log(user);
                                        if(user == null){
                                            //ERROR HANDLING
                                            return;
                                        } else {
                                            this.requisicoes.push({
                                                titulo: imovel.titulo,
                                                entrada: req.data,
                                                img: require('@/' + user.imagem),
                                                user_nome: user.nome + " " + user.sobrenome,
                                                user_cpf: user.cpf,
                                                user_usr: user.login,
                                                user_email: user.email,
                                                id: req.id,
                                                user_id: user.id
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
            })
        },

        salvaUser: function(req){
            console.log(req);
            this.titulo = req.titulo;
            this.nome = req.user_nome;
            this.email = req.user_email;
            this.usuario = req.user_usr;
            this.cpf = req.user_cpf;
            this.imagem = req.img;
            this.entrada = req.entrada;
            this.req_id = req.id;
            this.user_id = req.user_id;
        },

        aceitar: function(req){
            remote.dialog.showMessageBox({type: 'warning', title:'Você tem certeza? ', message: 'Você tem certeza de que aceita essa requisição? Uma vez aceitada será gerado o contrato para o requerinte confirmar o pagamente e o aluguel!',
                                        buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx) => {
                                            if(idx==0){
                                                this.sendNotification(req);
                                            }
                                        });
        },

        recusar: function(req){

        },

        sendNotification: function(){
            this.$backend.addNotificacao({
                conteudo: 'Requisição aceita!',
                data: this.entrada,
                visualizado: false,
                idUsuario: this.user_id
            }, (notf) => {
                if(notf == null){
                    //ERROR HANDLING
                    return;
                } else {
                    console.log("notf: ");
                    console.log(notf);
                }
            })
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
