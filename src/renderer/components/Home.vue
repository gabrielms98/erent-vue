<template>
    <v-btn @click="cliquei">CLICA EM MIM</v-btn>
</template>

<script>
export default {
    data: () => ({
        nome: ''
    }),
    methods: {
        cliquei: function(){
            console.log("Cliquei")
        }
    },

    mounted: function(){
        this.$backend.addUsuario(usuario => {
            console.log(usuario);
        });
        
    }
}
</script>

<style>

</style>
