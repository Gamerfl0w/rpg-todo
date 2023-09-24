<template>
<div>
  <v-card
    flat
    class="mx-auto"
    max-width="500"
  >

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(quest, index) in quests" :key="index"
          :cols="quest.flex"
        >
          <v-card @click="questModal = true, getQuestInfo(index)">
            <v-img
              :src="quest.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="quest.name"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

    <!-- Show quest details onclick -->
    <v-dialog v-model="questModal" max-width="500px">
        <v-card  v-for="player in players" :key="player.id">
          <v-card-title>
            {{ questName }}
          </v-card-title>
          <v-card-text>
            <h3 class="black--text">{{ questInfo }}</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="questModal = false">
              Close
            </v-btn>
            <v-btn absolute right color="red" class="white--text" @click="questModal = false; addQuest(player.baseHp)">
              Undertake Quest
            </v-btn>          
          </v-card-actions>
        </v-card>
      </v-dialog>

          <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</div>
</template>

<script>
import { db } from "../firebaseDb";
import { docId } from "../firebaseDb";

 export default {
    data: () => ({
      quests: [
        { id:1, 
          name: 'Defeat King Slime',
          bossName: 'King Slime',
          health: 200, 
          details: "Seven years it has been, seven years since we secured our lands and we could live in peace. But now they are back and they're stronger than ever. Hero, we'll need your help to get rid of those wretched slimes", 
          src: '/bosses/slime-king_static.png',
          gold: 100,
          exp: 200, 
          flex: 12 
        },
        { 
          id:2, 
          name: 'Vanquish the Dragon',
          bossName: 'Idk yet',
          health: 100,  
          details: 'Kill the dragon', 
          src: '/familiars/pyroflame.gif',
          gold: 200,
          exp: 400,  
          flex: 12
        },
      ],
      questModal: false,
      questName: '',
      questInfo: '',
      bossName: '',
      bossHp: '',
      bossSrc: '',
      snackbar: false,
      text: 'Quest Added',
      players: []
    }),
    
    created(){
      db.collection("players").onSnapshot((snapshotChange) => {
        this.players = [];
        snapshotChange.forEach((doc) => {
            this.players.push({
            key: doc.id,
            name: doc.data().name,
            exp: doc.data().exp,
            gold: doc.data().gold,
            health: doc.data().health,
            level: doc.data().level,
            experience: doc.data().experience,
            baseHp: doc.data().baseHp,
            });
        });
        });
    },

    methods: {
      getQuestInfo(index){
        this.questName = this.quests[index].name
        this.bossName = this.quests[index].bossName
        this.questInfo = this.quests[index].details
        this.bossHp = this.quests[index].health
        this.bossSrc = this.quests[index].src
        console.log(this.bossHp)
      },

      addQuest(baseHp){
          db.collection("players").doc("1")
              .update({quest: this.bossName, 
                       enemyBaseHp: this.bossHp, 
                       enemyHp: this.bossHp,
                       bossSrc: this.bossSrc,
                       health: baseHp,
                       })
                .then(() => {
                this.snackbar = true;
                window.location.href = "/battle"
                })
                .catch((error) => {
                console.log(error);
                });        
      }
    }
  }
</script>

<style>

</style>