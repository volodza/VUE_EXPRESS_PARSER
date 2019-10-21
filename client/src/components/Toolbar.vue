<template >
  <div class='header' >
    <ul class='menu drop'>
      <li class='menu-item'><a href="#"> <v-icon>mdi-home</v-icon> </a> </li>
      <!-- <li class='menu-item'><a href="#">Поиск ЦА</a> </li> -->
      <!-- <li class='menu-item'><a href="#">Модератор</a> </li> -->
      <!-- <li class='menu-item'><a href="#">Обучение</a> </li> -->
      <!-- <li class='menu-item'><a @click='vkAuth' href="#">Магазин</a> </li> -->
    </ul>


    <ul class='menu'>
      <li class="bgn">
        <myTasks />
        <!-- <p>Мои задачи</p> -->
      </li>

      <li class="menu-item">
        <a href="https://vk.com/ads?act=no_office"><strong>РК</strong></a>
      </li>

      <!-- <li class="menu-item drop"><a href="#">0р</a> </li> -->

      <!-- <li class="menu-item drop"><p>Тариф 'Бесплатный'</p> </li> -->

      <li :class="isActive ? 'menu-item active':'menu-item'" ref=drop>
        <div class="btn-dropdown" @click="isActive = !isActive">
          <div class="avatar">
            <img :src="$store.getters.user.photo_50">
          </div>
          <v-icon  light size="20">mdi-chevron-{{isActive ? 'up' : 'down'}}</v-icon>
        </div>
        <div v-if='isActive' class="menu-dropdown">
          <ul  style="background-color:white;padding-left:0">
            <li class="draw">Тариф</li>
            <li class="draw">Баланс</li>
            <li>Настройки</li>
            <li>Выйти</li>
          </ul>     
        </div>
      </li>
    </ul>

    
  </div>
</template>

<script>
import myTasks from '@/components/mainTasks/myTasks'

export default {
  components:{
    myTasks
  },
  data(){
    return{
      isActive: false,
    }
  },
    computed:{
    isUserLoggedIn(){
      return this.$store.getters.isUserLoggedIn
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
    },
    onMouseUp(e){ 
       if(e.target){
      const up = this.$refs.drop
      if (!up.contains(e.target)){
        this.isActive = false
        }
    }  
    }
  },

    mounted() { 
  document.addEventListener('mouseup', this.onMouseUp); 
  },
  destroyed() { 
    document.removeEventListener('mouseup', this.onMouseUp); 
  },  

  created: function (){ 
    this.checkUserLogin() 
  }
}
</script>

<style lang="sass" scoped>
  .header
    height: 50px
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    background: #fcfbf9
    
  .menu
    display: flex
    align-items: center
    position: relative
    background: #FAFAFA
    padding-left: 0
    margin-right: 5px
    .menu-item
      display: flex
      align-items: center
      margin-left: 5px
      border: 1px solid #d7d7d7
      border-radius: 2px
      cursor: pointer
      &:hover
        border: 1px solid #b0b0b0
        transition: 0.3s
      a,p
        padding: 5px 10px
        color: black
        text-decoration: none
        margin: 0
      .draw
        display: none

  .bgn
    display: flex
    align-items: center
    margin-left: 5px
    border-radius: 2px
    cursor: pointer

  .active
    border: 1px solid #b0b0b0 !important

  .activeTask
    background: #303030
      
  .btn-dropdown
    display: flex 
    align-items: center
    height: 29px

  .avatar
    margin-left: 3px
    height: 23px
    width: 23px
    border-radius: 20%
    img 
      border-radius: inherit
      display: -webkit-inline-box
      display: -ms-inline-flexbox
      display: inline-flex
      height: inherit
      width: inherit
  .menu-dropdown
    position: absolute
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
    
  @media screen and (max-width: 820px)
    .drop 
      display: none !important
    .header
      justify-content: flex-end 
    .draw
      display: block !important

</style>