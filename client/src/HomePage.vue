<template>
    <div>
        <header>
          <bgAnimation />
            <div class="info">
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

<section>
        <v-container style="text-align:center;color:white;background:grey;" fluid>
          <div >
          <h1>Более 150 инструментов
для поиска целевой аудитории</h1>
          <v-layout sm6 style="max-width:50%; " class="">
            <v-flex xs12 sm3>
              Целевая аудитория <br>
Наш сервис круглосуточно отслеживает целевую аудиторию по Вашим критериям, и моментально ловит её !
            </v-flex>
            <v-flex sm3>
              Супер-эффективность <br>
Экономьте до 90% бюджета, используя инструменты сравнительного анализа и отсеивая холодную аудиторию. Таргетируйте с умом!
            </v-flex>
            <v-flex sm3>
              Автоматизация рекламы <br>
Мы добиваемся полной автоматизации Вашей работы. Избавьте себя от рутины — Поставьте таргетинг на автопилот!
            </v-flex>
            <v-flex sm3>
              Быстрая разработка <br>
Возможности нашего сервиса постоянно пополняются уникальными решениями. Будьте первыми обладателями самых мощных SMM-инструментов!
            </v-flex>
          </v-layout>
          </div>
        </v-container>
</section>
    </div>
</template>

<style lang='sass' scoped>
%center 
    display: flex
    justify-content: center
    align-items: center



header
    height: 100vh
    background: url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg)  no-repeat 
    background-size: cover
    @extend %center
 
.info  
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
