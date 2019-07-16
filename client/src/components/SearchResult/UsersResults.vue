 <template>
  <v-flex>
    <v-layout 
      style="border-bottom:1px dashed #d7d7d7"
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

          <a 
            target='_blank' 
            :href="'http://vk.com/id'+item.id"
            style="font-size:12px"
          >
            {{ item.first_name + ' ' + item.last_name }}

          </a>

          <v-flex style="font-size:12px">
            <v-icon size='15'>mdi-vk</v-icon>{{ item.id }}
          </v-flex>
          
        </v-flex>
        <!-- </v-layout> -->
 <v-flex style="font-size:12px" xs1 align-self-center>
              Муж.
              <!-- <v-card  dark tile flat color="blue darken-4">
            <v-card-text>12.12.1912</v-card-text>
              </v-card>-->
            </v-flex>

            <v-flex style="font-size:12px" xs2 align-self-center>
              12.12.1912
              <!-- <v-card  dark tile flat color="blue darken-4">
            <v-card-text>12.12.1912</v-card-text>
              </v-card>-->
            </v-flex>

            <v-flex style="font-size:12px" xs3 align-self-center>Россия, Белая Холуница</v-flex>
        <!-- <v-flex style="font-size:12px"  xs2 align-self-center>
          <v-icon size='15'>mdi-account-search-outline</v-icon>
          {{ item.members_count }}
        </v-flex> -->
        
      </v-layout>
      <!-- <v-divider></v-divider> -->
    </v-layout>
  </v-flex>
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