<template>
  <div
    :class="isActive ? 'mytasks active':'mytasks'"
    ref=drop
  >
    <div class="number">
      <span>{{$store.getters.tasks.length}}</span>
    </div>
    <!-- <div v-if="this.$store.getters.user"> -->
      <!-- <v-badge 
        overlap 
        v-if="$store.getters.user"
        v-model="$store.getters.tasks.length" 
      > -->

        <!-- <template v-slot:badge>
          <span>{{$store.getters.tasks.length}}</span>
        </template> -->

        <!-- <v-menu 
          :close-on-content-click="false"
          :nudge-width="200"
        > -->

            <p @click="isActive = !isActive">Мои задачи</p>

          <!-- <div v-if="isActive" class="tasks" > -->
            <tasks v-if="isActive"/>
          <!-- </div> -->

  </div>
</template>

<style lang="sass">
  .mytasks
    position: relative
    border: 1px solid #d7d7d7
    border-radius: 2px
    &:hover
      border: 1px solid #b0b0b0
      transition: 0.3s
    p
      padding: 5px 10px
      color: black
      margin: 0

  .number
    top: -8px
    right: -5px
    // margin-bottom: 50px
    // z-index: 2
    width: 17px
    background: #F27865
    position: absolute
    color: white
    border-radius: 50%
    text-align: center

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