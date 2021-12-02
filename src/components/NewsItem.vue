<template>
    <div class="news-item-wrapper" v-if="item">
        <h2 v-if="date" class="date-heading">
            {{formatedDate}}
        </h2>
        <div class="news-item"
             ref="newsItem"
             @mouseover="isHovering = true"
             @mouseleave="isHovering = false"
             :class="{hovered: isHovering}"
        >

            <div class="news-image">
                <a :href="item.url" target="_blank">

                </a>
                <div class="news-image-holder" :style="{backgroundImage: `url(${item.urlToImage})`}">
                    <h2>
                        {{item.title}}
                    </h2>
                    <p v-if="!item.scrolled" class="new-item">
                        NEW
                    </p>
                </div>
            </div>
            <div class="item-text">
                <p>
                    {{new Date(item.publishedAt).toLocaleDateString()}}
                    <br>{{formatTime(item.publishedAt)}}
                </p>
                <p v-html="item.description">

                </p>
                <a :href="item.url" target="_blank">
                    Read more
                </a>
            </div>
        </div>
    </div>

</template>

<script>
    import {timeAgo} from '../utils'

    export default {
        name: "NewsItem",
        props: {
            item: Object,
            date: String,
            type: String
        },
        mounted(){

        },
        created(){
            if(this.$props.type !== 'archiveNews' && this.$props.item){
                window.addEventListener('scroll', this.checkIfScrolled);
            }
            var unwatch = this.$watch('scrolled', function (val) {
                if(val && this.$props.type === 'activeNews'){
                    window.removeEventListener('scroll', this.checkIfScrolled);
                    localStorage['scrolled'] += `${this.$props.item.id} `;
                    unwatch();
                }
            });
        },
        data(){
            return {
                isHovering: false,
                scrolled: false
            }
        },
        methods:{
            formatTime(d){
                return timeAgo(new Date(d).getTime() / 1000)
            },
            checkIfScrolled(){
                const elRect = this.$refs.newsItem;

                if(elRect && elRect.getBoundingClientRect().top + elRect.getBoundingClientRect().width <= 0){
                    console.log('scrolled');
                    this.scrolled = true;
                }
            }
        },
        computed: {
            formatedDate(){
                const dateNow = new Date().toLocaleDateString();
                const dateTommorow = new Date();
                dateTommorow.setDate(dateTommorow.getDate() - 1);
                const postDate = new Date(this.$props.date).toLocaleDateString();


               if(dateNow === postDate){
                   return 'Today'
               }
               else if(postDate === dateTommorow.toLocaleDateString()){
                   return 'Tommorow'
               }
               return postDate;
            }
        }
    }
</script>

<style lang="scss">
    .date-heading{
        margin: 2rem;
    }
    .news-item{
       border-radius: 20px;
        border: 1px solid grey;
        transition: box-shadow .5s;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        margin: 0 0 3rem;
        &.hovered{
            box-shadow: 2px 4px 23px 13px rgba(59, 34, 80, 0.63);
        }
        .new-item{
            padding: .5rem;
            background: green;
            color: #fff;
            font-size: 1.5rem;
            position: absolute;
            right: 2rem;
            top: 2rem;
            z-index: 20;

        }

        .news-image{
            height: 400px;
            position: relative;
            &:before{
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .5);
                z-index: 1;
                border-radius: 20px 20px 0 0;
            }
            a{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 3;
            }
            .news-image-holder{
                border-radius: 20px 20px 0 0;
                height: 100%;
                width: 100%;
                background-size: cover;
                display: flex;
                align-items: center;
                justify-content: center;

                h2{
                    max-width: 80%;
                    color: #fff;
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }

            }
        }
        .item-text{
            padding: 3rem 2rem;
        }
    }
</style>