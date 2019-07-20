<template>
  <div style="margin-bottom:10px">

    <v-layout 
      style="; background:white; color:#717171; "
      column
      text-xs-center            
      v-for="(item,index) in content"
      :key="item.id"
    >
      <v-layout row >

        <v-flex align-self-center xs2 sm1>
          <v-avatar
            size="30"
            color="grey lighten-4"
          >
            <v-img :src="item.photo_50"></v-img>
          </v-avatar>       
        </v-flex>

        <!-- <v-layout text-xs-left column > -->
        <v-flex xs6 sm6 text-xs-left>

          <a 
            style="font-size:15px; color:#6e9ddb;"
            @click="userInfo(item.id)"
          >
            {{ item.first_name + ' ' + item.last_name }}
          </a>

          <v-flex  style="font-size:12px; margin-top:-3px">
            <v-icon size='15'>mdi-vk</v-icon>
            <a 
              target='_blank'
              :href="'http://vk.com/id'+item.id"
              style="font-size:12px; text-decoration:none;color:#6e9ddb"
            >
              {{ item.id }}
            </a>
          </v-flex>
          
        </v-flex>

        <v-flex  style="font-size:14px" xs1 align-self-center >
          {{item.sex===1?'Жен': item.sex === 2 ? 'Муж' : ''}}
        </v-flex>

        <v-flex style="font-size:14px" xs5 sm2 align-self-center >
          {{item.bdate }} <br/>
          {{ fullYears(item) }}
        </v-flex>

        <v-flex style="font-size:12px" xs3 sm3 align-self-center >
          {{ country(item)}} <br/> {{city(item)}}
        </v-flex>

      </v-layout>    

      <v-layout text-xs-center v-if="taskKey == item.id">
        <!-- {{info}} -->
        <v-progress-circular 
          class="primary--text"
          style="margin:0 auto;"
          :indeterminate="true"
          v-if="info == null"
        ></v-progress-circular>

        <v-layout flex-child wrap v-else>
          <v-flex xs12 sm4 mb-5>
            <v-avatar
              class="mt-5" 
              color="grey lighten-4"
            >
              <v-img style="height:120px; width:120px" :src="info.photo_100"></v-img>
            </v-avatar>       
          </v-flex>

          <v-flex xs12 sm8 style="font-size:14px" text-xs-center>

            <p class="mb-0" v-if="info.status">
              Статус: <strong>{{info.status}}</strong> 
            </p>

            <p class="mb-0" v-if="info.contacts">
              Телефон: <strong>{{info.contacts}}</strong> 
            </p>

            <p class="mb-0" >
              Онлайн: <v-icon style="font-size:13px" >mdi-cellphone</v-icon>             
              <strong>{{ online }}</strong> 
            </p>

            <p class="mb-0" v-if="info.hasOwnProperty('occupation')">
              Занятость: <strong>{{ occupation}}</strong> 
            </p>
            <p class="mb-0" v-if = info.relation>Семейное положение:
               <strong>{{status}}</strong> </p>

            <p class="mb-0 mt-3 iphone">Можно отправить приглашения в друзья:
              <strong>{{info.can_send_friend_request===1?'Да':'Нет'}}</strong> </p>
            <p class="mb-0 iphone">Можно отправить личное сообщение:
              <strong>{{info.can_write_private_message===1?'Да':'Нет'}}</strong> </p>
            <p class="iphone">Можно оставлять записи на стене: 
              <strong>{{info.can_post===1?'Да':'Нет'}}</strong> </p>

            <v-flex v-if="info.hasOwnProperty('counters')">
              <v-layout class="iphone" row>
                <v-flex xs6 sm4>
                  <h2>{{info.counters.albums || 0}}</h2>
                  <span>Фотоальбомов</span>
                </v-flex>

                <v-flex xs6 sm4>
                  <h2>{{info.counters.videos}}</h2>
                  <span>Видеозаписей</span>
                </v-flex>

                <v-flex  xs6 sm4>
                  <h2>{{info.counters.audios}}</h2>
                  <span>Аудиозаписей</span>
                </v-flex>
              </v-layout>

              <v-layout class="iphone" row>
                <v-flex xs6 sm4>
                  <h2>{{info.counters.photos}}</h2>
                  <span>Фотографий</span>
                </v-flex>

                <v-flex xs6 sm4>
                  <h2>{{info.counters.notes}}</h2>
                  <span>Заметок</span>
                </v-flex>

                <v-flex  xs6 sm4>
                  <h2>{{info.counters.groups || 0}}</h2>
                  <span>Сообществ</span>
                </v-flex>
              </v-layout>

              <v-layout class="iphone" row>
                <v-flex xs6 sm4>
                  <h2>{{info.counters.friends}}</h2>
                  <span>Друзей</span>
                </v-flex>

                <v-flex xs6 sm4>
                  <h2>{{info.counters.followers}}</h2>
                  <span>Подписчиков</span>
                </v-flex>

                <v-flex mb-2 xs6 sm4>
                  <h2>{{info.counters.pages}}</h2>
                  <span>Подписок</span>
                </v-flex>
              </v-layout>
            </v-flex>
            
          </v-flex>
        </v-layout> 
        
      </v-layout>
      <divider  style="border-top: 1px dashed #d7d7d7;" v-if="index + 1 < content.length" :key="index"></divider> 
    </v-layout>
  </div>
