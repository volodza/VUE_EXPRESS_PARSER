<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>
          <v-flex xs12>
        <label>Сообщества ВКонтакте</label>
            <v-textarea
              solo
              name="input-7-4"
              label="По одной ссылке или id сообщества в строке"
            ></v-textarea>

            <v-divider class="mb-4"></v-divider>

            <div class="mb-1" style="text-align:left;"><strong >Ключевые слова в названиях топиков</strong></div>
            <v-textarea
              rows="3"
              solo
              name="input-7-4"
              label="По одному ключевому слову/фразе в строке"
            ></v-textarea>

            <div class="mb-1" style="text-align:left;"><strong >Минус слова в названиях топиков</strong></div>
             <v-textarea
              rows="3"
              solo
              name="input-7-4"
              label="По одному минус слову/фразе в строке"
            ></v-textarea>

            <div class="mb-1" style="text-align:left;"><strong >Ключевые слова в сообщениях</strong></div>
             <v-textarea
              rows="3"
              solo
              name="input-7-4"
              label="По одному ключевому слову/фразе в строке"
            ></v-textarea>

            <div class="mb-1" style="text-align:left;"><strong >Минус слова в сообщениях</strong></div>
             <v-textarea
              rows="3"
              solo
              name="input-7-4"
              label="По одному минус слову/фразе в строке"
            ></v-textarea>

            <v-checkbox 
              :label="'Точное вхождение поисковой фразы'">
            </v-checkbox>

            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Автор сообщения</strong>
            </div>
            <v-select
            solo
            item-value="value"
            item-text="title"
            label="Любой"
           :items="selects.Author.items"
            v-model="selects.Author.selected"
           ></v-select>

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
          <strong>Длина сообщения</strong>
          </div>
            <v-layout row wrap>
            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                label="От"
                v-model="inputs.Message_length.from"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                v-model="inputs.Message_length.to"
                label="До (включительно)"
              ></v-text-field>
            </v-flex>
            </v-layout>

            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Период, за который собирать сообщения в обсуждениях </strong>
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

  <v-divider class="mb-4"></v-divider>
            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Название задачи </strong>
            </div>
            <v-text-field solo label="Название задачи"></v-text-field>

            <v-btn color="primary" block @click="getBirthdays">
            <v-icon>mdi-play</v-icon>
          </v-btn>

          </v-flex>         
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white">
           <tasks></tasks>
          <div class="title text-xs-center my-2"></div>
          <div>
      
             
          </div>
          <div>
    
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
    return {search: null,

      textarea:{
         key_phrases:'',
         word_topic:'',
         minus_word_topic:'',
         word_message:'',
         minus_word_message:''
      },

      checkboxes:{
      exact_phrase:false
      },

      selects: {
        Author: {
          items: [
            { title: "Любой", id: 0 },
            { title: "Пользователи", id: 1 },
            { title: "Сообщества", id: 2 }
          ],
          selected: null
        }},

         inputs: {
        like: {
          from: null,
          to: null
        },
        Message_length:{
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
</script>}