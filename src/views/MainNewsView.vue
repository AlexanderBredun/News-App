<template>

    <AddNews
            :loading="loading"
            @loadTopicNews="loadTopicNews"
    ></AddNews>
    <TagCloud
            :newsTopics="newsTopics"
            :activeTopics="sortByTopic"
            @setActiveTopic="setActiveTopic"
            @removeTopic="removeTopic"
    ></TagCloud>
    <NewsList v-if="news.length"></NewsList>

    <div v-else class="empty-news">
        <i class="fas fa-battery-empty"></i>
        <h2>
            You dont have news, add some by entering title to field and pressing enter
        </h2>
    </div>
</template>

<script>
    import NewsList from '../components/NewsList'
    import TagCloud from '../components/TagCloud'
    import AddNews from '../components/AddNews'

    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "MainNewsView",
        components: {
            NewsList,
            TagCloud,
            AddNews
        },
        data(){
            return {
                loading: false,
            }
        },
        methods: {
            loadTopicNews(e){
                this.loading = true;
                this.$store.dispatch('FETCH_NEWS', {query: e.target.value})
                    .then(() =>  {
                        this.loading = false;
                        const message = {
                            text: 'Added!',
                            status: 'success'
                        };
                        this.$store.commit('SET_TOAST_MESSAGE', {message});
                        e.target.value = ''
                    })
                    .catch(e => {
                        this.loading = false;
                        const message = {
                            text: e.message,
                            status: 'warning'
                        };
                        this.$store.commit('SET_TOAST_MESSAGE', {message});
                        console.log(this.$store.state.messageToast);
                    })
            },
            setActiveTopic(topic){
                this.$store.commit('SET_TOPIC_TO_SORT_OF', {topic});
                this.$store.commit('SET_TO_FIRST_PAGE')
            },
            removeTopic(topic){
                this.$store.commit('SET_NEWS_WITHOUT_TOPIC', {topic})
            },
        },
        computed:{
            ...mapState(['news', 'topicsResultsNumber', 'sortByTopic']),
            ...mapGetters(['newsTopics']),

        },
    }
</script>

<style lang="scss">

</style>