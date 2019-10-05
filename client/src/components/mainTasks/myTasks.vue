<template>
  <div
    :class="isActive ? 'mytasks active':'mytasks'"
    ref=drop>
    <div class="number">
      <span>{{$store.getters.tasks.length}}</span>
    </div>
    <p @click="isActive = !isActive">Мои задачи</p>
    <tasks v-if="isActive"/>
  </div>
</template>

<style lang="sass" scoped>
  .mytasks
    position: relative
    border: 1px solid #d7d7d7
    border-radius: 2px
    p
      padding: 5px 10px
      color: black
      margin: 0

  .number
    top: -8px
    right: -5px
    width: 17px
    background: #F27865
    position: absolute
    color: white
    border-radius: 50%
    text-align: center

  // .active
    // border-color: #b0b0b0 

</style>

<script>
import Tasks from '@/components/mainTasks/common/Tasks'
export default {
  components:{
    Tasks
  },
  data(){
    return{
      isActive: false,
    }
  },
  methods: {
    onMouseUp(e){ 
      const up = this.$refs.drop
      if (!up.contains(e.target)){
        this.isActive = false
        }
    }
  },

  mounted() { 
    document.addEventListener('mouseup', this.onMouseUp); 
  }
}
</script>