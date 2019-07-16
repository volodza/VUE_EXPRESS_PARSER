 <template>
<v-app>

    <v-layout 
      style="border-bottom:1px dashed #d7d7d7; background:white;"
      column
      text-xs-center            
     v-for="item in content"
      :key="item.id"
    >
      <v-layout row>

        <v-flex align-self-center xs2 sm1>
          <v-avatar
            size="30"
            color="grey lighten-4"
          >
            <v-img :src="item.photo_50"></v-img>
          </v-avatar>       
        </v-flex>

        <!-- <v-layout text-xs-left column > -->
        <v-flex xs8 sm9 text-xs-left>

<p class="mb-0" style="font-size:15px">
        {{ item.first_name + ' ' + item.last_name }}
</p>


          <v-flex  style="font-size:12px; ">
           
            <v-icon size='15'>mdi-vk</v-icon>
            <a 
             target='_blank'
            :href="'http://vk.com/id'+item.id"
            style="font-size:12px; "
          >{{ item.id }}
            </a>
          </v-flex>
          
        </v-flex>

 <v-flex style="font-size:12px" xs1 align-self-center>
             {{item.sex}}

            </v-flex>

            <v-flex style="font-size:12px" xs2 align-self-center>
              {{item.bdate}}

            </v-flex>

            <v-flex style="font-size:12px" xs3 align-self-center>Россия, Белая Холуница</v-flex>

        
      </v-layout>


  <v-layout text-xs-center>

  <v-flex xs4 >
          <v-avatar
           class="mt-5" 
            color="grey lighten-4"
          >
            <v-img style="height:100px; width:100px" :src="item.photo_50"></v-img>
          </v-avatar>       
  </v-flex>

  <v-flex xs8 style="font-size:15px" text-xs-center>
<p class="mb-0">Статус: <strong>{{item.status}}</strong> </p>
<p class="mb-0">Телефон: <strong>{{item.contacts}}</strong> </p>
<!-- <p>Онлайн: <strong>{{item.online/item.last_seen.time}}</strong> </p> -->
<!-- <p>Деятельность: <strong>{{item.occupation.type}}</strong> </p> -->
<p >Семейное положение: <strong>{{item.relation}}</strong> </p>



<p class="mb-0">Можно отправить приглашения в друзья: <strong>{{item.can_send_friend_request}}</strong> </p>
<p class="mb-0">Можно отправить личное сообщение: <strong>{{item.can_write_private_message}}</strong> </p>
<p >Можно оставлять записи на стене: <strong>{{item.can_post}}</strong> </p>

<v-layout row>
  <v-flex>
    <!-- <h2>{{item.counters.albums}}</h2> -->
<span>Фотоальбомов</span>
  </v-flex>

  <v-flex>
    <!-- <h2>{{item.counters.videos}}</h2> -->
    <span>Видеозаписей</span>
  </v-flex>

  <v-flex>
    <!-- <h2>{{item.counters.audios}}</h2> -->
    <span>Аудиозаписей</span>
  </v-flex>
</v-layout>

<v-layout row>
  <v-flex>
    <!-- <h2>{{item.counters.photos}}</h2> -->
<span>Фотографий</span>
  </v-flex>

  <v-flex>
    <!-- <h2>{{item.counters.notes}}</h2> -->
    <span>Заметок</span>
  </v-flex>

  <v-flex>
    <!-- <h2>{{item.counters.groups}}</h2> -->
    <span>Сообществ</span>
  </v-flex>
</v-layout>

<v-layout row>
  <v-flex>
    <!-- <h2>{{item.counters.friends}}</h2> -->
<span>Друзей</span>
  </v-flex>

  <v-flex>
    <!-- <h2>{{item.counters.followers}}</h2> -->
    <span>Подписчиков</span>
  </v-flex>

  <v-flex mb-2>
    <!-- <h2>{{item.counters.pages}}</h2> -->
    <span>Подписок</span>
  </v-flex>
</v-layout>
  </v-flex>

</v-layout>


    </v-layout>
</v-app>
</template>



<script>
  export default {
    data () {
      return {}
    },
    computed:{
      content (){
        return this.$store.getters.result
      }
    }
  }
</script>