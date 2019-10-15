<template>
  <div class="radioGroup">
    <div 
    v-for="(item,i) in items"
    :key='i'
    class="radio">
    <div class='square' @click="select(item)">
      <div v-if="selected==item.title" class="select"></div>
    </div>
    <span @click="select(item)">{{item.title}}</span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .radioGroup
    display: flex
    flex-wrap: wrap
    // margin: 12px 
    .radio
      display: flex
      margin-right: 13px
      margin-top: 6px
      // margin: 3px 5px
      .square
        display: flex
        align-items: center
        justify-content: center
        height: 20px
        min-width: 20px
        border: 1px solid #d7d7d7
        border-radius: 50%
        transition: 0.3s 
        cursor: pointer
        &:hover
          border: 1px solid #b0b0b0
      span
        margin-left: 4px
        cursor: pointer

  .select
    height: 12px
    width: 12px
    border-radius: 50%
    background: #d7d7d7 
         
</style>

<script>
export default {
  props:{
    items:{
      type:Array
    },
    // label:{
    //   type:String
    // }
  },
  data() {
    return{
      selected:null
    }
  },
  methods:{
    select(item){
      this.selected=item.title
      this.$emit('input',item.id)
    }
  }

}
</script>