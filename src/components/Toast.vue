<template>
    <div  class="toast-notif" :class="message.status">
        {{message.text}}
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props: ['message'],
        emits:['onHide'],
        mounted(){
            setTimeout(()=> this.$store.commit('DISABLE_TOAST_MESSAGE'), 2000);
        }
    }
</script>

<style lang="scss">
    .toast-notif{
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 2rem 1rem;
        background: darkslateblue;
        color: #fff;
        font-size: 1.6rem;
        width: 30rem;
        z-index: 100000;
        border-radius: 20px;
        text-align: center;
        &.warning{
            background: darkorange;
        }
        &.success{
            background: green;
        }
    }
</style>