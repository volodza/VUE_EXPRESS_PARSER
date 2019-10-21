<template>
  <div ref=drop @blur="isActive = false">
    <input
      class="search" 
      :placeholder="label"
      type="text"
      :value="searchInput"
      @input="$emit('update:searchInput', $event.target.value)"
      @focus="isActive = true"
      :style="disabled ? 'opacity:.3': ''"
      :disabled='disabled'
    >

    <div v-if="isActive && filteredItems.length" class="dropdown">
      <ul>
        <li 
          style="line-height:1.2"
          :class="selected == item.title ? 'active' : ''" 
          v-for="(item,i) in filteredItems" 
          :key="i"
          @click="selectItem(item)"
        >
          {{item.title}} <br> 
          <span style="font-size:10px;color:grey" v-if="item.area">{{item.area}}<br></span>
          <span style="font-size:10px;color:grey" v-if="item.region">{{item.region}}</span> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    value:{
      type:Number
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
    },
    onMouseUp(e){ 
      if(e.target){
        const up = this.$refs.drop
        if (!up.contains(e.target)){
          this.isActive = false
        }
      }
    }
  },
  computed: {
    filteredItems(){
      let filter = new RegExp(this.searchInput, 'i')
      return this.items.filter(el => el.title.match(filter))
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.onMouseUp);
  },
  destroyed() {
    document.removeEventListener('mouseup', this.onMouseUp);
  },
  
}
</script>

<style lang="sass" scoped>
.search 
  border: 1px solid #d7d7d7
  border-radius: 2px
  min-height: 35px
  width: 100%
  position: relative
  padding-left: 5px
  outline: 0
  // margin-right: 60px

.dropdown
  position: relative
  max-height: 200px
  // overflow-y: auto

  ul
    border: 1px solid #d7d7d7
    padding-left: 0
    background-color: white
    z-index: 8
    max-height: 200px
    overflow-y: auto
    width: 100%
    position: absolute
    li 
      cursor: pointer
      padding: 1vh 1vh      
      &:hover
        background-color: #f3f3f3

.search_input 
  position: absolute
  margin-left: 8px
  height: 28px
  outline: 0

</style>