<template>
  <div>
    <h1>Родители</h1>

    <div class="Parents">
      <div class="content flex">
        <div class="layout input">
          <div class="flex">
            <label>Возраст родителей</label>
            <p-input label="От" v-model="inputs.parentAge.from"></p-input>
          </div>
          <div class="flex">
            <p-input v-model="inputs.parentAge.to" label="До"></p-input>
          </div>

          <div class="flex">
            <label>Возраст ребенка</label>
            <p-input label="От" v-model="inputs.childAge.from"></p-input>
          </div>
          <div class="flex">
            <p-input v-model="inputs.childAge.to" label="До"></p-input>
          </div>
        </div>

        <div class="layout sel">
          <div class="flex">
            <label>Пол</label>
            <p-select
              label="Выберите пол"
              :items="selects.sex.items"
              v-model="selects.sex.selected"
            ></p-select>
          </div>

          <div class="flex">
            <label>Семейное положение</label>
            <p-select
              label="Выберите семейное положение"
              :items="selects.status.items"
              v-model="selects.status.selected"
            ></p-select>
          </div>
        </div>

        <!-- <v-divider class="my-3"></v-divider> -->

        <div class="layout">
          <div class="flex checkB">
            <p-checkbox :label="`Родители только с фотографией`" v-model="checkboxes.hasPhoto"></p-checkbox>
          </div>

          <div class="flex geo">
            <p-autocomplete
              v-model="selects.country.selected"
              :loading="selects.country.loading"
              :items="selects.country.items"
              :search-input.sync="selects.country.search"
              label="Страна"
            ></p-autocomplete>
          </div>

          <div class="flex geo">
            <p-autocomplete
              :disabled="!selects.country.selected"
              v-model="selects.city.selected"
              :loading="selects.city.loading"
              :items="selects.city.items"
              :search-input.sync="selects.city.search"
              label="Город"
            >
              <template v-slot:no-data>
                <v-list-tile>
                  <v-list-tile-title>
                    Search for your favorite
                    <strong>Cryptocurrency</strong>
                  </v-list-tile-title>
                </v-list-tile>
              </template>
              <!-- <template v-slot:selection="{ item, selected }">
        <div class="subheading font-weight-light">{{item.title}}</div>
              </template>-->
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
            </p-autocomplete>
          </div>
        </div>

        <div class="layout goTask">
          <div class="taskName flex">
            <label>Название задачи</label>
            <p-input
              class="border"
              v-model="inputs.taskTitle"
              flat
              solo
              label="Любое название (для себя)"
              hide-details
            ></p-input>
          </div>

          <div class="flex go">
            <p-btn dark @click="getGroups">Начать поиск</p-btn>
          </div>
        </div>
      </div>

      <div class="descriptions flex">
        <h1>Описание</h1>
        <p>
          В поиске пользователей можно искать людей по полу,
          городу, возрасту, тех, у кого день рождения, семейному положению,
          наличию детей, а так же производить поиск их родственников,
          вторых половинок и детей.
          <br />
          <br />1. Введите параметры поиска людей
          <br />
          <br />2. Задайте понятное описание задачи, чтобы не забыть, кто у Вас собирается.
          <br />
          <br />3. Нажмите "Добавить задачу" и перейдите к следующей.
          <br />
          <br />При указании возраста, города, семейного положения выдача может
          отличаться от выдачи ВКонтакте, т.к. в базу попадают только те,
          кто не скрыл возраст, семейное положение, город настройками приватности.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='sass' scoped>
  .Parents
    flex-wrap: wrap
    padding: 0 12px
    display: flex
    align-items: flex-start
    .content
      display: flex
      flex-direction: column
      background: white
      flex: 2
      .goTask
        .taskName
          flex-basis: 70% 
        .go
          flex-basis: 30% 
    .descriptions
      background: white
      margin-left: 24px
      flex: 1

  .input
    .flex
      flex-basis: 25% 

  .sel
    .flex
      flex-basis: 50%      
    
  .checkB
    flex-basis: 50%
    margin: auto 0
  .geo
    flex-basis: 25%

  .layout
    display: flex
    flex-wrap: wrap
    align-items: flex-end

  .flex
    padding: 12px
    display: flex
    flex-direction: column  

  h1  
    font-size: 40px
    padding-left: 12px  

  @media screen and (max-width: 600px)
    .input
      .flex
        flex-basis: 50% 
    .checkB
      flex-basis: 100%    
    .goTask
      .taskName
        flex-basis: 65% !important
      .go
        flex-basis: 40% !important       

  @media screen and (max-width: 992px)
    .content
      min-width: 100%   
</style>

<script>
export default {
  data() {
    return {
      search: null,
      calendar: {
        from: new Date().toISOString().substr(0, 10),
        to: new Date().toISOString().substr(0, 10)
      },
      checkboxes: {
        hasPhoto: true
      },
      inputs: {
        childAge: {
          from: null,
          to: null
        },
        parentAge: {
          from: null,
          to: null
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
      answer: "Ответ тут",
      value: null
    };
  },
  methods: {
    getParents() {
      if (!this.selects.city.selected) return;
      let obj = {
        childAgeFrom: +this.inputs.childAge.from,
        childAgeTo: +this.inputs.childAge.to,
        parentAgeFrom: +this.inputs.parentAge.from,
        parentAgeTo: +this.inputs.parentAge.to,
        sex: this.selects.sex.selected,
        city: this.selects.city.selected,
        country: this.selects.country.selected,
        hasPhoto: +this.checkboxes.hasPhoto,
        status: this.selects.status.selected,
        user_id: this.$store.getters.user.id,
        title: this.inputs.taskTitle || "Поиск > Родители"
      };
      this.answer = "";
      this.$http.post("api/search/parents", obj).then(res => {
        this.answer = res.body;
      });
    },
    getCities(v) {
      if (!this.selects.country.selected) return;
      this.selects.city.loading = true;
      this.$http
        .get("/api/geolocation/cities", {
          params: {
            q: v,
            country_id: this.selects.country.selected
          }
        })
        .then(res => {
          this.selects.city.items = res.body.items;
          this.selects.city.loading = false;
        });
    },
    getCountries(v) {
      this.selects.country.loading = true;
      this.$http
        .get("/api/geolocation/countries", {
          params: {
            q: v
          }
        })
        .then(res => {
          this.selects.country.items = res.body.items;
          this.selects.country.loading = false;
        });
    }
  },
  // computed:{
  //   cities () {
  //       this.selects.city.ids = {}
  //       this.selects.city.items.forEach(x=>this.selects.city.ids[x.title] = x.id)
  //     return this.selects.city.items.map(x=>x.title + (x.area ? ' | ' + x.area : '') + (x.region?' | ' + x.region:'') )
  //   },
  //   countries () {
  //      this.selects.country.ids = {}
  //       this.selects.country.items.forEach(x=>this.selects.country.ids[x.title] = x.id)
  //     return this.selects.country.items.map(x=>x.title)
  //   }
  // },
  watch: {
    "selects.city.search": function(val) {
      val && val !== this.selects.city.selected && this.getCities(val);
    },
    "selects.country.search": function(val) {
      val && val !== this.selects.country.selected && this.getCountries(val);
    }
  }
};
</script>
