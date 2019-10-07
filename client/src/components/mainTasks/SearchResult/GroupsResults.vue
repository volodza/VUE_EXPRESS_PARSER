 <template>
  <div class="groupsResults">  
    <div class="header">
      <div class="headerBtn">
       <p> Cooбщества: {{count}} </p>
        <ul>
          <li>ID</li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <!-- {{notSelected}} -->

       <div class="paginator">
        <p-paginator 
        v-if="content"
        v-model="page"
        :length="pages">
        </p-paginator>
      </div>
      <div v-if="content == null" class="loading">
        <img src="../../../assets/logo.png" alt="">
      </div>
      <div 
        :class="selectAll ? 'square bg checkAll' : 'square checkAll' " 
        @click="isAllSelected = !isAllSelected"
      >
        <div v-if="selectAll" class="checkmark"></div>
      </div>
        <span>Cтраница {{page}} из {{pages}} </span>
      </div>


  <div class="result">
    
    <ul>
      <li
        v-for="item in content"
        :key="item.id"
      >
      <div 
        :class="checkSelected(item)?'square bg':'square'" 
        @click="changeSelect(item)"
      >
        <div v-if="checkSelected(item)" class="checkmark "></div>
      </div>
      <!-- <p-checkbox 
      @click="selectItem(item)"
      

      ></p-checkbox> -->
        <div  class="avatar">
          <v-avatar 
            size="35"
            color="grey lighten-4"
          >
            <v-img :src="item.photo_50"></v-img>
          </v-avatar>
        </div>

          <div class="groupInfo" >
            <a 
            target='_blank' 
            :href="'http://vk.com/public'+item.id"
            style="font-size:12px"
          >
            {{ item.name }}
          </a>
           <div >
          <v-icon size='15'>mdi-vk</v-icon>{{ item.id }}
        </div>
          </div>
          <div class="icon">
            <v-icon size='15'>mdi-account-search-outline</v-icon>
            {{ item.members_count }}
          </div>
       


      </li>


    </ul>

 
  </div>
  </div>
</template>

<style lang="sass" scoped>
  .groupsResults
    .header
      position: relative
      height: 150px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      background: #EDEEF0
      .checkAll
        margin: 2px 4px
        background: white
        position: absolute
        left: 1px
        bottom: 3px        
      span
        margin: 2px 4px
        position: absolute
        right: 3px
        bottom: 3px
      .headerBtn
        border: 1px solid #d7d7d7
        display: flex
        flex-direction: column
        align-items: center
        p
          margin: 2px 10px
        ul
          display: flex
          background: #EDEEF0
          padding: 6px
          padding-top: 0 
          li
            border: 1px solid #d7d7d7
            background: white
            margin-right: 6px
            height: 30px
            width: 30px
            display: flex
            align-items: center
            justify-content: center
          li:last-child
            margin-right: 0
      .paginator
        margin-top: 8px
        margin-bottom: 3px
      

    .result
      display: flex
      flex-direction: column
      position: relative
      top: 10px
      ul
        padding: 0 5px
        background-color: white
        cursor: default
        li
          display: flex
          align-items: center
          padding: 4px 0
          border-bottom: 1px dashed #d7d7d7
        li:last-child
          border-bottom: none
    .avatar
      margin-right: 1vh
    .icon
      display: flex
      cursor: pointer
      position: absolute
      left: 85%
      i
        padding: 0 2px
    .groupInfo
      display: flex
      flex-direction: column
      width: 65%

  .square
    cursor: pointer
    height: 20px
    width: 20px
    border: 1px solid #d7d7d7
    border-radius: 2px
    margin-right: 10px
    transition: 0.3s
    &:hover
      border: 1px solid #b0b0b0    
  .bg
    background: #999999 !important

  .checkmark
    left: 5px
    bottom: 1px
    top: 1px
    position: relative
    width: 7px
    height: 13px
    border: solid white
    border-width: 0 2px 2px 0
    -webkit-transform: rotate(45deg)
    transform: rotate(45deg) 

  .loading
    background: #EDEEF0
    display: flex
    justify-content: center
    height: 40px
    margin-bottom: 3px
    img
      height: 40px
      width: 40px
      transform: rotate(720deg)
      animation: target 1s infinite linear

  @keyframes target 
    from
      transform: rotate(0deg)
    to
      transform: rotate(360deg)
  
  @media screen and (max-width: 600px)
    .icon
      left: 80% !important
    .groupInfo
      width: 57% !important

  
    
</style>

<script>
  export default {
    data () {
      return {
        page: 1,
        areSelected: [],
        areNotSelected:[],
        isAllSelected: true,
        
      }
    },
    computed:{
      content (){
        return this.$store.getters.result
      },
      pages (){
        return this.$store.getters.pages
      },
      count(){
        return this.$store.getters.count
      }, 
      selectAll(){
        return (this.isAllSelected && !this.areNotSelected.length) 
      }
              
    },
    watch: {
      page(){
        this.$store.commit('setPage',this.page);
      },

      isAllSelected(val) {
        val ? this.areNotSelected = [] : this.areSelected = []
      },
    },
    methods:{
      checkSelected(item){
        return this.isAllSelected ? !this.areNotSelected.includes(item.id) : this.areSelected.includes(item.id)
      },
      changeSelect(item){
        if(this.isAllSelected){
          if(this.areNotSelected.includes(item.id)){
            this.areNotSelected=this.areNotSelected.filter(x=>x != item.id)
          } else {
            this.areNotSelected.push(item.id)
          }
        } else {
          if(this.areSelected.includes(item.id)){
            this.areSelected=this.areSelected.filter(x=>x != item.id)
          } else {
            this.areSelected.push(item.id)
          }
        }

      },
      // AllselectItem(content){
      //   this.allSelect=!this.allSelect  
      // }      
    }
    
  }
</script>