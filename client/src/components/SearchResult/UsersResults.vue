 <template>
<v-expansion-panel>
    <v-expansion-panel-content
       v-for="item in content"
      :key="item.id"
    >
      <template v-slot:header>

    <v-layout 
      style="border-bottom:1px dashed #d7d7d7"
      column
      text-xs-center            
     
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


          <v-flex  style="font-size:12px">
           
            <v-icon size='15'>mdi-vk</v-icon><a 
            
            :href="'http://vk.com/id'+item.id"
            style="font-size:12px"
          >{{ item.id }}
            </a>
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

</template>

 <v-card>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
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