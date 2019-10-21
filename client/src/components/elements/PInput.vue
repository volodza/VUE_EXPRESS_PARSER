<template>
  <div class="search">
    <input 
      :placeholder="label"
      class="search_input" 
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

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

<style lang="sass">
.search 
  border: 1px solid #d7d7d7
  border-radius: 2px
  min-height: 35px
  // min-width: 150px
  position: relative
  display: flex
  align-items: center

// .search_input-placeholder 
//   letter-spacing: -0.01em
//   position: absolute
//   margin: 5px 8px
//   color: #616161

// .search_input-img 
//   position: absolute
//   right: 0
//   margin: 14px 13px

.search_input 
  position: absolute
  margin-left: 1vh
  width: 100%
  outline: 0

</style>