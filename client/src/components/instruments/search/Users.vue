<template>
  <v-container fluid grid-list-xl>
      <div>
            <h1 class="display-1">Пользователи ВКонтакте</h1>
          </div>
            <v-divider class="my-4" ></v-divider>

    
    <v-layout flex-child wrap>
      <v-flex xs12 md8 d-flex style="border:1px solid #EBEBEB">
        <v-flex class="white" text-xs-center>
          <!-- Textarea -->
           <v-layout row wrap>
             <v-flex xs12 sm6>
          <v-textarea
            solo
            label="Ключевые фразы"
           
            v-model="textarea.value"
          ></v-textarea>
         </v-flex>
         <v-flex xs12 sm6>
          <v-checkbox
            height='6px'
            :label="`Только с фотографией`"
            v-model="checkboxes.hasPhoto"
          ></v-checkbox>

          <v-checkbox
            height='6px'
            :label="`Точное вхождение поисковой фразы`"
            v-model="checkboxes.exactMatch"
          ></v-checkbox>
          </v-flex>
</v-layout>

          
            <v-layout  wrap>
              <v-flex xs6 sm3 >
              <v-text-field
                hide-details
                solo
                label="Возраст от"
                v-model="inputs.age.from"
              ></v-text-field>
            </v-flex>

            <v-flex xs6 sm3 >
              <v-text-field
                hide-details
                solo
                v-model="inputs.age.to"
                label="Возраст до"
              ></v-text-field>
            </v-flex>
            
            <v-flex xs6 sm3 >
              <v-select
                solo
                label="Пол"
                :items="selects.sex.items"
                v-model="selects.sex.selected"
                item-text="title"
                item-value="id"
              ></v-select>
            </v-flex>

             <v-flex xs6 sm3 >
              <v-select
                solo
                label="Семейное положение"
                :items="selects.status.items"
                v-model="selects.status.selected"
                item-text="title"
                item-value="id"
              ></v-select>
              </v-flex>
              </v-layout>

              <div class="font-weight-medium mt-3">Поиск по</div>

   <v-radio-group v-model="radiogroup.selected" row>
            <v-radio label="Интересам" value="interests"></v-radio>
            <v-radio label="Должности" value="position"></v-radio>
            <v-radio label="Месту работы" value="workplace"></v-radio>
            <v-radio label="Религии" value="religion"></v-radio>
            <v-radio label="Имени" value="name"></v-radio>
            <v-radio label="Фамилии" value="surname"></v-radio>
            <v-radio label="Имени + Фамилии" value="name+surname"></v-radio>
            <v-radio label="Статусу" value="status"></v-radio>
            <v-radio label="Имени ребенка" value="childname"></v-radio>
          </v-radio-group>

              <v-layout wrap>
            <v-flex xs12 sm6 >
              <v-autocomplete
                v-model="selects.country.selected"
                :loading="selects.country.loading"
                :items="selects.country.items"
                :search-input.sync="selects.country.search"
                hide-no-data
                hide-details
                item-text="title"
                item-value="id"
                label="Страна"
                solo
              ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm6>
              <v-autocomplete
                :disabled="!selects.country.selected"
                v-model="selects.city.selected"
                :loading="selects.city.loading"
                :items="selects.city.items"
                :search-input.sync="selects.city.search"
                hide-no-data
                hide-details
                item-text="title"
                item-value="id"
                label="Город"
                solo
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <v-list-tile-title>
                      Search for your favorite
                      <strong>Cryptocurrency</strong>
                    </v-list-tile-title>
                  </v-list-tile>
                </template>
                
                <template v-slot:item="{ item }">
                  <v-list-tile-avatar
                    color="indigo"
                    class="headline font-weight-light white--text"
                  >{{ item.title.charAt(0) }}</v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="item.region"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
              
            </v-flex>
            </v-layout>
          


 



  
          


          
        

         

          

         



         <v-divider class="my-4"></v-divider>

<div style="text-align:left;" class="font-weight-medium">
                <strong>Название задачи </strong>
            </div>
          <v-layout wrap>
<v-flex xs12 sm9>
          <v-text-field
            solo
            label="Любое название (для себя)"
          ></v-text-field>
</v-flex>

