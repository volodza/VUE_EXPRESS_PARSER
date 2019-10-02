<template>
  <div class='header'>
    <ul class='menu'>
      <li class='menu-item'><a href="#">Home</a> </li>
      <li class='menu-item'><a href="#">Поиск ЦА</a> </li>
      <li class='menu-item'><a href="#">Модератор</a> </li>
      <li class='menu-item'><a href="#">Обучение</a> </li>
      <li class='menu-item'><a href="#">Магазин</a> </li>
    </ul>


    <ul class='menu'>
      <li class="menu-item">
        <a href="https://vk.com/ads?act=no_office"><strong>РК</strong></a>
      </li>

      <li class="menu-item"><a href="#">0р</a> </li>

      <li class="menu-item"><p>Тариф 'Бесплатный'</p> </li>

      <li class="menu-item" style="padding:0">
        <div class="btn-dropdown" @click="isActive = !isActive">
          <div class="avatar">
            <!-- <img :src="$store.getters.user.photo_50"> -->
          </div>
          <v-icon  light size="20">mdi-chevron-{{isActive ? 'up' : 'down'}}</v-icon>
        </div>
        <div v-if='isActive' class="menu-dropdown">
          <ul  style="background-color:white;padding-left:0">
            <li>Тариф</li>
            <li>Баланс</li>
            <li>Настройки</li>
            <li>Выйти</li>
          </ul>     
        </div>
      </li>
    </ul>

    
  </div>
</template>

<script>
export default {
  data(){
    return{
      isActive: false
    }
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
  .header
    height: 50px
    margin-left: 256px
    border-bottom: 1px solid #303030
    display: flex
    align-items: center
    justify-content: space-between
    
  .menu
    display: flex
    align-items: center
    position: relative
    background: white
    padding-left: 5px
    .menu-item
      display: flex
      align-items: center
      height: 35px
      margin-left: 5px
      width: calc(auto + 10px) 
      border: 1px solid #d7d7d7
      border-radius: 3px
      cursor: pointer
      &:hover
        border: 1px solid #b0b0b0
        transition: 0.3s
      a,p
        padding: 0 10px
        color: black
        text-decoration: none
        margin: 0

      
  .btn-dropdown
    display: flex    

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
    // position: relative
    position: absolute
    // visibility: hidden;
    width: 180px
    top: 40px
    right: 5px
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
        font-size: 14px
        &:hover
          background-color: #f3f3f3   
        
</style>