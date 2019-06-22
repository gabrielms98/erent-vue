<template>
  <div v-if=session>
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
              @click=""
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
            <v-btn class="grey--text">LOGOUT</v-btn>
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
        <!-- CONTENT OF THE APPLICATION ITSELF -->
      </v-content>
    </v-app>
  </div>
  <div v-else>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs24 sm24 md8>
              <v-card class="elevation-12">
                <v-card-text>
                  <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                  ></v-text-field>
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
      color_primary: '#71469b',
      session: false,
      items: [
        { icon: 'search', text: 'Pesquisar' },
        { icon: 'touch_app', text: 'Requisições' },
        { divider: true },
        { icon: 'archive', text: 'Meus Anúncios' },
        { icon: 'local_offer', text: 'Meus Alugados' },
        { icon: 'local_grocery_store', text: 'Meus Alugueis'},
        { divider: true },
        { icon: 'person', text: 'Perfil' },
        { icon: 'notifications', text: 'Notificações'},
      ],
      new_notification: true,  
      notification_icon: 'notifications',
      color_notification: 'black'
    }),
    props: {
      source: String 
    },
    mounted: function(){
      this.notification_icon = this.new_notification ? 'notifications_active' : 'notifications';
      this.color_notification = this.new_notification ? 'red' : 'black';
    }
  }
</script>

<style lang="stylus">
  #keep
    .v-navigation-drawer__border
      display: none
</style>
