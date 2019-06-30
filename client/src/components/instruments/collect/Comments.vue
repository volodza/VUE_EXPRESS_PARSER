<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>
          <v-flex xs12>

            <label>Пользователи или сообщества Вконтакте</label>
            
            <v-textarea
              solo
              name="input-7-4"
              label="По одной ссылке или id пользователя/сообщества в строке."             
            ></v-textarea>
            
            <v-divider class="mb-4"></v-divider>

            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Ключевые фразы</strong>
            </div>
            <v-textarea
              rows="3"
              solo
              name="input-7-4"
              label="По одной ключевой фразе в строке"
            ></v-textarea>

            <v-checkbox              
              class="my-0 py-0"
              label= "Точное вхождение ключевых фраз">
            </v-checkbox>

            <v-divider class="mb-4"></v-divider>

          <v-layout row wrap>
            <v-flex xs12 sm6 py-0>
              <p><strong>Пользователи, комментарии которых учитывать</strong>
              Если оставить данный параметр пустым, то будут учтены комментарии всех пользователей.</p>
            </v-flex>
            <v-flex xs12 sm6 py-0>
              
                
                <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="700px"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
         style="text-transform:none;"
          v-on="on"
        >
          Выбрать аудиторию
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Выбор аудитории
        </v-card-title>

       
              <div style="text-align:center;" class="font-weight-medium mb-2"><label>Пользователи или сообщества Вконтакте</label></div>
            <v-textarea
              style="margin:0 30px;" 
              solo
              name="input-7-4"
              label="По одной ссылке или id пользователя в строке."             
            ></v-textarea>

        <v-divider></v-divider>

        <v-card-actions>
        
          <v-btn
            color="primary"
            block
            @click="dialog = false"
          >
            Применить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 
            </v-flex>
            </v-layout> <br>
            
           <div style="text-align:left; " class="font-weight-medium">
                <strong>Период, за который собирать комментарии </strong>
            </div>
            <!-- Календарь от -->
            <v-layout class="mt-0">
              <v-flex xs12 sm6>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="calendar.from"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="calendar.from"
                    label="Начало периода"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="calendar.from" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu1.save(calendar.from)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <!-- Календарь до -->
            <v-flex xs12 sm6>
              <v-menu
                ref="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="calendar.to"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="calendar.to"
                    label="Конец периода"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="calendar.to" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu2.save(calendar.to)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <div style="text-align:left;" class="font-weight-medium mb-1">
          <strong>Количество лайков</strong>
          </div>
            <v-layout row wrap>
            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                label="От"
                v-model="inputs.like.from"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                v-model="inputs.like.to"
                label="До (включительно)"
              ></v-text-field>
            </v-flex>
            </v-layout>

              <div style="text-align:left;" class="font-weight-medium mb-1">
          <strong>Длина комментария (кол-во символов)</strong>
          </div>
            <v-layout row wrap>
            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                label="От"
                v-model="inputs.comment_length.from"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                v-model="inputs.comment_length.to"
                label="До (включительно)"
              ></v-text-field>
            </v-flex>
            </v-layout>

            <div style="text-align:left;" class="font-weight-medium mb-1">
          <strong>Какие комментарии собирать (минимум 1)</strong>
          </div>
            <v-layout row wrap>
            <v-flex xs12 sm6 py-0 > 
              <v-checkbox 
              class="my-0 py-0"
              :label="'К постам'">
            </v-checkbox>
            <v-checkbox 
              class="my-0 py-0"
              :label="'К видеозаписям'">
            </v-checkbox>
            </v-flex>
            <v-flex xs12 sm6 py-0>
              <v-checkbox 
              
              class="my-0 py-0"
              :label="'К фотографиям'">
            </v-checkbox>
            <v-checkbox
              class="my-0 py-0"
              :label="'К товарам'">
            </v-checkbox>
            </v-flex>
            </v-layout>
            

             <v-divider class="mb-4"></v-divider>
            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Название задачи </strong>
            </div>
            <v-text-field solo label="Не обязательно"></v-text-field>

            <v-btn color="primary" block @click="getBirthdays">
            <v-icon>mdi-play</v-icon>
          </v-btn>

            
          </v-flex>         
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 >
        <v-flex class="white">
          <tasks></tasks>
          <div class="title text-xs-center my-2">Как работает этот скрипт?</div>
          <div>
            Вы вводите слово, которое должно присутствовать в названии группы,
            при необходимости указываете расширенные параметры поиска,
            скрипт находит подходящие группы и выдаёт их список в нужном вам формате.
          </div>
          <div>
            При поиске сообществ лучше не выставлять гео в ТХ.
            Даже указание страны сокращает поиск только до групп. 
            Дело в том, что при таком поиске сервис ищет только группы и мероприятия.
            Это обусловлено техническими требованиям ВК. 
            Без гео вы найдете и паблики тоже.
          </div>

          <v-divider></v-divider>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      data () {
    return {dialog: false, 
    

      textarea:{
         users_group:'',
         key_phrases:''
      },

      checkboxes:{
      exact_phrase:false,
      },

      inputs: {
        like: {
          from: null,
          to: null
        },
        comment_length:{
          from: null,
          to: null
        }
      },


        calendar: {
        from: new Date().toISOString().substr(0, 10),
        to: new Date().toISOString().substr(0, 10)
      }
    }
   }
};
</script>