<template>
  <div class="header">
    <div class="container">
      <v-flex class="col-sm-6 offset-sm-3" md6  >

        
        <h1>ARROW TARGET</h1>
        <p>Сервис для поиска <br> клиентов в социальной <br> сети Вконтакте!</p>
        <!-- <v-btn style="margin:20px 0" height="42" width="152" color="#13426e" >Начать поиск</v-btn> -->
        <btn size title="Начать поиск" class="btn">Начать поиск</btn>

        <!-- <select name="qwer" id=""></select> -->
        </v-flex>


          <!-- <h1 style="font-size:60px;">
            <strong>ArrowTarget</strong>
          </h1>
          <hr class='my-2'>
          <p>Сервис для поиска клиентов <br>в социальной сети Вконтакте!</p> 
          
          <v-btn height="42" width="142" color="#13426e" >Начать поиск</v-btn> -->
    </div>
  <!-- </v-layout> -->
  </div>

</template>

<style lang='sass' scoped>
  .header
    padding: 10px 0
    background-color: #0c1319
    height: 75vh
    background-image: url('../../assets/img/contacts-background.jpg')
    background-size: cover

    .container
      width: 100%
      padding: 0 15px
      max-width: 960px
      margin: 0 auto

      h1  
        font-size: 46px
        line-height: 40px
        margin: 90px 0 20px
        font-weight: 300

      .btn
        height: 42px
        margin: 20px auto
        width: 152px
        color: white

      p
        font-size: 30px
        line-height: 37px
  // %center 
    // display: flex
    // justify-content: center
    // align-items: center

  // header
  //   height: 100vh
  //   background-image: url('https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg')
  //   background-size: cover
  //   @extend %center
  
  // .info  
  //   margin: auto
  //   height: 100vh
  //   background-image: url('https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg')
  //   background-size: cover
  //   @extend %center
      
  //   .heading
  //     text-align: center
    
  //   p  
  //     color: white
  //     font-size: 30px      
      

</style>
