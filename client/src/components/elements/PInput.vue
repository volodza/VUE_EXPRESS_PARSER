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

<style lang="css">
  .search {
  border:1px solid #d7d7d7;
  border-radius:2px;
  height:30px;
  width:auto;
  position:relative;
  margin-right:60px;
}
.search_input-placeholder {
  /* font-size: 13px; */
  /* line-height: 19px; */
  letter-spacing: -0.01em;
  position:absolute;
  margin:5px 8px;
  color:#616161
}
.search_input-img {
  position:absolute;
  right:0;
  margin:14px 13px;
}
.search_input {
  position:absolute;
  margin-left:8px;
  width:350px;
  height:28px;
  outline:0;
}
</style>