<v-flex xs12 sm3>
          <v-btn color='secondary' style="font-size:20px; text-transform:none"
            block
            @click="getUsers"
            :loading="!answer"
          >
    
            <v-icon style="margin-right: 5px">mdi-play</v-icon>
            <label>Поиск</label>
          </v-btn>
        </v-flex>
       </v-layout> 

        </v-flex>
      </v-flex>

      <v-flex xs12 md4 d-flex >
        <v-flex style="padding-top: 0"> <h1>Описание</h1>
          <p>Облачный "Поиск групп" осуществляется по базе Segmento Target, 
            способен выдавать до 10 000 результатов (в 10 раз больше чем в API Поиске).
            В базе хранятся группы с количеством участников от 2 пользователей,
            группы с меньшим количеством участников отсутствуют в выдаче.
            База обновляется один раз в 3 дня, это означает что в выдаче могут
            содержаться не самые актуальные результаты. Поиск осуществляется с
            учетом морфологии, однако выдача может несколько отличаться от
            выдачи ВКонтакте, так как алгоритмы текстового поиска не совпадают.
            Инструмент позволяет сохранить контакты групп. Ключевые слова и 
            фразы нужно вводить по одному в строке. Если Вам необходима выдача 
            точь-в-точь как во ВКонтакте — воспользуйтесь API Поиском групп.
            Выдачу можно отсортировать по количеству постов в день, в неделю,
            чтобы выделить группы, в которых ведётся активность. API Поиск работает корректно,
            не смотря на то что устаревший ВК не поддерживается. 
            Если Вы вводите страну либо город — пабликов в выдаче не будет.
            ER=(Лайки+Репосты+Комментарии)/Дни/Участники*100</p>
          </v-flex>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>

export default {
  data () {
    return {

      textarea:{
        value:''
      },

      radiogroup:{
        selected:null
      },

      checkboxes:{
        exactMatch:false,
        hasPhoto:false
      },

      inputs:{
        age:{
          from:null,
          to:null
        }
      },

      selects: {
        sex: {
          items: [
            { title: "Любой", id: 0 },
            { title: "Женский", id: 1 },
            { title: "Мужской", id: 2 }
          ],
          selected: null
        },
        status: {
          items: [
            { title: "Не женат / Не замужем", id: 1 },
            { title: "Есть друг / Есть подруга", id: 2 },
            { title: "Помолвлен / Помолвлена", id: 3 },
            { title: "Женат / Замужем", id: 4 },
            { title: "Всё сложно", id: 5 },
            { title: "В активном поиске", id: 6 },
            { title: "Влюблен / Влюблена", id: 7 },
            { title: "В гражданском браке", id: 8 }
          ],
          selected: null
        },
        country: {
          loading: false,
          items: [],
          selected: null,
          search: null
        },
        city: {
          loading: false,
          items: [],
          selected: null,
          search: null
        }
      },
      search: null

    }
  },
  methods: {

    getUsers() {
      if (!this.selects.city.selected) return;
      let obj = {
        q:this.key_phrases,
        searchBy:this.radiogroup.selected,
        exactMatch:this.checkboxes.exactMatch,
        hasPhoto: +this.checkboxes.hasPhoto,
        ageFrom:+this.inputs.age.from,
        ageTo:+this.inputs.age.to,
        status: this.selects.status.selected,
        sex: this.selects.sex.selected,
        // city: this.selects.city.selected,
        // country: this.selects.country.selected,
        title:'Поиск > Пользователи',
        // user_id:this.$store.getters.user.id,
      };
      this.answer = '';
      this.$http.post("http://localhost:3000/getUsers", obj)
      .then(res => {
        this.answer = res.body;
      })
    },

    getCities(v) {
      if (!this.selects.country.selected) return;
      this.selects.city.loading = true;
      this.$http
        .post("http://89.254.230.243:3000/getCities", {
          q: v
        })
        .then(res => {
          this.selects.city.items = res.body.items;
          this.selects.city.loading = false;
        });
    },

    getCountries(v) {
      this.selects.country.loading = true;
      this.$http
        .post("http://89.254.230.243:3000/getCountries", {
          q: v
        })
        .then(res => {
          this.selects.country.items = res.body.items;
          this.selects.country.loading = false;
        });
    }

  },//конец methods
  watch: {
    "selects.city.search": function(val) {
      val && val !== this.selects.city.selected && this.getCities(val);
    },
    "selects.country.search": function(val) {
      val && val !== this.selects.country.selected && this.getCountries(val);
    }
  },
  computed:{
    key_phrases() {
      return this.textarea.value.split`\n`
    }
  }

}
</script>