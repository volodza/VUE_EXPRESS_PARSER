<template>
  <div class='paginator'>
    <ul>
      <li @click="changePage(1)"><v-icon>mdi-chevron-double-left</v-icon></li>
      <li @click="changePage(prevPage)"><v-icon>mdi-chevron-left</v-icon></li>
      <li 
      :class="value == page ? 'active':''"
      v-for="(page, i) in pages"
      :key="i"
      @click="changePage(page)">
        {{page}}
      </li>
      <li @click="changePage(nextPage)"><v-icon> mdi-chevron-right</v-icon></li>
      <li @click="changePage(length)"><v-icon>mdi-chevron-double-right</v-icon></li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
  .paginator
    display: flex
    align-items: center
    ul
      display: flex
      background: white
      padding: 0
      border: 1px solid #d7d7d7
      li
        border-right: 1px solid #d7d7d7
        height: 30px
        display: flex
        align-items: center
        justify-content: center
        width: 30px
        color: #7c7c7c
        cursor: pointer
        i
          color: #7c7c7c
          font-size: 15px
        &:hover
          background: #e2e2e2
      li:last-child
        border-right: none

  .active
    background: #e2e2e2
</style>

<script>
export default {
  props: {
    value:{
      type:Number,
      default: 1
    },
    length:{
      type: Number,
      default: 1
    },
    pageRange: {
      type:Number,
      default:2
    }
  },
  computed: {
    pages: function(){
      let pages = []
      for(let i=this.rangeStart; i<=this.rangeEnd; i++){
        pages.push(i)
      }
      return pages
    },
    rangeStart: function(){
      let start = this.value - this.pageRange
      return (start>0) ? start : 1
    },
    rangeEnd: function(){
      let end = this.value + this.pageRange
      return (end < this.length) ? end : this.length
    },     
    nextPage: function(){
      return this.value + 1
    },
    prevPage: function(){
      return this.value - 1
    }
  },
  methods:{
    changePage(value) {
      this.$emit('input', value)
    }
  }
}
</script>