<template>
  <div class="select">
    <div @click="isActive = !isActive" class="contain">
      <span v-if="selected">{{selected}}</span>
      <span v-else>{{label}}</span>
      <v-icon class="submenu_icon" size='16'>
        mdi-chevron-{{isActive ? 'up' : 'down'}}
      </v-icon>
    </div>

    <div v-if="isActive" class="dropdown">
      <ul>
        <li 
          :class="selected == item.title ? 'active' : ''" 
          v-for="(item,i) in items" 
          :key="i"
          @click="selectItem(item)"
        >
          {{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .contain
    border: 1px solid #d7d7d7
    border-radius: 2px
    height: 4vh
    cursor: pointer
    display: flex
    span
      margin: auto 1vh

  .submenu_icon
    color: inherit
    transition: none
    margin-left: auto
    margin-right: 2.5%

  .active
    background-color: #e2e2e2 !important

  .dropdown
    position: relative
    ul
      border: 1px solid #d7d7d7
      padding-left: 0
      background-color: white
      z-index: 8
      width: 100%
      position: absolute
      li 
        cursor: pointer
        padding: 1vh 1vh      
        &:hover
          background-color: #f3f3f3


</style>

<script>
export default {
  props:{
    items:{
      type:Array,
    },
    label:{
      type:String,
      default:'хуй'
    }
  },
  data () {
    return {
      selected:null,
      isActive:false
    }
  },
  methods:{
    selectItem(item){
      this.selected = item.title;
      this.isActive = false;
    }
  },


}
</script>