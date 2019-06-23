<template>
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
</template>

<script>
  import SystemInformation from './WelcomeView/SystemInformation'
  import { remote } from 'electron'
  export default {
    name: 'welcome',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
