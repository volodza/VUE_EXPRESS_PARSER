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
            :href="'http://vk.com/public'+item.id"
            style="font-size:12px"
          >
            {{ item.name }}
          </a>

          <v-flex style="font-size:12px">
            <v-icon size='15'>mdi-vk</v-icon>{{ item.id }}
          </v-flex>
          
        </v-flex>
        <!-- </v-layout> -->

        <v-flex style="font-size:12px"  xs2 align-self-center>
          <v-icon size='15'>mdi-account-search-outline</v-icon>
          {{ item.members_count }}
        </v-flex>
        
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