<template>
  <div class="select">
    <div @click="isActive = !isActive" class="contain" style="border:1px solid black;height:30px;width:150px;cursor:pointer;display:flex">
      <span v-if="selected">{{selected}}</span>
      <span v-else>{{defaultText}}</span>
    </div>

    <div v-if="isActive" class="dropdown">
      <ul>
        <li 
          v-for="(item,i) in items" 
          :key="i"
          @click="selectItem(item)"
        >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .dropdown
    ul 
      width: 100px
      border: 1px solid black
      background-color: white
      z-index: 8
      position: absolute
      li 
        cursor: pointer
        &:hover
          background-color: grey
</style>

<script>
export default {
  props:{
    items:{
      type:Array
    }
  },
  data () {
    return {
      selected:null,
      defaultText:'Выбрать...',
      isActive:false
    }
  },
  methods:{
    selectItem(item){
      this.selected = item;
      this.isActive = false;
    }
  },


}
</script>