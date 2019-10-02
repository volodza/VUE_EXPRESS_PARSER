<template>
  <div class="search">
    <input 
      :placeholder="label"
      class="search_input" 
      type="text"
      :value="searchInput"
      @input="$emit('update:searchInput', $event.target.value)"
      @focus="isActive = true"
     
      :disabled='disabled'
    >

    <div v-if="isActive" class="dropdown">
      <ul>
        <li 
          :class="selected == item.title ? 'active' : ''" 
          v-for="(item,i) in filteredItems" 
          :key="i"
          @click="selectItem(item)"
        >
          {{item.title}}
        </li>
      </ul>
    </div>
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
    },
    items:{
      type:Array,
    },
    searchInput:{
      default: undefined
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      isActive:true,
      selected:''
    }
  },
  methods:{
    selectItem(item){
      this.searchInput = item.title;
      this.isActive = false;
      this.$emit('input',item.id)
      this.$emit('update:searchInput', item.title)
    }
  },
  computed: {
    filteredItems(){
      let filter = new RegExp(this.searchInput, 'i')
      return this.items.filter(el => el.title.match(filter))
    }
  },
  // mounted() {
  //   document.addEventListener('mouseup', this.isActive = false);
  // },
}
</script>

<style lang="sass" scoped>
.search 
  border: 1px solid #d7d7d7
  border-radius: 2px
  height: 30px
  width: auto
  position: relative
  // margin-right: 60px

.dropdown
  position: relative
  max-height: 200px
  margin-top: 30px
  // overflow-y: auto

  ul
    border: 1px solid #d7d7d7
    padding-left: 0
    background-color: white
    z-index: 8
    max-height: 200px
    overflow-y: auto
    // width: 100%
    position: absolute
    li 
      cursor: pointer
      padding: 1vh 1vh      
      &:hover
        background-color: #f3f3f3

.search_input 
  position: absolute
  margin-left: 8px
  width: 350px
  height: 28px
  outline: 0

</style>