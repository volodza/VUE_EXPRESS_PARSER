<template >
  <div ref=drop>
    <div @click="isActive = !isActive" class="contain">
      <div class='content'>
        <span v-if="selected">{{selected}}</span>
        <span 
          class='multiple' 
          v-else-if="Mselected.length" 
          v-for="(item,i) in Mselected" 
          :key="i"
        >
        <!-- <v-icon size='16' class='close'>mdi-close-circle-outline</v-icon> -->
        {{item}}
        </span>
        <span v-else style="color:#858585">{{label}}</span>
      </div>
      <v-icon class="submenu_icon" size='16'>
        mdi-chevron-{{isActive ? 'up' : 'down'}}
      </v-icon>
    </div>
    

    <div v-if="isActive"  class="dropdown">
      <ul v-if="!multiple">
        <li 
          :class="selected == item.title ? 'active' : ''" 
          v-for="(item,i) in items" 
          :key="i"
          @click="selectItem(item)"
        >
          {{item.title}}
        </li>
      </ul>

      <ul v-if="multiple">
        <li 
          :class="Mselected.includes(item.title) ? 'active' : ''" 
          v-for="(item,i) in items" 
          :key="i"
          @click="MselectItem(item)"
        >
          <div class="square">
            <div v-if="Mselected.includes(item.title)" class="checkmark"></div>
          </div>
          {{item.title}}
        </li>
      </ul>

    </div>
  </div>
</template>

<style lang="sass" scoped>
  $c_border: #d7d7d7

  .contain
    border: 1px solid $c_border
    border-radius: 2px
    min-height: 35px
    cursor: pointer
    display: flex
    align-items: center
    position: relative
    .content
      max-width: 90%
      display: flex
      flex-wrap: wrap
      white-space: nowrap
      overflow: hidden
    span
      margin: 2px 0
      margin-left: 1vh

  .multiple
    background: #d7d7d7
    padding: 2px 5px
    border-radius: 10px
  // .close
  //   margin: 2px 1px 

  .submenu_icon
    color: inherit
    transition: none
    position: absolute
    display: block
    float: left
    margin-left: 5px
    right: 1vh
    

  .active
    background-color: #e2e2e2 !important

  .dropdown
    position: relative
    ul
      border: 1px solid #d7d7d7
      padding-left: 0
      background-color: white
      z-index: 8
      width: 100%
      position: absolute
      li 
        cursor: pointer
        padding: 1vh 1vh  
        display: flex    
        &:hover
          background-color: #f3f3f3

  .square
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

<script>
export default {
  props:{
    items:{
      type:Array,
    },
    label:{
      type:String,
      default:'label'
    },
    multiple:{
      type:Boolean
    }
  },
  data () {
    return {
      selected:null,
      Mselected:[],
      isActive:false
    }

  },


  methods:{
    selectItem(item){
      this.selected = item.title;
      this.isActive = false;
      this.$emit('input',item.value)
    },

    MselectItem(item){
      if(this.Mselected.includes(item.title)){
        this.Mselected=this.Mselected.filter(x => x != item.title)}
      else{this.Mselected.push(item.title)};
      this.$emit('input',item.value)
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
  
  mounted() { 
    document.addEventListener('mouseup', this.onMouseUp); 
  },

}
</script>