<template>
  <div>
    <v-list class="sideText--text" style="padding:0px;">
      <!-- side-header -->
      <!-- <v-list-item  @click="1" :to="'/'" style="height:54px;margin-top:10px" >
        <v-layout >
          <v-list-item-action >
            <img style="height:50px"  src="../assets/logo1.png" alt />
          </v-list-item-action>

          <h1  style="font-size:35px; color:#E87563">
            <strong style="color:#88C8B3">Arrow</strong>Target
          </h1>
        </v-layout>
        <v-icon class="hidden-lg-and-up" @click="$emit('close-sidebar')" right dark>mdi-close</v-icon>

      </v-list-item> -->

      <v-divider class="mb-2 accent"></v-divider>

      <!-- side-content -->
      <v-list-item style="color:#8CCFB9;">
        <strong style="font-size:15px;">ИНСТРУМЕНТЫ</strong>
      </v-list-item>

      <v-list-group  sub-group >
        <template v-slot:activator>
          <v-list-item style="margin-bottom:0">Поиск</v-list-item>
        </template>

        <v-list-item
          style="margin-bottom:0"
          v-for="link in links.search"
          :key="link.title"
          @click="1"
          :to="link.url"
        >
          <v-list-item-action>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="link.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- <v-list-group sub-group >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Сбор</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item
          class="ml-4"
          v-for="link in links.collect"
          :key="link.title"
          @click="1"
          :to="link.url"
        >
          <v-list-item-action>
            <v-icon dark right :color="link.iconColor" v-text="link.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="link.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group sub-group >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Активности</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item class="ml-4" v-for="link in links.activity" :key="link.title" @click="1">
          <v-list-item-action>
            <v-icon dark right v-text="link.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="link.title"></v-list-item-title>
        </v-list-item>
      </v-list-group> -->
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: {
        search: [
          { title: "Сообщества", icon: "mdi-account-multiple", url: "/group" },
          { title: "Пользователи", icon: "mdi-account", url: "/users" },
          { title: "Родители", icon: "mdi-human-male-boy", url: "/parents" },
          { title: "Дни рождения", icon: "mdi-gift-outline", url: "/birthdays" }
        ],
        collect: [
          { title: "Посты", icon: "mdi-account-multiple", url: "/posts" },
          { title: "Друзья", icon: "mdi-account", url: "/friends" },
          {
            title: "Обсуждения",
            icon: "mdi-human-male-boy",
            url: "/Discussions"
          },
          {
            title: "Родственники",
            icon: "mdi-gift-outline",
            url: "/Relatives"
          },
          {
            title: "Участники",
            icon: "mdi-new-box",
            url: "/subscribers",
            iconColor: "red"
          },
          {
            title: "Недавно вступившие",
            icon: "mdi-new-box",
            url: "/recentlyjoin",
            iconColor: "red"
          },
          { title: "Комментарии", icon: "mdi-human-male-boy", url: "/Comments" }
        ],
        activity: [
          { title: "Вступления", icon: "mdi-account-multiple", url: "" },
          { title: "Сообщества", icon: "mdi-account", url: "" }
        ]
      }
    };
  }
};
</script>
