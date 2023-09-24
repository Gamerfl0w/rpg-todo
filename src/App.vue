<template>
   <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            RPG To-Do List
          </v-list-item-title>
          <v-list-item-subtitle>
            What's your next move, Hero?
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          :routeName="item.routeName"
          @click="header = item.routeName"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

      <v-app-bar
      app
      dark
      color="primary"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
       {{ header }}
      </v-app-bar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import CreateNote from './components/EditNote.vue'

  export default {
  components: { CreateNote },
    data: () => ({
        drawer: null,
        items: [
            { title: "Character Stats", icon: "mdi-account-details", to: "/", routeName: "Your Stats", name:'Anon' },
            { title: "To-Do List", icon: "mdi-format-list-checks", to: "/todo", routeName: "To-Do List" },
            { title: "Weapon", icon: "mdi-sword", to: "/weapon", routeName: "Weapons" },
            { title: "Familiar", icon: "mdi-paw", to: "/familiar", routeName: "Familiars" },
            { title: "Quest", icon: "mdi-script-text", to: "/quest", routeName: "Quest" },
             { title: "Battle", icon: "mdi-sword-cross", to: "/battle", routeName: "Battle" },
        ],
        header: "Your Stats",
    }),

}
</script>

<style>

</style>