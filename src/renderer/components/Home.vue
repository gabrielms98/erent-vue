<template>
    <v-btn @click="cliquei">CLICA EM MIM</v-btn>
</template>

<script>
import Vue from 'vue'
export default {
    data: () => ({
        nome: ''
    }),
    methods: {
        cliquei: function(){
            console.log(Vue.prototype.$appName);
        }
    },

    mounted: function(){
        
    }
}
</script>

<style>

</style>
