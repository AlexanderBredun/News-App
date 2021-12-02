import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { v4 as uuidv4 } from 'uuid';

import {fetchNews} from '../services/NewsService'
//import {fetchTestNews} from '../services/TestService'
import {ZeroCount, paginationSlice, itemsPerPage, datesDiff} from '../utils'





export default createStore({
  plugins: [createPersistedState({
    paths: ['news', 'topicsResultsNumber', 'sortByTopic','archiveNews']
  })],
  state: {
    news: [],
    archiveNews: [],
    topicsResultsNumber: [],
    sortByTopic: [],
    page: 1,
    archivePage: 1,

    messageToast: null
  },
  mutations: {
    SET_NEWS: (state, {data}) => {
      data.forEach(el =>  state.news.push(el))
    },

    SET_NEWS_WITHOUT_TOPIC: (state, {topic}) => {
      state.news = state.news.filter(el => el.query !== topic)
      state.archiveNews = state.archiveNews.filter(el => el.query !== topic)
      state.topicsResultsNumber = state.topicsResultsNumber.filter(el => el.query !== topic)

      if(state.sortByTopic.length === 1 && state.sortByTopic.includes(topic)){
        state.sortByTopic = []
      }
      state.sortByTopic = state.sortByTopic.filter(el => el !== topic)
    },

    SET_TOPIC_STATISTIC: (state, {stat}) => {
      state.topicsResultsNumber.push(stat)
    },
    SET_UPDATED_TOPIC_STATISTIC: (state, {stat}) => {
      console.log(stat);
      state.topicsResultsNumber = state.topicsResultsNumber.map(el => el.query === stat.query ? {...el, timestamp: stat.timestamp} : el)
    },
    SET_NEWS_TO_SCROLLED: (state, {ids}) => {
      const paresedIds = ids.trim().split(' ')
          .map(el => {
            if(!state.archiveNews.includes(el)){
              return el
            }
          });

      state.news.filter(el => paresedIds.includes(el.id))
          .forEach(el =>  state.archiveNews.push({...el, scrolled: true}))

      state.news = state.news.map(el => {
        if(paresedIds.includes(el.id)){
          return {
            ...el,
            scrolled: true
          }
        }
        return el
      })


    },

    SET_TOPIC_TO_SORT_OF: (state, {topic}) => {
      if(state.sortByTopic.includes(topic)){
        state.sortByTopic = state.sortByTopic.filter(el => el !== topic)
      }
      else{
        state.sortByTopic.push(topic)
      }
    },

    SET_INCREASED_PAGE: (state, {pageName}) => {
      state[pageName]++
    },

    SET_TO_FIRST_PAGE: (state) => {
      state.page = 1
      state.archivePage = 1
    },
    SET_TOAST_MESSAGE: (state, {message}) => {
      state.messageToast = message;
    },
    DISABLE_TOAST_MESSAGE: (state) => {
      state.messageToast = null;
    }
  },
  actions: {
    async FETCH_NEWS({state, commit}, {query}){
      const isExist = state.news.length ? state.news.every(el => {

        return el.query.toLowerCase()  !== query.toLowerCase()
      }) : true;
      const isZeroResults = state.topicsResultsNumber.filter(el => el.query === query)[0]?.count === 0;

      if(!isExist){
        console.log('news exist');
        throw new Error('This topic already tracking')

      }
      if(isZeroResults){
        console.log('news has 0 results');
        throw new Error('We found 0 news by youe topic, try to write different')

      }
      console.log('news not');
      await fetchNews(query)
          .then((res) => {
            commit('SET_TOPIC_STATISTIC', { stat:
                  {
                    query,
                    count: res.totalResults,
                    id: uuidv4(),
                    timestamp: new Date()
                  }})
            if(res.totalResults === 0){
              throw new ZeroCount("We found 0 news by youe topic, try to write different");
            }
            const formatedResult = res.articles.map(article => {
              return {
                ...article,
                id: uuidv4(),
                query,
                scrolled: false
              }
            })

            commit('SET_NEWS', { data: formatedResult})

          })
          .catch((e) => {
            throw new Error(e.name === 'ZeroCount' ? e.message : 'Something went wrong. Try latter')
          })

    },
    async UPDATE_NEWS({state, commit}){

      if(!state.news.length){
        return;
      }
      const needUpdate = state.topicsResultsNumber.filter(el => {

        return el.count > 0 && datesDiff(el.timestamp, new Date()) >= 0.9 ?  true : false
      })


      if(needUpdate.length){
      
        Promise.all(
            needUpdate.map(async (el)=> {

              return await fetchNews(el.query).then(data => {

                return {
                  ...data,
                  articles: data.articles.map(article => {return {...article, query: el.query}})
                }
              })
            })

        ).then((res) => {

          const articles = res.map(el => el.articles).flat();

          const newNews = articles.filter(el => !state.news.find(elNew => el.title === elNew.title))

          const querys = new Set(res.map(el => el.articles[0].query))
          console.log(querys);

          querys.forEach((query) => {
            commit('SET_UPDATED_TOPIC_STATISTIC', {
              stat:
                  {
                    query,
                    timestamp: new Date()
                  }})
          })

          if(newNews.length){
            const result = newNews.map(article => {
              return {
                ...article,
                id: uuidv4(),
                query: article.query,
                scrolled: false
              }
            })
            commit('SET_NEWS', { data: result})
          }


        })
      }

    }
  },
  getters: {

    newsSortedByActiveTopic: (state) => {
      const {news, sortByTopic, page} = state;
      if(!news.length){
        return []
      }
      const sortedByTimeNews = news.filter(el => !el.scrolled).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      const sortedByActiveTopic = sortedByTimeNews.filter(el => sortByTopic.includes(el.query))
      return sortByTopic.length ? paginationSlice(sortedByActiveTopic, page, itemsPerPage ) : paginationSlice(sortedByTimeNews, page, itemsPerPage );
    },
    archiveNewsSortedByActiveTopic: (state) => {
      const {archiveNews, sortByTopic, archivePage} = state;
      if(!archiveNews.length){
        return []
      }
      const sortedByTimeNews = archiveNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      const sortedByActiveTopic = sortedByTimeNews.filter(el => sortByTopic.includes(el.query))
      return sortByTopic.length ? paginationSlice(sortedByActiveTopic, archivePage, itemsPerPage ) : paginationSlice(sortedByTimeNews, archivePage, itemsPerPage );
    },
    newsTopics: (state) => {
      if(!state.topicsResultsNumber.length){
        return []
      }

      return state.topicsResultsNumber.filter(el => el.count > 0);

    }
  },
  modules: {
  }
})
