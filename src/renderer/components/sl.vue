<template>
    <v-menu  v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x>
        <v-btn slot="activator" >
            <v-icon left>expand_more</v-icon>
            <span>Filtros</span>
        </v-btn>
        <v-card>
            <v-card-title>Paçoca</v-card-title>
            <v-card-text>
                <p>FUNCIONAAAA</p>
                <p>pelo amor de deus</p>
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<v-dialog max-width="300px" id="login">
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
        </v-dialog>


<script>
export default {
    mounted: function() {
        console.log("ooooooooooooi");   
    }
}
</script>

<style>

</style>
