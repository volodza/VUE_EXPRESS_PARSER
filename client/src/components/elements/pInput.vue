<template>
  <!-- <div > -->
    <input class="input" :placeholder='label'>
  <!-- </div> -->
</template>

<style lang="sass" scoped>
  .input
    border: 1px solid #d7d7d7
    border-radius: 2px
    height: 40px
</style>

<script>
export default {
  props:{
    label:{
      type:String,
      default:''
    }
  },
  data () {
    return {

    }
  },
  methods:{

  }
}
</script>