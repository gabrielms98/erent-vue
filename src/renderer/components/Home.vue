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
        this.$backend.addUsuario({
            login: "gabrielms98",
            senha: "ricsoncuzao",
            nome: "gb",
            sobrenome: "batata",
            email: "gmbiel1@gmail.com",
            imagem: __dirname + "/assets/foto.png",
            cpf: "13747530680",
            documento: "25cm",
            selfie: __dirname + "/assets/foto2.png"
        }, (created) => {
            console.log(created);
        });
        
    }
}
</script>

<style>

</style>
