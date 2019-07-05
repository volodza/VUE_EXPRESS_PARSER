<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>

        <label >Пользователи ВКонтакте</label>
          <v-textarea
            solo
            name="input-7-1"
            label="По одной ссылке или id пользователя/сообщества в строке"
          ></v-textarea>
             
            <v-divider class="mb-4"></v-divider>

            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Каких родственников собирать</strong>
            </div>
           <v-select
            solo            
            chips 
            multiple
            item-value="value"
            item-text="title"
            label="dsafsdf"
           :items="selects.typeRelatives.items"
            v-model="selects.typeRelatives.selected"
            ></v-select>

          <v-divider class="mb-4"></v-divider>

            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Название задачи</strong>
            </div>
          <v-text-field  
            solo         
            label="Не обязательно"
          ></v-text-field>


          <v-btn color='primary'
            block
            @click="getGroups"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>

        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white">
          <v-textarea
            name="input-7-1"
            label="Ключевые фразы"
            value
            hint="По одной ключевой фразе в строку"
            v-model="key_phrases"
          ></v-textarea>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      data () {
    return {search: null,

      textarea:{
         value:'',
      },

      selects: {
        typeRelatives: {
          items: [
            { title: "Брат/сестра", id: 0 },
            { title: "Родитель", id: 1 },
            { title: "Ребенок", id: 2 },
            { title: "Дедушка/бабушка", id: 3 },
            { title: "Внук", id: 4 },
            { title: "Однофамильцы", id: 5 }
          ],
          
          selected: ['Брат/сестра']
        }},

    }
   }
};
</script>