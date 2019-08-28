<template>
    <div>
        <div class="header" >
            <div class="info">
            <!-- <v-layout xs12 sm6 class="  " > -->
                <!-- <v-flex xs12 sm5 class="logo">
                    <img style="height:300px;" src="../public/logo.png" alt="">
                </v-flex> -->

                <div  class="heading">
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    <div class="firefly"></div>
                    
                    <h1  style="font-size:60px; color:#1D1514">
                         <strong style="color:#88C8B3">Arrow</strong> <strong style="color:#F27865">Target</strong>
                    </h1>
                    <hr class='my-2'>
                    <p>Сервис для поиска целевой аудитории Вконтакте!</p> 
                    
                    <v-btn 
                      @click="vkAuth"
                      flat 
                      style="background: linear-gradient(160deg,#4f555e,#4f555e,#5c6e68); text-transform:none; font-size:20px"
                      dark>
                      Начать поиск
                     </v-btn>
                </div>
            <!-- </v-layout> -->
            </div>
        </div>

        
    </div>
</template>

<style lang='sass' scoped>
$quantity: 15

.header
    height: 100vh
    background: url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg)  no-repeat 
    background-size: cover
    display: flex
    justify-content: center
    align-items: center
 
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
     
.firefly
  position: fixed
  left: 50%
  top: 50%
  width: 0.4vw
  height: 0.4vw
  margin: -0.2vw 0 0 9.8vw
  animation: ease 200s alternate infinite
  pointer-events: none

  &::before,
  &::after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    transform-origin: -10vw
  
  &::before
    background: black
    opacity: 0.4
    animation: drift ease alternate infinite
  
  &::after
    background: white
    opacity: 0
    box-shadow: 0 0 0vw 0vw yellow
    animation: drift ease alternate infinite, flash ease infinite

  
// Randomize Fireflies Motion
@for $i from 1 through $quantity
  
  $steps: random(12) + 16
  $rotationSpeed: random(10) + 8s
  
  .firefly:nth-child(#{$i})
    animation-name: move#{$i}

    &::before
      animation-duration: #{$rotationSpeed}

    &::after
      animation-duration: #{$rotationSpeed}, random(6000) + 5000ms
      animation-delay: 0ms, random(8000) + 500ms

  @keyframes move#{$i}
    @for $step from 0 through $steps
      #{$step * (100 / $steps)}%
        transform: translateX(random(100) - 50vw) translateY(random(100) - 50vh) scale(random(75) / 100 + .25)

@keyframes drift
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

@keyframes flash
  0%, 30%, 100%
    opacity: 0
    box-shadow: 0 0 0vw 0vw yellow
  5%
    opacity: 1
    box-shadow: 0 0 2vw 0.4vw yellow     

@-webkit-keyframes move-background 
	from 
		-webkit-transform: translate3d(0px, 0px, 0px)
	
	to  
		-webkit-transform: translate3d(1000px, 0px, 0px)
	



 
</style>

<script>
export default {
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
