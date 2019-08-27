<template>
    <div>
        <v-layout class="header" >
            <div class="d-flex flex-row justify-center info">
            <v-layout xs12 sm6 class="  " >
                <v-flex xs12 sm6 class="logo">
                    <img style="height:300px" src="../public/logo.png" alt="">
                </v-flex>
                <v-flex xs12 sm6 class="heading">
                    <h1  style="font-size:60px; color:#1D1514">
                         <strong style="color:#88C8B3">A</strong>rrow <strong style="color:#F27865">T</strong>arget
                    </h1>
                    <p>Сервис №1 для поиска клиентов в социальных сетях!</p> 
                    <small>По данным открытого исследования PandaTarget</small> 
                </v-flex>
            </v-layout>
            </div>
        </v-layout>
    </div>
</template>

<style lang='sass' scoped>

 .header
     height: 500px
     background: url(../public/ArrowTarget.png)  no-repeat 
     background-size: 100% 500px
 
 .info  
     margin: auto
     
     .heading
         text-align: center
    
     p  
         color: white
         font-size: 30px

     small 
         color: white
         font-size: 15px
         
    
 @media screen and (max-width: 500px)
    .logo
        display: none
     
     



 
</style>

<script>
export default {
    
}
</script>
