<template>
  <textarea
    :placeholder="label"
    :value="value"
    type="text"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<style lang="sass">
  textarea
    min-height: 80px
    width: 100%
    padding: 5px 8px
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
}
</script>