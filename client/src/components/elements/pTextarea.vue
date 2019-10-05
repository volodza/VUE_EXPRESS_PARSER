<template>
  <div class="body">
    <textarea
     :placeholder="label"
     :value="value"
     type="text"
     @textarea="$emit('textarea', $event.target.value)"
    ></textarea>
  </div>
</template>

<style lang="sass">
  .body
    textarea
      min-height: 80px
      width: 100%
      padding: 0.5vh 1vh
      outline: 0
      border: 1px solid #d7d7d7
      border-radius: 2px
</style>

<script>
export default {
  props:{
    value:{
      type:String
    },
    label:{
      type:String,
      default:'label'
    }
  },
  data () {
    return {
    }
  },
  methods:{
    check(){
      this.value = !this.value;
      this.$emit('input',this.value)
    }
  },
}
</script>