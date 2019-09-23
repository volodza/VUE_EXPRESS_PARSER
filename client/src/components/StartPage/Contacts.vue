<template>
  <div class="contacts">
    <v-container class="container" style="max-width:960px;margin:0 auto;">
      <h2>Контакты</h2>
      <div class="col-sm-6 offset-sm-3">
        <span class="subtitle">
          Мы готовы выслушать и обсудить любое интересное предложение.
          Пишите, будем рады пообщаться!
        </span>
        <div>
          <v-btn height="42" width="152" color="#13426e" >Написать нам</v-btn>
        </div>
      </div>
      <v-layout mt-4 justify-center wrap>
        <v-flex md4 xs12 >
          <div class="contact-phone">
            <span class="phone">8-800-555-35-35</span>
            <span style="">Отдел по работе с юр.лицами</span>
            <span class="period">с 8:00 до 14:00 (по мск)</span>
            <v-btn text>Заказать звонок</v-btn>
          </div>
        </v-flex>        
        <v-flex md4 xs12 sm8  >
          <p class="description">
            ArrowTarget — Предоставляет современные инструменты для 
            анализа и подбора активной целевой аудитории ВКонтакте. 
            Наш сервис позволит значительно снизить ваши рекламные 
            расходы!
          </p>
        </v-flex>
      </v-layout>

      <div class="copyright">© 2018 — 2019 ArrowTarget TM</div>
    </v-container>
  </div>
</template>

<style lang="sass">
  .copyright
    margin-top: 20px
  .description
    display: inline-block
    margin: 20px 10px
    color: #fff
    font-size: 13px
    text-align: left

  .contact-phone
    background-color: rgba(0,0,0,.6)
    border-radius: 4px
    padding: 10px 20px
    display: inline-block

    .phone
      display: block
      font-size: 20px
      line-height: 30px
      font-weight: 600
      color: #fff

    .period
      font-size: 15px
      display: block

  .contacts
    background-image: url('../../assets/img/contacts-background.jpg')
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    padding: 40px 0 10px

    h2
      font-size: 30px
      line-height: 40px
      margin: 0
      padding: 0
      margin-bottom: 10px
      font-weight: 300
      color: #fff
    
    .subtitle
      font-size: 13px
      display: inline-block
      margin-bottom: 10px
</style>