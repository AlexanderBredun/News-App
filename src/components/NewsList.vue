<template>

    <div class="news-holder" ref="activeNewsHolder" v-if="newsSortedByActiveTopic.length">
        <transition-group  name="transition-list">
            <NewsItem v-for="(item, indx) in newsSortedByActiveTopic"
                      :key="item.id"
                      :item="item"
                      :date="dateByday(item, item.id, indx)"
                      :type="'activeNews'"
            ></NewsItem>
        </transition-group>
        <p v-if="!hasMorePage && newsSortedByActiveTopic.length" class="nothing-to-show">
            Has nothing more to show
        </p>

    </div>
    <div class="archive-news-holder" ref="archiveNewsHolder">
        <template v-if="archiveNews.length">
            <h2 v-if="newsSortedByActiveTopic.length">
                Archived news
            </h2>
            <NewsItem v-for="(item, indx) in archiveNewsSortedByActiveTopic"
                      :key="item.id"
                      :item="item"
                      :date="dateByday(item, item.id, indx)"
                      :type="'archiveNews'"
            ></NewsItem>
        </template>
    </div>

</template>

<script>

    import NewsItem from './NewsItem'
    import {mapState, mapGetters} from 'vuex'
    import {itemsPerPage} from '../utils'

    export default {
        name: "NewsList",
        components:{
            NewsItem
        },

        created(){
            window.addEventListener('scroll', this.handleScrollToBottom);
            if(localStorage.getItem('scrolled') !== null){
                this.$store.commit('SET_NEWS_TO_SCROLLED', {ids: localStorage.getItem('scrolled')});
                localStorage['scrolled'] = '';
            }
            else{
                localStorage.setItem('scrolled', '')
            }

            this.$store.dispatch('UPDATE_NEWS');
            clearInterval(this.refreshInterval);
            this.refreshInterval = setInterval(()=> {

                this.$store.dispatch('UPDATE_NEWS')
            }, (10000))
        },
        beforeUnmount(){
            clearInterval(this.refreshInterval)
        },
        data(){
            return {
                refreshInterval: null
            }
        },
        methods: {

            handleScrollToBottom(e){
                e.preventDefault();
                //console.log('test');
                const activeNewsSelector = this.$refs.activeNewsHolder;
                const archiveNewsSelector = this.$refs.archiveNewsHolder;

                if (this.hasMorePage && activeNewsSelector && activeNewsSelector.getBoundingClientRect().bottom <= window.innerHeight) {
                    this.$store.commit('SET_INCREASED_PAGE', {pageName: 'page'})
                }
                if (archiveNewsSelector && archiveNewsSelector.getBoundingClientRect().bottom <= window.innerHeight) {
                    this.$store.commit('SET_INCREASED_PAGE', {pageName: 'archivePage'})
                }
            }
        },

        computed: {
            ...mapState(['news', 'page', 'archiveNews']),
            ...mapGetters(['newsSortedByActiveTopic', 'archiveNewsSortedByActiveTopic']),
            hasMorePage(){

                    return this.newsSortedByActiveTopic.length >= (this.page * itemsPerPage)
            },
            dateByday(){
                return (item, id, indx)=> {

                    if(indx > 0 && new Date(item.publishedAt).toLocaleDateString() !== new Date(this.news.filter(el => el.id === id)[0].publishedAt).toLocaleDateString()){
                        return item.publishedAt
                    }
                    else if(indx === 0){
                        return item.publishedAt
                    }
                    return null;
                }
            },

        }
    }
</script>

<style lang="scss">
    .transition-list {
        position: relative;
    }

    .transition-list > * {
        transition: all 0.3s ease-out;
    }

    .transition-list-leave-active {
        position: absolute !important;
        left: 0;
        right: 0;
    }

    .transition-list-enter,
    .transition-list-leave-to {
        opacity: 0;
    }

    .transition-list-move {
        transition: transform 0.3s;
    }
    .news-holder, .archive-news-holder{
        margin: 4rem 0;

    }
    .nothing-to-show{
        font-size: 3rem;
        text-align: center;
        margin: 3rem 0;
    }
</style>