<template>
  <div class="userInfo">
    <!-- <div v-if="info == null" class="loading">
        <img src="../../assets/logo.png" alt />
    </div>-->

    <div class="avatar">
      <!-- <v-avatar > -->
      <img :src="info.photo_100" />
      <!-- </v-avatar> -->
    </div>

    <div class="detailedInfo">
      <p v-if="info.status">
        Статус:
        <strong>{{info.status}}</strong>
      </p>

      <p v-if="info.contacts">
        Телефон:
        <strong>{{info.contacts}}</strong>
      </p>

      <p>
        Онлайн:
        <v-icon v-if="info.online" style="font-size:13px">mdi-cellphone</v-icon>
        <strong>{{ online }}</strong>
      </p>

      <p v-if="info.hasOwnProperty('occupation')">
        Занятость:
        <strong>{{ occupation}}</strong>
      </p>
      <p v-if="info.relation">
        Семейное положение:
        <strong>{{status}}</strong>
      </p>

      <p class="mb-0 mt-3 iphone">
        Можно отправить приглашения в друзья:
        <strong>{{info.can_send_friend_request===1?'Да':'Нет'}}</strong>
      </p>
      <p>
        Можно отправить личное сообщение:
        <strong>{{info.can_write_private_message===1?'Да':'Нет'}}</strong>
      </p>
      <p>
        Можно оставлять записи на стене:
        <strong>{{info.can_post===1?'Да':'Нет'}}</strong>
      </p>

      <ul>
        <li>
          <h2>{{info.counters.albums || 0}}</h2>
          <span>Фотоальбомов</span>
        </li>
        <li>
          <h2>{{info.counters.videos}}</h2>
          <span>Видеозаписей</span>
        </li>
        <li>
          <h2>{{info.counters.audios}}</h2>
          <span>Аудиозаписей</span>
        </li>
        <li>
          <h2>{{info.counters.photos}}</h2>
          <span>Фотографий</span>
        </li>
        <li>
          <h2>{{info.counters.notes}}</h2>
          <span>Заметок</span>
        </li>
        <li>
          <h2>{{info.counters.groups || 0}}</h2>
          <span>Сообществ</span>
        </li>
        <li>
          <h2>{{info.counters.friends}}</h2>
          <span>Друзей</span>
        </li>
        <li>
          <h2>{{info.counters.followers}}</h2>
          <span>Подписчиков</span>
        </li>
        <li>
          <h2>{{info.counters.pages}}</h2>
          <span>Подписок</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .userInfo
    display: flex
    position: relative
    margin-top: 10px
    color: grey
    .loading
      background: #EDEEF0
      display: flex
      width: 100%
      justify-content: center
      height: 40px
      margin-bottom: 3px
      img
        border-radius: 50%
        height: 35px
        width: 35px
        transform: rotate(720deg)
        animation: target 1s infinite linear 
    .avatar
      margin-top: 7px
      margin-left: 7px
      img
        border-radius: 50%
        height: 120px
        width: 120px
    .detailedInfo
      text-align: center
      position: relative
      display: flex
      flex-direction: column
      strong, h2
        color: #494949
      p
        margin: 0
      ul
        background: white
        display: flex
        flex-wrap: wrap
        margin: 5px 0
        justify-content: space-between
        li 
          width: 33%
          margin-top: 5px

  @media screen and (max-width: 600px) 
    .userInfo
      flex-direction: column
      ul
        padding: 0
    .avatar
      text-align: center


  @keyframes target 
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

    
</style>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },

  computed: {
    occupation() {
      return this.info.occupation.type === "work"
        ? "Работа"
        : this.info.occupation.type === "university"
        ? "Университет"
        : "Школа";
    },
    online() {
      let ms = new Date(this.info.last_seen.time * 1000);
      return this.info.online === 1
        ? "Сейчас онлайн"
        : `${("" + ms.getHours()).padStart(2, "0")}:${(
            "" + ms.getMinutes()
          ).padStart(2, "0")} ${("" + ms.getDate()).padStart(2, "0")}.${(
            "" + ms.getMonth()
          ).padStart(2, "0")}.${ms.getFullYear()}`;
    },
    status() {
      let arr = [
        "Не женат / Не замужем",
        "Есть друг / Есть подруга",
        "Помолвлен / Помолвлена",
        "Женат / Замужем",
        "Всё сложно",
        "В активном поиске",
        "Влюблен / Влюблена",
        "В гражданском браке"
      ];
      return arr[this.info.relation - 1];
    }
  },

  methods: {}
};
</script>