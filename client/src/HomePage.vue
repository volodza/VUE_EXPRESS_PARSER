<template>
    <div>
        <header>
          <bgAnimation />
            <div class="info1">
            <!-- <v-layout xs12 sm6 class="  " > -->
                <!-- <v-flex xs12 sm5 class="logo">
                    <img style="height:300px;" src="../public/logo.png" alt="">
                </v-flex> -->

                <div  class="heading">
                    
                    
                    <h1  style="font-size:60px; color:#1D1514">
                         <strong style="color:#88C8B3">Arrow</strong> <strong style="color:#F27865">Target</strong>
                    </h1>
                    <hr class='my-2'>
                    <p>Сервис для поиска целевой аудитории Вконтакте!</p> 
                    
                    <v-btn 
                      @click="vkAuth"
                      flat 
                      style="background: #8CCFB9; text-transform:none; font-size:20px; color: black"
                      dark>
                      Начать поиск
                     </v-btn>
                </div>
            <!-- </v-layout> -->
            </div>
        </header>

<section class="function">
        <v-container class="containerF" style="" fluid>
          <!-- <div class="row"> -->
          <h1 >Более 150 инструментов
            для поиска целевой аудитории
          </h1 >
          <v-layout row sm12 class="layoutF" >
            
            <v-flex class="flexF" xs12 sm3>
              <article class="articleF">
             <h2>  Целевая аудитория </h2> 
              <p>  Наш сервис круглосуточно отслеживает
                целевую аудиторию по Вашим критериям, 
                и моментально ловит её !
              </p>
              </article>  
            <!-- </v-flex> -->
            <!-- <v-flex class="flexF" sm3> -->
              <article class="articleF">
             <h2> Супер-эффективность </h2> 
              <p>  Экономьте до 90% бюджета, 
                используя инструменты сравнительного 
                анализа и отсеивая холодную аудиторию. 
                Таргетируйте с умом!
              </p>
              </article>  
            </v-flex>

            <v-flex  xs12 sm6>
              <section class="presentation">
              <img src="https://targethunter.ru/assets/img/video_bg.png" alt="">
              </section>
            </v-flex>

            <v-flex class="flexF" sm3>
              <article class="articleF">
             <h2>  Автоматизация рекламы </h2> 
              <p>  Мы добиваемся полной автоматизации Вашей работы.
                Избавьте себя от рутины — Поставьте таргетинг на автопилот!
              </p>
              </article>  
            <!-- </v-flex> -->
            <!-- <v-flex class="flexF" sm3> -->
              <article class="articleF">
             <h2>  Быстрая разработка </h2> 
              <p>  Возможности нашего сервиса постоянно 
                пополняются уникальными решениями. 
                Будьте первыми обладателями самых мощных SMM-инструментов!
              </p>
              </article>  
            </v-flex>
          </v-layout>
          <!-- </div> -->
        </v-container>
</section>
    </div>
</template>

<style lang='sass' scoped>
%center 
    display: flex
    justify-content: center
    align-items: center

body
  font-size: 1rem
  font-weight: 400
  line-height: 1.5

.function
  background: #383c42

  .containerF
    width: 100%
    padding-right: 15px
    padding-left: 15px
    margin-right: auto
    margin-left: auto

    // .row
    //   display: flex
    //   flex-wrap: wrap
    //   margin-right: -15px
    //   margin-left: -15px

    h1
      font-size: 30px
      line-height: 40px
      margin: 0
      padding: 0
      margin-bottom: 40px
      font-weight: 300
      color: #fff
      text-align: center

    .layoutF 
      margin: 0 auto
      max-width: 80%
      text-align: center
      // display: flex
      // flex-wrap: wrap
      // margin-right: -15px
      // margin-left: -15px

      .presentation
        position: relative
        cursor: pointer
        height: 0
        padding-top: calc(253/450*100%)
        overflow: hidden
        margin-top: 20px
        margin-bottom: 40px

        img
          vertical-align: middle
          border-style: none
          max-width: 100%
          height: auto         
          opacity: .2
          position: absolute
          top: 0
          left: 0
          right: 0
          bottom: 0

      .articleF
        margin: 35px 0 45px
        display: block

        h2
          font-size: 20px
          margin-bottom: 10px
          color: #fff

        p
          display: block
          margin-block-start: 1em
          margin-block-end: 1em
          margin-inline-start: 0px
          margin-inline-end: 0px
          font-size: 16px
          color: rgba(255,255,255,.8)
          margin-bottom: 1rem
        
@media (min-width: 1200px)
  .container 
    max-width: 1140px



header
    height: 100vh
    background: url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg)  no-repeat 
    background-size: cover
    @extend %center
 
.info1  
    margin: auto
     
    .heading
        text-align: center
    
    p  
        color: white
        font-size: 30px      
    
 
@media screen and (max-width: 500px)
    .logo
        display: none
     
	



 
</style>

<script>
import bgAnimation from "@/bgAnimation";
export default {
  components: {
    bgAnimation
  },
    methods:{
    vkAuth (){
      this.$http.get('/auth/vkontakte') 
      .then(response => {
        localStorage.access_key = response.body.access_key
        window.location.href = response.body.vk_url
      },(err) => {
        this.$store.commit("setError", err);
      });
    }
}}
</script>
