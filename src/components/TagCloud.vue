<template>
    <div class="added-topics">

          <p v-for="topic in newsTopics"
                :key="topic.id"
          >
              <span
                      class="text"
                      @click="$emit('setActiveTopic', topic.query)"
                      :class="{active: isActiveTopic(topic.query) }"
              >{{topic.query}}</span><span class="ico"><i @click="$emit('removeTopic', topic.query)" class="far fa-times-circle"></i></span>

          </p>
    </div>
</template>

<script>
    export default {
        name: "TagCloud",
        emits:['setActiveTopic', 'removeTopic'],
        props: {
            newsTopics: Array,
            activeTopics: Array
        },
        methods: {
            isActiveTopic(query){
                return this.$props.activeTopics.includes(query)
            }
        },

    }
</script>

<style lang="scss">
    .added-topics{
        width: 100%;
        padding: 2rem 4rem;
        p{
            display: inline-block;
            margin: 0 1rem 1rem 0;
            padding: 0;

            font-size: 1.4rem;
            border-radius: 20px;
            border: 1px solid black;
            box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
            cursor: pointer;
            transition: .4s;
            &:hover{
                box-shadow: 2px 4px 23px 0px rgba(59, 34, 80, 0.63);
            }

            .text{
                border-radius: 20px 0 0 20px;
                padding: .5rem 1rem;
                display: inline-block;
                height: 100%;
                border-right: 1px solid #000;
                transition: .4s;
                &:hover{
                    background: #000;
                    color: #fff;
                }
                &.active{
                    background: #000;
                    color: #fff;
                    span{
                        border-right: 1px solid #fff;
                    }

                }
            }
            .ico{
                padding: .5rem 1rem;
                border-radius: 0 20px 20px 0;
                display: inline-block;
                transition: .4s;
                &:hover{
                    background: #000;
                    color: #fff;
                }
            }

        }
    }
</style>