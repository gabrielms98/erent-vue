<template>
  <div id="app" v-if=session  class="back">
    <v-app id="keep">
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        class="grey lighten-4"
        app
      
      >
        <v-list
          dense
          class="grey lighten-4"
        >
          <template v-for="(item, i) in items">
            <v-layout
              v-if="item.heading"
              :key="i"
              row
              align-center
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-3"
            ></v-divider>
            <v-list-tile
              v-else
              :key="i"
              :to="item.to"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <br></br>
          <v-flex xs8 class="text-xs-right">
            <v-btn class="grey--text" @click="logout">LOGOUT</v-btn>
          </v-flex>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar :color="color_primary" app absolute clipped-left> 
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">&nbsp&nbsp&nbsp<v-btn flat icon @click="home" class="custom_btn"><img src="@/assets/erent-logo-btn.png" width="100px"></v-btn></span>
        <v-spacer></v-spacer>
        <div>
          <v-badge v-model="show" overlap :color="color_notification">
            <span v-if="new_notification" slot="badge" :color="color_notification">{{n_notf}}</span>
            <v-menu :close-on-content-click="false" :nudge-width="200" offset-x v-model="notification_badge">
              <v-btn slot="activator" class="ma-0" icon flat>
                <v-icon :color="color_notification" size="35px">{{notification_icon}}</v-icon>
              </v-btn>
              <v-card>
                <v-card-title height="10px">
                  <v-checkbox @click="allRead" v-model="all_read" label="Marcar todos como lido"></v-checkbox>
                </v-card-title>
                <div v-for="n in notification_list">
                  <hr>
                  <v-btn flat >{{n.conteudo}}</v-btn>
                </div>
              </v-card>
            </v-menu>
          </v-badge>
        </div>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
  <div id="app" v-else-if="!cadastrar"  class="back">
    <v-app id="inspire">
      <div align="right" style="vertical-align: top; margin-right: 5px;">
        <v-btn flat icon @click="register">Cadastrar</v-btn>
        &nbsp&nbsp&nbsp&nbsp |&nbsp
        <v-menu
        v-model="menu_login"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        >
        <v-btn flat icon slot="activator">Entrar</v-btn>
        <v-card>
            <v-card-text>
              <v-form>
                <v-text-field v-model="username" prepend-icon="person" name="login" label="CPF" type="text" @keyup.enter.native="login"></v-text-field>
                  <v-text-field v-model="pwd" id="password" prepend-icon="lock" name="password" label="Senha" type="password" @keyup.enter.native="login"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="color_primary" @click="login">Entrar</v-btn>
              </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <v-content>
        <v-container fluid fill-height grid-list-md text-xs-center>
          <v-layout style="margin-top: 100px;" justify-center>
            <v-flex xs30 sm24 md8>
              <img src="@/assets/erent-logo.png" style="margin-bottom: 50px; color: transparent; color: red;">
              <v-card class="elevation-12">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs14 sm10>
                    <v-text-field
                      solo-inverted
                      flat
                      hide-details
                      label="Search"
                      prepend-inner-icon="search"
                      v-model="pesquisa"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs14 sm2>
                      <v-menu>
                        <v-btn slot="activator" >
                          <v-icon left>expand_more</v-icon>
                          <span>Filtros</span>
                        </v-btn>
                        <v-list>
                          <v-list-tile v-for="filtro in filtros" :key="filtro.text" @click="select(filtro.text)" >
                            <v-list-tile-title>{{filtro.text}}</v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
  <div v-else-if="cadastrar" id="app" class="back">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height class="back">
          <v-layout row wrap justify-center>
            <v-flex xs10 justify-center>
              <v-card>
                <v-toolbar dark :color="color_primary">
                  <v-toolbar-title> <h3>Cadastro de usuário</h3></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="voltar" flat icon><v-icon>undo</v-icon></v-btn>
                </v-toolbar>
                <v-spacer></v-spacer>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-layout row wrap>
                        <v-flex xs12 sm6>
                          <v-text-field v-model="cadastro_user"   label="Usuario"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_senha"    label="Senha"  type="password"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_email"  :rules="emailRules"  label="E-mail"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_name"  :rules="nameRules"  :counter="40" label="Nome"  type="text"  required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_rua"    label="Rua"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_num"    label="Numero"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_bairro"    label="Bairro"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_cidade"    label="Cidade"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_estado"    label="Estado"  type="text"  required  ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field  v-model="cadastro_cep"    label="CEP"  type="number"  required  ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer><v-spacer></v-spacer>
                  <v-btn :disabled="!valid" @click="submit">Cadastrar</v-btn>
                  <v-btn @click="clear">clear</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue'
