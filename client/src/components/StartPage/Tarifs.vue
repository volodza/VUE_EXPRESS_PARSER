<template>
  <div class="tarifs">
    <v-container class="container" style="max-width:960px;margin:0 auto;">
      <h2 class="text-center" style="
          font-size: 30px;
      line-height: 40px;
      margin: 0;
      padding: 0;
      margin-bottom: 40px;
      font-weight: 300;
      color: #fff;"
      >Наши тарифы</h2>

      <table class="hidden-sm-and-down">
        <thead>
            <tr>
              <td>Ваши возможности</td>
              <td>Бесплатный</td>
              <td>Стандартный</td>
              <td>Автоматизация</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Количество инструментов для поиска целевой аудитории</td>
            <td>35</td>
            <td>130+</td>
            <td>150+</td>
          </tr>
          <tr>
              <td>Количество потоков для ручных задач</td>
              <td>1</td>
              <td>2</td>
              <td>2</td>
          </tr>
          <tr>
              <td>Скорость парсинга</td>
              <td>x1</td>
              <td>x2</td>
              <td>x5</td>
          </tr>
          <tr>
              <td>Моментальная поддержка в режиме онлайн 24/7</td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
          <tr>
              <td>Доступ к огромному сообществу с материалами и статьями</td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
            <tr>
              <td>Крупнейшие Telegram и ВК чаты с экспертами SMM</td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
          <tr>
              <td>Все инструменты таргетинга за исключением «Вступления» и «Кейсы»</td>
              <td> </td>
              <td><v-icon size="18">mdi-check</v-icon></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
          <tr>
              <td>Отслеживание вступлений в сообщества</td>
              <td></td>
              <td></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
          <tr>
              <td>Ретроспективный сбор вступивших в любые сообщества</td>
              <td></td>
              <td></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
          <tr>
              <td>Автоматизация любых алгоритмов поиска ЦА с помощью «Кейсов»</td>
              <td></td>
              <td></td>
              <td><v-icon color="white" size="18">mdi-check</v-icon></td>
          </tr>
          <tr>
              <td>Дополнительный поток для обработки автоматических задач</td>
              <td></td>
              <td></td>
              <td><v-icon size="18">mdi-check</v-icon></td>
          </tr>
                      
        </tbody>
        <tfoot>
          <tr>
            <td>Стоимость</td>
            <td>Бесплатно</td>
            <td>от 18 ₽/день</td>
            <td>от 34 ₽/день</td>
          </tr>
          <tr>
              <td></td>
              <td><v-btn height="42" width="142" color="#13426e" >Подключить</v-btn></td>
              <td><v-btn height="42" width="142" color="#13426e" >Подключить</v-btn></td>
              <td><v-btn height="42" width="142" color="#13426e" >Подключить</v-btn></td>
          </tr>
        </tfoot>
      </table>

      <v-layout class="hidden-md-and-up" wrap>
        <v-flex pa-2 xs12 sm4>
          <div class="item">
            <div class="tarif-title">Бесплатный</div>
            <div class="tarif-options">
              <div>30 инструментов для поиска целевой аудитории</div>
              <div>1 поток для ручных задач</div>
              <div>Стандартная скорость парсинга</div>
              <div>Моментальная поддержка в режиме онлайн 24/7</div>
              <div>Доступ к огромному сообществу с кейсами и материалами</div>
              <div>Крупнейшие Telegram и ВК чаты с экспертами SMM</div>
            </div>

            <div class="tarif-price">
              Бесплатно!
            </div>
            
            <v-btn height="42" width="142" color="#13426e" >Подключить</v-btn>
            
          </div>
        </v-flex>
        <v-flex pa-2 xs12 sm4>
          <div class="item">
            <div class="tarif-title">Стандартный</div>
            <div class="tarif-options">
              <div>130+ инструментов для поиска аудитории</div>
              <div>2 потока для ручных задач</div>
              <div>Скорость парсинга увеличена в 5 раз</div>
              <div>Все инструменты таргетинга за исключением «Вступления« и »АвтоКейсы»</div>
              <div>Дополнительный поток для обработки автоматических задач</div>
              <div>Моментальная поддержка в режиме онлайн 24/7</div>
              <div>Доступ к огромному сообществу с кейсами и материалами</div>
              <div>Крупнейшие Telegram и ВК чаты с экспертами SMM</div>
            </div> 

            <div class="tarif-price">
              Стоимость от 18 ₽/день
            </div>

            <v-btn height="42" width="142" color="#13426e" >Подключить</v-btn>

          </div>
        </v-flex>
        <v-flex pa-2 xs12 sm4>
          <div class="item">
            <div class="tarif-title">Автоматизация</div>
            <div class="tarif-options">
              <div>150+ инструментов для поиска аудитории</div>
              <div>2 потока для ручных задач</div>
              <div>Скорость парсинга увеличена в 5 раз</div>
              <div>Все инструменты таргетинга</div>
              <div>Дополнительный поток для обработки автоматических задач</div>
              <div>Отслеживание вступлений в сообщества</div>
              <div>500 сообществ на отслеживание</div>
              <div>1 поток для «Кейсов»</div>                
              <div>Ретроспективный сбор вступивших в любые сообщества</div>
              <div>Моментальная поддержка в режиме онлайн 24/7</div>
              <div>Доступ к огромному сообществу с кейсами и материалами</div>
              <div>Крупнейшие Telegram и ВК чаты с экспертами SMM</div>
            </div> 

            <div class="tarif-price">
              Стоимость от 34 ₽/день
            </div>                

            <v-btn height="42" width="142" color="#13426e" >Подключить</v-btn>           

          </div>
        </v-flex>

      </v-layout>

    </v-container>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="sass">
  .item
    border: 1px solid #494e5c
    border-radius: 3px
    background-color: #20242e
    padding: 15px 10px 20px

    .tarif-title
      text-align: center
      font-weight: 600
      margin-bottom: 15px
      font-size: 16px

    .tarif-options
      text-align: center
      font-size: 13px
      line-height: 18px
      min-height: 520px
      padding-bottom: 15px

      div
        margin-bottom: 5px

    .tarif-price
      font-size: 13px
      height: 32px
      margin-bottom: 15px
      font-weight: 600

  .tarifs
    padding: 40px 0
    background-color: #0c1319
    color: white

    table
      font-size: 13px
      line-height: 18px
      width: 100%
      font-weight: 600
      border-collapse: collapse

      thead
        display: table-header-group
        vertical-align: middle
        border-color: inherit

      tr
        display: table-row
        vertical-align: inherit
        border-color: inherit
      tbody
        display: table-row-group
        vertical-align: middle
        border-color: inherit
        tr:nth-child(odd) 
          background-color: #252b30
      
      td 
        display: table-cell
        vertical-align: inherit
        padding: 10px 15px
      
      td:first-child
        text-align: left
  @media (max-width: 600px) 
    .item
      .tarif-options
        min-height: 0
</style>