<template>
  <div
    :class="isActive ? 'mytasks activeTask':'mytasks'"
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
    border: 1px solid white
    background: #4b4b4b
    border-radius: 2px
    &:hover
      background: #303030
    p
      padding: 5px 10px
      color: white
      margin: 0
    

  .number
    top: -8px
    right: -5px
    width: 20px
    height: 18px
    background: #f1c893
    position: absolute
    color: black
    border-radius: 50%
    display: flex
    justify-content: center
    span
      position: absolute
      bottom: 0

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
  destroyed() { 
    document.removeEventListener('mouseup', this.onMouseUp); 
  }
}
</script>