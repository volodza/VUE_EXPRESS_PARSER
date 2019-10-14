<template>
  <div class="navigation">
    <div class="side-header" >
      <span>4B Parser</span>
    </div>


    <div class="nav-heading">Инструменты</div>

    <div v-for="(link,i) in links" :key="i">
      <v-layout @click="selectLink(link)" :class="isActive==link.title?'nav-submenu select':'nav-submenu'" >
        <v-icon class="submenu_icon" size="16">mdi-magnify</v-icon>
        <span>{{link.title}}</span>
        <v-spacer></v-spacer>
        <v-icon class="submenu_icon-chevron" size='16'>
          mdi-chevron-{{link.isActive ? 'up' : 'down'}}
        </v-icon>
      </v-layout>

      <transition name="slide-fade">
        <ul v-if="isActive == link.title">
          <li 
            v-for="(child,j) in link.children" 
            :key="j" 
            :class="selected==child.title?'nav-submenu select':'nav-submenu'"
            @click="selectChild(child)"
          >
            {{child.title}}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      isActive:null,
      links:[
        {
          title:'Поиск',
          children:[
            { title: "Сообщества", icon: "mdi-account-multiple", url: "/main/group" },
            { title: "Пользователи", icon: "mdi-account", url: "/main/users" },
            { title: "Родители", icon: "mdi-human-male-boy", url: "/parents" },
            { title: "Дни рождения", icon: "mdi-gift-outline", url: "/birthdays" }
          ]
        },
        {
          title:'Сбор',
          children:[
            { title: "Посты", icon: "mdi-account-multiple", url: "/posts" },
            { title: "Друзья", icon: "mdi-account", url: "/friends" },
            { title: "Обсуждения", icon: "mdi-human-male-boy", url: "/Discussions"},
            { title: "Родственники", icon: "mdi-gift-outline", url: "/Relatives"},
            { title: "Топ участники", icon: "mdi-new-box", url: "/main/topParticipant"},
            { title: "Участники", icon: "mdi-new-box", url: "/main/participant"},
            { title: "Недавно вступившие", icon: "mdi-new-box", url: "/recentlyjoin", iconColor: "red"},
            { title: "Комментарии", icon: "mdi-human-male-boy", url: "/Comments" }
          ]
        },
        {
          title:'Активности',
          children:[
            { title: "Вступления", icon: "mdi-account-multiple", url: "" },
            { title: "Сообщества", icon: "mdi-account", url: "" }
          ]
        }
      ]

    }
  },

  methods:{
    selectChild(child){
      this.$router.push(child.url)
      this.selected=child.title
    },
    selectLink(link){
      this.isActive == link.title?this.isActive =null:this.isActive = link.title
    }
  },


}
</script>

<style lang="sass">
  .side-header
    font-size: 26px
    text-align: center
    height: 50px
    border-bottom: 1px solid white

  .nav-heading
    padding: 12px 20px 6px 20px
    font-size: 12px
    font-weight: 600
    text-transform: uppercase
    color: #b8b8b8

  .nav-submenu
    padding: 10px 20px
    cursor: pointer
    color: #b8b8b8
    font-size: 13px
    &:hover
      color: white
      background-color: #282828

    .submenu_icon
      margin-right: 15px
      color: inherit
      transition: none
      &-chevron
        margin-right: 0
        color: inherit
        transition: none

  .select
    color: white !important

  ul
    padding-left: 30px
    list-style: none
    background-color: #282828

  .slide-fade-enter-active 
    transition: all .3s ease

  // .slide-fade-leave-active 
  //   transition: all .03s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter
    transform: translateX(10px)
    opacity: 0
  // .slide-fade-leave-to
  //   transform: translateX(10px)
  //   opacity: 0
  ::-webkit-scrollbar-button 
    background-image: url('') 
    background-repeat: no-repeat
    width: 6px
    height: 0px 


  ::-webkit-scrollbar-track 
    background-color: #eef1f07e
    /* box-shadow:0px 0px 3px #000 inset;  */


  ::-webkit-scrollbar-thumb 
    /* -webkit-border-radius: 5px;  */
    /* border-radius: 5px;  */
    background-color: #4f555e
    /* box-shadow:0px 1px 1px #fff inset;  */

    background-position: center
    background-repeat: no-repeat


  ::-webkit-resizer
    background-image: url('')
    background-repeat: no-repeat
    width: 7px
    height: 0px 
  

  ::-webkit-scrollbar
    width: 5px

</style>