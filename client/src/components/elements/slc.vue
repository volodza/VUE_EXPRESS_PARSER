<template>
  <div class="select">
    <div @click="isActive == !isActive" class="container">
      <span v-if="selected">{{selected}}</span>
      <span v-else>{{defaultText}}</span>
    </div>

    <div v-if="isActive" class="dropdown">
      <ul>
        <li 
          v-for="(item,i) in items" 
          :key="i"
          @click="selected = item"
        >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    items:{
      type:Array
    }
  },
  data () {
    return {
      selected:null,
      defaultText:'Выбрать...',
      isActive:false
    }
  }

}
</script>