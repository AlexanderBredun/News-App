<template>
    <select>
        <option v-for="option in options"
                :key="option.id"
                :disabled="option.disabled"
                :selected="option.disabled"
        >
        {{option.name}}
        </option>
    </select>
</template>

<script>
    export default {
        name: "SelectForFilter",
        props: {
            options: Array
        }
    }
</script>

<style scoped>

</style>