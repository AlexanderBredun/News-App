<template>
    <div class="add-news-topic">
        <Spinner v-if="loading" :styles="{position: 'absolute', top: '50%', transform: 'translate3d(0, -50%, 0)', right: '2rem'}"></Spinner>
        <input type="text" placeholder="Add news by topic...."
               @keyup.enter="$emit('loadTopicNews', $event)"
               :class="{blockField: loading}"
               :disabled="loading"
        >
    </div>
</template>

<script>
    import Spinner from './Spinner'
    export default {
        name: "AddNews",
        components: {
            Spinner
        },
        emits:['loadTopicNews'],
        props: {
            loading: Boolean
        }
    }
</script>

<style lang="scss">
    .add-news-topic{
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
        position: relative;
        input{
            margin: 0 auto;
            display: block;
            width: 100%;
            height: 6rem;
            border: 1px solid #000;
            border-radius: 20px;
            color: black;
            padding: 0 3rem;

            font-size: 3rem;

            &.blockField{
                user-select: none;
                pointer-events: none;
            }
        }
    }
</style>