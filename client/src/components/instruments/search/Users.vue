<template>
  <v-container grid-list-xl fluid>
      <div>
            <h1 class="display-1 mb-3">Пользователи ВКонтакте</h1>
          </div>
           

    
    <v-layout flex-child wrap>
      <v-flex xs12 md8  class="border">
        <v-flex class="white" >

          <!-- Textarea -->
           <v-layout row wrap>
             <v-flex xs12 xl6>
               <label>Ключевые слова</label>
          <v-textarea
            rows='4'
            solo
            class="border"
            name="input-7-1"
            label="По одному слову в строке"
            flat
            v-model="textarea.value"
            hide-details
          ></v-textarea>
         </v-flex>

         <v-flex mt-2>
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

            <v-layout wrap>
            <v-flex xs12 sm6 >
              <label>Пол</label>
              <v-select
                solo
                class="border"
                flat
                label="Выберите пол"
                :items="selects.sex.items"
                v-model="selects.sex.selected"
                item-text="title"
                item-value="id"
                hide-details
              ></v-select>
            </v-flex>

             <v-flex xs12 sm6 >
               <label>Семейное положение</label>
              <v-select
                solo
                class="border"
                flat
                label="Выберите семейное положение"
                :items="selects.status.items"
                v-model="selects.status.selected"
                item-text="title"
                item-value="id"
                hide-details
              ></v-select>
              </v-flex>
          
            </v-layout>

            <label>Возраст</label>
            <v-layout wrap>
              <v-flex xs6 sm3 pt-0>               
              <v-text-field 
                class="border"
                hide-details
                solo
                flat
                label="От"
                v-model="inputs.age.from"
              ></v-text-field>
            </v-flex>

            <v-flex xs6 sm3 pt-0>
              <v-text-field 
                class="border"
                hide-details
                solo
                flat
                v-model="inputs.age.to"
                label="До"
              ></v-text-field>
            </v-flex>

            
               <v-flex xs6 sm3 pt-0>
              <v-autocomplete
                class="border"
                flat
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

            <v-flex xs6 sm3 pt-0>
              <v-autocomplete
                class="border"
                flat
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

              <!-- <div class="font-weight-medium mt-3">Поиск по</div> -->
<label>Поиск по</label>
   <v-radio-group v-model="radiogroup.selected" style="margin-top:0px"  row>
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

              
          

         <v-divider class="mb-4"></v-divider>

        <label>Название задачи</label>
        <v-layout wrap>
          <v-flex xs12 sm6 md8 pt-0> 
            <v-text-field
              class="border"
              flat
              solo
              label="Любое название (для себя)"
              hide-details
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md4 pt-0>
            <v-btn 
            class="mt-0"
            style="height:50px;             
            font-size:20px; 
            text-transform:none; 
            background: linear-gradient(160deg,#4f555e,#4f555e,#5c6e68,#7f6b67); 
            color:white"
            block
            flat
            hide-details
            @click="getGroups"
            :loading="!answer">
              <v-icon style="margin-right: 5px">mdi-play</v-icon>
              <label>Начать поиск</label>
            </v-btn>
          </v-flex>
        </v-layout>

        </v-flex>
      </v-flex>

      <v-flex xs12 md4 pt-0>
        <v-flex style="background:#e7fbed" > <h1>Описание</h1>
          <p>В поиске пользователей можно искать людей по полу,
             городу, возрасту, тех, у кого день рождения, семейному положению,
             наличию детей, а так же производить поиск их родственников, 
             вторых половинок и детей. <br><br>
             1. Введите параметры поиска людей <br><br>
             2. Задайте понятное описание задачи, чтобы не забыть, кто у Вас собирается. <br><br>
             3. Нажмите "Добавить задачу" и перейдите к следующей. <br><br>
             При указании возраста, города, семейного положения выдача может
             отличаться от выдачи ВКонтакте, т.к. в базу попадают только те,
             кто не скрыл возраст, семейное положение, город настройками приватности.</p>
          </v-flex>
      </v-flex>


    </v-layout>
  </v-container>
</template>


<style scoped> 
.border{
  border:1px solid #d7d7d7;
}
</style>


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
        city: this.selects.city.selected,
        country: this.selects.country.selected,
        title:'Поиск > Пользователи',
        user_id:this.$store.getters.user.id,
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
