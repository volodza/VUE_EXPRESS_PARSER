<template>
  <div class="userResults">
    <div class="header">
      <div class="headerBtn">
        <p>Пользователи: {{count}}</p>
        <ul>
          <li>ID</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div class="subHeader">
      <div v-if="content == null" class="loading">
        <img src="../../../assets/logo.png" alt />
      </div>
      <!-- <div 
        :class="selectAll ? 'square bg checkAll' : 'square checkAll' " 
        @click="isAllSelected = !isAllSelected"
      >
        <div v-if="selectAll" class="checkmark"></div>
      </div>-->

      <div class="paginator">
        <p-paginator v-if="content" v-model="page" :length="pages"></p-paginator>
      </div>
      <span>Cтраница {{page}} из {{pages}}</span>
    </div>

    <div class="result">
      <ul>
        <li v-for="(item,index) in content" :key="index">
          <div style="display: flex">
            <div class="avatar">
              <v-avatar size="37" color="grey lighten-4">
                <v-img :src="item.photo_50"></v-img>
              </v-avatar>
            </div>
            <div class="info1">
              <div class="userInfo">
                <a @click="userInfo(item.id)">{{ item.first_name + ' ' + item.last_name }}</a>
                <span>
                  <v-icon size="15">mdi-vk</v-icon>
                  <a target="_blank" :href="'http://vk.com/id'+item.id">{{ item.id }}</a>
                </span>
              </div>

              <div class="icon">
                <span>{{item.sex===1?'Жен': item.sex === 2 ? 'Муж' : ''}}</span>
                <span>
                  {{item.bdate }}
                  <br />
                  {{ fullYears(item) }}
                </span>
                <span>
                  {{ country(item)}}
                  <br />
                  {{city(item)}}
                </span>
              </div>
            </div>
          </div>
          <div class="detailedInfo">
      <div  v-if="info == null&&taskKey == item.id" class="loading2">
        <img src="../../../assets/logo.png" alt />
      </div>
            <userInfo :info='info' v-if="taskKey == item.id" />
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<style lang='sass' scoped>
  .userResults
    .header
      position: relative
      height: 100px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      background: #EDEEF0
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


    .subHeader
      display: flex
      justify-content: space-between
      padding-top: 5px 
      background: #EDEEF0
      position: sticky
      z-index: 1
      top: 0 
      // .checkAll
      //   margin: 2px 4px
      //   background: white
      //   position: absolute
      //   left: 1px
      //   bottom: 3px  
      .paginator
        padding-bottom: 5px
        margin: 0 auto
      span
        margin: 2px 4px
        position: absolute
        right: 3px
        bottom: 3px
      .loading
        background: #EDEEF0
        display: flex
        width: 100%
        justify-content: center
        height: 40px
        margin-bottom: 3px
        img
          border-radius: 50%
          height: 35px
          width: 35px
          transform: rotate(720deg)
          animation: target 1s infinite linear        

    .result
      display: flex
      flex-direction: column
      position: relative
      ul
        padding: 0 5px
        background-color: white
        cursor: default
        li
          display: flex
          flex-direction: column
          // align-items: center
          padding: 4px 4px
          border-bottom: 1px dashed #d7d7d7
        li:last-child
          border-bottom: none
      .avatar
        width: 8%
        margin: auto 0
      .info1
        display: flex  
        width: 100%
        align-items: center
        .userInfo
          display: flex
          flex-direction: column
          width: 40%
        .icon
          display: flex
          cursor: pointer
          position: absolute
          left: 50%
          width: 50%
          align-items: center
          justify-content: space-between
          span
            width: 25%
          span:first-child
            width: 20%
          span:last-child
            text-align: center
            width: 50%
              
  .loading2
    background: white
    display: flex
    width: 100%
    justify-content: center
    height: 40px
    margin: 3px 0
    img
      border-radius: 50%
      height: 35px
      width: 35px
      transform: rotate(720deg)
      animation: target 1s infinite linear                
  // .square
  //   cursor: pointer
  //   height: 20px
  //   width: 20px
  //   border: 1px solid #d7d7d7
  //   border-radius: 2px
  //   margin-right: 10px
  //   transition: 0.3s
  //   &:hover
  //     border: 1px solid #b0b0b0    
  // .bg
  //   background: #999999 !important

  // .checkmark
  //   left: 5px
  //   bottom: 1px
  //   top: 1px
  //   position: relative
  //   width: 7px
  //   height: 13px
  //   border: solid white
  //   border-width: 0 2px 2px 0
  //   -webkit-transform: rotate(45deg)
  //   transform: rotate(45deg) 

  @keyframes target 
    from
      transform: rotate(0deg)
    to
      transform: rotate(360deg)
  
  @media screen and (max-width: 600px)
    li
    .info1
      flex-direction: column !important
      align-items: stretch !important
      padding-left: 15px 
      .userInfo
        flex-direction: row !important
        justify-content: space-between
        width: 100% !important
        margin-bottom: 5px
      .icon
        width: 100% !important
        left: auto !important
        position: static !important
        span
          width: 25% !important
        span:first-child
          width: 30% !important
        span:last-child
          margin-left: 10px
          width: 35% !important

    .paginator
      padding-bottom: 13px !important


  

</style>

  
  
<script>
import userInfo from "../userInfo";

export default {
  components: {
    userInfo
  },
  data() {
    return {
      taskKey: null,
      info: null,
      page: 1
    };
  },
  computed: {
    content() {
      return this.$store.getters.result;
    },
    pages() {
      return this.$store.getters.pages;
    },
    count() {
      return this.$store.getters.count;
    }
  },

  watch: {
    page() {
      this.$store.commit("setPage", this.page);
    }
  },

  methods: {
    userInfo(id) {
      this.info = null;
      if (this.taskKey == id) {
        this.taskKey = null;
      } else {
        this.taskKey = id;
        this.$http
          .get("/api/test/user", {
            params: {
              id
            }
          })
          .then(res => {
            this.info = res.body;
          });
      }
    },
    country(item) {
      let c;

      if (item.hasOwnProperty("country")) {
        if (item.country.hasOwnProperty("title")) c = item.country.title;
      }

      return c;
    },
    city(item) {
      let ci;

      if (item.hasOwnProperty("city")) {
        if (item.city.hasOwnProperty("title")) ci = item.city.title;
      }

      return ci;
    },
    fullYears(item) {
      if (!item.bdate || item.bdate.length < 8) return "";
      let arr = item.bdate.split`.`;
      let str = `${arr[1]}.${arr[0]}.${arr[2]}`;
      let birthdate = new Date(str),
        cur = new Date(),
        diff = cur - birthdate,
        fullYears = Math.floor(diff / 31557600000);
      let v =
        fullYears % 10 === 0
          ? "лет"
          : fullYears % 10 === 1
          ? "год"
          : fullYears % 10 < 5
          ? "года"
          : "лет";
      return fullYears + " " + v;
    }
  }
};
</script>