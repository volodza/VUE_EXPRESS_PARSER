<template>
  <div class="checkbox">
    <div class="square" @click="check">
      <div v-if="value == true" class="checkmark"></div>
    </div>
    <span @click="check">{{label}}</span>
  </div>
</template>

<script>
export default {
  props:{
    value:{
      type:Boolean,
      default:false
    },
    label:{
      type:String,
      default:'label'
    }
  },
  data () {
    return {}
  },
  methods:{
    check(){
      this.value = !this.value;
      this.$emit('input',this.value)
    }
  },
}
</script>

<style lang="sass" scoped>
  .checkbox
    display: flex
    margin: 2px
    user-select: none
    span
      cursor: pointer


  .square
    cursor: pointer
    height: 20px
    width: 20px
    border: 1px solid #d7d7d7
    border-radius: 2px
    margin-right: 10px

  .checkmark
    left: 5px
    bottom: 1px
    position: relative
    width: 8px
    height: 17px
    border: solid grey
    border-width: 0 2px 2px 0
    -webkit-transform: rotate(45deg)
    transform: rotate(45deg)
</style>