<template>
  <header id="header">
    <div class="wrapper">
      <strong class="logo">
        <img src="./assets/logo.svg" alt="">
      </strong>
      <!--<FindInNewsBar></FindInNewsBar>-->
    </div>
  </header>
  <main class="main-container">
    <div class="wrapper">
      <MainNewsView></MainNewsView>
    </div>
    <Toast
            v-if="$store.state.messageToast"
           :message="$store.state.messageToast"
    ></Toast>
  </main>
</template>

<script>

  // import FindInNewsBar from './components/FindInNewsBar'
  import Toast from './components/Toast'
  import MainNewsView from './views/MainNewsView'


export default {
  name: 'App',
  components: {
    // FindInNewsBar,
    MainNewsView,
    Toast,
  },
}
</script>

<style lang="scss">
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }



  #header{
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    padding: 2rem 0;

    .wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo{
          img{
            width: 16.1rem;
            height: 6.4rem;
          }
      }
    }

  }
  .main-container{
    margin: 6rem 0;
    .wrapper{
      max-width: 800px;
    }

    .news-filters{
      display: flex;
      justify-content: space-between;

    }
    .empty-news{
      text-align: center;
      color: gray;
      opacity: .6;
      margin: 4rem 0 0;
      i{
        font-size: 12rem;
      }
      h2{
        color: gray;
        text-align: center;
      }
    }
  }
  @import "./assets/scss/index";
</style>
