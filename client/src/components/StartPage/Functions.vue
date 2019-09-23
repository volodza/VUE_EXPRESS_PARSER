<template>
<div class="functions">
    <v-container class="container" style="max-width:960px;margin:0 auto;" fluid>
      <h2>
        Более 150 инструментов<br>
        для поиска целевой аудитории
      </h2 >

      <v-layout row d-flex align-start >
        <v-flex md3>
          <div class="function-item">
            <h3>Целевая аудитория</h3>
            <p>Наш сервис круглосуточно отслеживает целевую аудиторию по Вашим критериям, и моментально ловит её !</p>
          </div>

          <div class="function-item">
            <h3>Супер-эффективность</h3>
            <p>Экономьте до 90% бюджета, используя инструменты 
              сравнительного анализа и отсеивая холодную 
              аудиторию. Таргетируйте с умом!
            </p>
          </div>
        </v-flex>
        <v-flex md6 xs12 class="presentation">
          <img src="https://targethunter.ru/assets/img/video_bg.png" alt="">
          <!-- <img class="play" src="https://targethunter.ru/assets/img/play.png" alt=""> -->
        </v-flex>
        <v-flex md3>
          <div class="function-item">
            <h3>Автоматизация рекламы</h3>
            <p>
              Мы добиваемся полной автоматизации Вашей работы. 
              Избавьте себя от рутины — Поставьте таргетинг на автопилот!
            </p>
          </div>

          <div class="function-item">
            <h3>Быстрая разработка</h3>
            <p>
              Возможности нашего сервиса постоянно пополняются уникальными 
              решениями. Будьте первыми обладателями самых мощных 
              SMM-инструментов!
            </p>
          </div>
        </v-flex>
      </v-layout>
  </v-container>
</div>
</template>

<style lang="sass">
  .functions
    padding: 40px 0
    background-color: #0c1319

    .container
      width: 100%
      padding-right: 15px
      padding-left: 15px
      margin-right: auto
      margin-left: auto

      h2
        font-size: 30px
        line-height: 40px
        margin: 0
        padding: 0
        margin-bottom: 40px
        font-weight: 300
        color: #fff
  .function-item
    margin: 35px 0 45px
    display: block

    h3
      font-size: 18px
      margin-bottom: 10px
      color: #fff
    
    p
      margin-top: 0
      margin-bottom: 1rem
  .presentation
    // position: relative
    cursor: pointer
    // height: 0
    // padding-top: calc(353/450*100%)
    // overflow: hidden
    margin-top: 20px
    margin-bottom: 40px
    

    img 
      // vertical-align: middle
      // border-style: none
      max-width: 100%
      height: auto
      opacity: .2
      // position: absolute
      // top: 0
      // left: 0
      // right: 0
      // bottom: 0
    
    .play
      opacity: .5
      position: absolute
      display: inline-block
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)

</style>