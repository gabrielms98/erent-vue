<template>
    <p>HOME</p>
</template>

<script>
export default {
    mounted: function(){
        this.$backend.addUsuario(usuario => {
            console.log(usuario);
        });
        
    }
}
</script>

<style>

</style>
