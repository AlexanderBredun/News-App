<template>
    <div class="find-in-news">
        <input type="text" placeholder="Find your news..."
               @focus="fieldInFocus = true"
               @blur="fieldInFocus = false"
               :class="{expanded: fieldInFocus}"

        >
        <i class="fas fa-search ico-search"></i>
    </div>
</template>

<script>
    export default {
        name: "FindInNewsBar",
        data(){
            return {
                fieldInFocus: false
            }
        }
    }
</script>

<style lang="scss">
    .find-in-news{
        max-width: 70rem;
        width: 100%;
        position: relative;
        height: 5rem;
        margin: 0 0 0 5rem;

        input{
            width: 20rem;
            margin: 0 0 auto auto;
            display: block;
            transition: .5s;
            height: 100%;
            border-radius: 30px !important;
            border: 1px solid black;
            padding: 0 5rem 0 2rem;
        }
        .expanded{
            width: 100%;
        }
        .ico-search{
            position: absolute;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            right: 2rem;
            cursor: pointer;

        }
    }

</style>