<template>
  <v-card 
    flat
    max-width="375"
    class="mx-auto"
  >
  <div v-for="player in players" :key="player.key">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ player.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="black--text">Finish tasks to get rewards and experience.</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey">
        <v-img :src="player.src" contain ></v-img>
        </v-list-item-avatar>
    </v-list-item>

    <v-divider></v-divider>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-account-box
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Name</v-list-item-title>
          <v-list-item-subtitle>{{ player.name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

       <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-heart
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Health</v-list-item-title>
          <v-list-item-subtitle>{{ player.health }}/100</v-list-item-subtitle>
          <v-progress-linear color="red" :value="player.health"></v-progress-linear>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-star-four-points
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Experience</v-list-item-title>
          <v-list-item-subtitle>{{player.exp}}/100</v-list-item-subtitle>
          <v-progress-linear :value="player.exp"></v-progress-linear>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-chart-bar
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Level</v-list-item-title>
          <v-list-item-subtitle>Lvl.{{ player.level }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-gold
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Gold</v-list-item-title>
          <v-list-item-subtitle>{{ player.gold }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-paw
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Current Familiar</v-list-item-title>
          <v-list-item-subtitle>{{ player.familiar }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

       <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-shield-sword
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Equipped Weapon</v-list-item-title>
          <v-list-item-subtitle>{{ player.weapon }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
    </v-list>
  </div>
    
  </v-card>
</template>

<script>
import { db } from "../firebaseDb";

export default {
   data(){
     return {
       players: [],
       weapons: {},
     }
   },
    created() {
         //display data
        db.collection("players").onSnapshot((snapshotChange) => {
        this.players = [];
        snapshotChange.forEach((doc) => {
            this.players.push({
            key: doc.id,
            name: doc.data().name,
            exp: doc.data().exp,
            familiar: doc.data().familiar,
            gold: doc.data().gold,
            health: doc.data().health,
            weapon: doc.data().weapon,
            level: doc.data().level,
            src: doc.data().src,
            });
        });
        });
    },
}
</script>
