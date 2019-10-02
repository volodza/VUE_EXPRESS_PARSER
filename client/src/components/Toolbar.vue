<template>
  <div style="height:40px;border-bottom:1px solid black;">
    
    <!-- <div @click="vkAuth" style="height:38px;width:38px;border-radius:50%;background-color:black;right:10px"></div> -->
    <!-- <v-toolbar-side-icon 
      @click.stop="drawer = !drawer" 
      class="hidden-lg-and-up"
    ></v-toolbar-side-icon>
    <v-spacer></v-spacer> -->
    <v-layout class="btn-dropdown" >
      <v-icon light size="25">mdi-chevron-down</v-icon>
      <div class="avatar">
        <img :src="$store.getters.user.photo_50">
      </div>
    </v-layout>
    <div class="menu-dropdown">
      <ul style="background-color:white;padding-left:0">
        <li>Тариф</li>
        <li>Баланс</li>
        <li>Настройки</li>
        <li>Выйти</li>
      </ul>
     
    </div>
    
  </div>
</template>

<script>
import pSelect from '@/components/elements/pSelect'
export default {
  components:{
    pSelect
  },
  methods: {
    vkAuth (){
      this.$http.get('/auth/vkontakte') 
      .then(response => {
        localStorage.access_key = response.body.access_key
        window.location.href = response.body.vk_url
      },(err) => {
        console.log(err)
        // this.$store.commit("setError", err);
      });
    },

    checkUserLogin (){ 
      if(!localStorage.access_key) return; 
      this.$http.get("/auth/checkToken",{ 
        params: { 
          access_key:localStorage.access_key 
        } 
      }).then(res => { 
        console.log(res.body)
        res.body ? this.$store.commit('setUser',res.body) : console.log('Ошибка') 
        console.log(this.$store.getters.user) 
      },(err) => {
        this.$store.commit("setError", err);
      });
    }
  },

  created: function (){ 
    this.checkUserLogin() 
  }
}
</script>

<style lang="sass" scoped>
  .btn-dropdown
    float: right
    padding: 0 10px
    cursor: pointer
    &:hover
      background-color: #f3f3f3

  .avatar
    margin-top: 3px
    height: 34px
    width: 34px
    border-radius: 50%
    right: 0px
    // position: absolute
    img 
      border-radius: inherit
      display: -webkit-inline-box
      display: -ms-inline-flexbox
      display: inline-flex
      height: inherit
      width: inherit
  .menu-dropdown
    position: relative
    position: absolute
    // visibility: hidden;
    width: 160px
    top: 44px
    right: 9px
    background: #fff
    z-index: 800
    border: 1px solid #c5d0db
    padding: 4px 0
    border-radius: 4px

    // opacity: 0
    filter: alpha(opacity=0)
    -o-transition: opacity 100ms linear, top 100ms linear, visibility 100ms linear
    transition: opacity 100ms linear, top 100ms linear, visibility 100ms linear
    ul   
      li 
        cursor: pointer
        padding: 3px 10px      
        &:hover
          background-color: #f3f3f3   
        
</style>