</template>

<style scoped>
@media screen and (max-width: 320px) {
    .iphone{ font-size:12px;}
 }
strong, h2{
  color:#616161;
 }

</style>

  
  
<script>
  export default {
    data () {
      return {
        taskKey:null,
        info:null
      }
    },
    computed:{
      content (){
        return this.$store.getters.result
      },
      occupation (){
        return this.info.occupation.type === 'work' ? 'Работа'
              :this.info.occupation.type === 'university' ? 'Университет'
              :'Школа'
      },
      online (){
        let ms = new Date(this.info.last_seen.time*1000);
        return this.info.online === 1 ?'Сейчас онлайн'
              : `${(''+ms.getHours()).padStart(2,'0')}:${(''+ms.getMinutes()).padStart(2,'0')} ${(''+ms.getDate()).padStart(2,'0')}.${(''+ms.getMonth()).padStart(2,'0')}.${ms.getFullYear()}`
      },
      status(){
        let arr = [
          "Не женат / Не замужем", "Есть друг / Есть подруга", "Помолвлен / Помолвлена",
          "Женат / Замужем", "Всё сложно", "В активном поиске", "Влюблен / Влюблена",
          "В гражданском браке" 
          ]
        return arr[this.info.relation-1]
      }
    },
    methods:{
      userInfo(id){
        this.info = null;
        if (this.taskKey == id) {
          this.taskKey = null;
        } else {
          this.taskKey = id;
          this.$http.get("http://localhost:3000/api/test/user", {
            params:{
              id
            }
          }).then(res => {
            this.info = res.body;
          });
          
        }
      },
      country (item) {
        let c  ;

        if(item.hasOwnProperty('country')) {
          if(item.country.hasOwnProperty('title')) c = (item.country.title)
        }

        return c
      },
      city (item){
        let ci   ;

        if(item.hasOwnProperty('city')) {
          if(item.city.hasOwnProperty('title')) ci = (item.city.title)
        }

        return ci
        
      },
      fullYears (item) {
        if(!item.bdate || item.bdate.length < 8) return '';
        let arr = item.bdate.split`.`
        let str = `${arr[1]}.${arr[0]}.${arr[2]}`
        let birthdate = new Date(str),
          cur = new Date(),
          diff = cur-birthdate,
          fullYears = Math.floor(diff/31557600000);
        let v = (fullYears%10===0?'лет':fullYears%10===1?'год':fullYears%10<5?'года':'лет')
        return  fullYears + ' ' + v

      }
    }
  }
</script>