<template>
  <div class="checkbox"
   >
    <div :class="[{'bg': value == true},'square']" @click="check" >
      <div  v-show="value == true" class="checkmark"></div>
    </div>
    <span v-show="label" @click="check">{{label}}</span>
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
      // default:''
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
    align-items: center
    span
      cursor: pointer
      margin-left: 7px



  .square
    cursor: pointer
    height: 20px
    min-width: 20px
    border: 1px solid #d7d7d7
    border-radius: 2px
    transition: 0.3s 
    &:hover
      border: 1px solid #b0b0b0
  .bg
    background: #999999

  .checkmark
    left: 6px
    bottom: 1px
    top: 1px
    position: relative
    width: 7px
    height: 13px
    border: solid white
    border-width: 0 2px 2px 0
    -webkit-transform: rotate(45deg)
    transform: rotate(45deg)
</style>