import { remote } from 'electron'
import { setInterval } from 'timers';
  export default {
    data: () => ({
      el: '#app',
      drawer: null,
      pesquisa: '',
      show: true,
      cadastrar: false,
      color_primary: '#7b6ff9',
      session: false,
      username: '',
      pwd: '',
      menu_login: '',
      notification_badge: '',
      filtros: [
        {text: 'Cidade'},
        {text: 'Quarto'},
        {text: 'Tipo'}
      ],
      selected: '',
      tipo_filtro: '',
      items: [
        { icon: 'search', text: 'Pesquisar', to: '/Pesquisar' },
        { icon: 'touch_app', text: 'Requisições', to: '/ListaRequisicao' },
        { divider: true },
        { icon: 'local_offer', text: 'Meus Anúncios' },
        { icon: 'local_atm', text: 'Meus Alugados' },
        { icon: 'local_grocery_store', text: 'Meus Alugueis'},
        { divider: true },
        { icon: 'person', text: 'Perfil' },
        { icon: 'notifications', text: 'Notificações'},
      ],
      new_notification: false,
      notification_icon: 'notifications',
      notification_list: [],
      color_notification: 'grey',
      n_notf: 0,
      all_read: false
    }),
    props: {
      source: String
    },
    mounted: function(){
      setInterval(this.checkNotf, 5000);
      this.change_notification();
    },
    methods: {
      select: function(filtro){
        this.selected = filtro;
        this.session = true;
        this.$router.push('/Pesquisa' + this.selected);
      },

      login: function(){
        this.$backend.getUsuarioByCPF(this.username, user => {
          if(user == null){
            remote.dialog.showMessageBox({type: 'warning', title: '', message: ''});
            return;
          } else {
            Vue.prototype.$appName = user;

            console.log(user);

            this.$backend.getAllNotificationsUser(user.id, all => {
              if(all.length == 0){
                return;
              } else {
                this.n_notf =0;
                all.forEach(notf => {
                  if(notf.visualizado == 0){
                    this.n_notf++;
                    this.notification_list.push({
                      conteudo: notf.conteudo,
                    })
                    this.new_notification = true;
                  }
                });
                this.change_notification();
              }
            });

            this.session = true;
            this.$router.push('/'); 
          }
        });
      },

      logout: function(){
        this.session = false;
      },

      register(){
        this.cadastrar = true;
      },

      voltar: function(){
        this.cadastrar = false;
      },

      home: function(){
        this.checkNotf();
        this.$router.push('/');
      },
      
      change_notification: function(){
        this.notification_icon = this.new_notification ? 'notifications_active' : 'notifications';
        this.color_notification = this.new_notification ? 'red' : 'black';
      },

      checkNotf: async function(){
        //this.notification_list = [];
        this.$backend.getAllNotificationsUser(Vue.prototype.$appName.id, all => {
          if(all.length == 0){
            return;
          } else {
            this.notification_list = [];
            this.new_notification = false;
            this.n_notf=0;
            all.forEach(notf => {
              if(notf.visualizado == 0){
                this.n_notf++;
                this.notification_list.push({
                  conteudo: notf.conteudo,
                });
                this.new_notification = true;
              }
            });
            this.change_notification();
          }
        });

      },

      allRead: function(){
        if(this.all_read == true){
          //MARCAR TODAS NOTIFICACOES COMO LIDAS
          this.$backend.markAllAsRead(Vue.prototype.$appName.id, () => {
            this.all_read = false;
            this.home();
          });
        }
      },
    }
  }
</script>

<style>
  .back {
    background-image: url(./assets/showroom-blur.jpg);
    background-size: cover;
 
  }
  #inspire {
    background: none;
  }
  #keep {
    background: none;
  }
  .v-dialog {
    position: absolute;
    top: 15px;
    right: 15px;
  }
</style>
