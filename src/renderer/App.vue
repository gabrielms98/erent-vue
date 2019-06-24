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
        <span class="title ml-3 mr-5">eRent</span>
        <v-spacer></v-spacer>
        <v-btn icon flat>
          <v-icon :color="color_notification">{{notification_icon}}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
  <div id="app" v-else  class="back">
    <v-app id="inspire">
      <div align="right" style="vertical-align: top; margin-right: 5px;">
        <v-btn flat icon>Cadastrar</v-btn>
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
                <v-text-field v-model="username" prepend-icon="person" name="login" label="CPF" type="text" @keyup.enter.native="Login"></v-text-field>
                  <v-text-field v-model="pwd" id="password" prepend-icon="lock" name="password" label="Senha" type="password" @keyup.enter.native="Login"></v-text-field>
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
          <v-layout align-center justify-center>
            <v-flex xs30 sm24 md8>
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
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      pesquisa: '',
      color_primary: '#7b6ff9',
      session: false,
      username: '',
      pwd: '',
      menu_login: '',
      filtros: [
        {text: 'Cidade'},
        {text: 'Quarto'},
        {text: 'Tipo'}
      ],
      selected: '',
      tipo_filtro: '',
      items: [
        { icon: 'search', text: 'Pesquisar', to: '/Pesquisar' },
        { icon: 'touch_app', text: 'Requisições' },
        { divider: true },
        { icon: 'archive', text: 'Meus Anúncios' },
        { icon: 'local_offer', text: 'Meus Alugados' },
        { icon: 'local_grocery_store', text: 'Meus Alugueis'},
        { divider: true },
        { icon: 'person', text: 'Perfil' },
        { icon: 'notifications', text: 'Notificações'},
      ],
      new_notification: false,  
      notification_icon: 'notifications',
      color_notification: 'black'
    }),
    props: {
      source: String 
    },
    mounted: function(){
      this.notification_icon = this.new_notification ? 'notifications_active' : 'notifications';
      this.color_notification = this.new_notification ? 'red' : 'black';
    },
    methods: {
      select: function(filtro){
        this.selected = filtro;
        this.session = true;
        this.$router.push('/Pesquisa' + this.selected);
      },

      login: function(){
        this.session = true;
        this.$router.push('/');
      },

      logout: function(){
        this.session = false;
      }
    }
  }
</script>

<style>
  .back {
    background-image: url(./assets/showroom.jpg);
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
