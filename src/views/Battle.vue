<template>
<div>
  <div v-for="player in players" :key="player.key">
  <div v-if="player.enemyHp > 0 && player.health > 0">
  <v-card
    class="mx-auto"
    flat
  >

    <v-img
      max-height="150"
    contain
    :src="player.bossSrc"
    ></v-img>
    
    <h2 class="text-center">{{ player.quest }}</h2>

     <v-progress-linear
      :value="player.enemyHp"
      color="red"
      height="25"
      class="mb-5"
    >
      <template v-slot:default="{ value }">
        <strong class="white--text">{{ Math.ceil(value) }} / {{ player.enemyBaseHp }} HP</strong>
      </template>
    </v-progress-linear>

    <v-divider></v-divider>

      <v-card
    class="mx-auto"
    max-width="344"
    flat
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-1">
          Character
        </div>
        <v-list-item-title class="text-h5 mb-2">
          {{ player.name }}
        </v-list-item-title>
        <v-list-item-title>Health</v-list-item-title>
          <v-list-item-subtitle>{{ player.health }}/100</v-list-item-subtitle>
          <v-progress-linear color="red" :value="player.health"></v-progress-linear>
      </v-list-item-content>

          <v-list-item-avatar
      class="rounded-lg"
        size="80"
        color="grey">
        <v-img :src="player.src" contain ></v-img>
        </v-list-item-avatar>
    </v-list-item>
    </v-card>

     <v-divider class="mt-3"></v-divider>

     <v-card
    class="mx-auto"
    max-width="344"
    flat
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline">
          Familiar
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ player.familiar }}
        </v-list-item-title>
             <v-list-item-title>Damage:</v-list-item-title>
             <p>100</p>
      </v-list-item-content>

      <v-list-item-avatar
      class="rounded-lg"
        size="80"
        color="blue">
        <v-img :src="player.familiarSrc"></v-img>
        </v-list-item-avatar>
    </v-list-item>
    </v-card>
  </v-card>
    </div>
    </div>

<div v-for="player in players" :key="'A'+player.key">
  <div v-if="player.enemyHp <= 0 && player.health > 0">
  <h2 class="text-center my-5 font-weight-medium">{{ bossName }} Defeated</h2>
  <v-row align="center" class="my-5" justify="center">
      <v-icon color="indigo" size="128">
        mdi-ghost-off
      </v-icon>
  </v-row>

<v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1" :value="AddReward(player.enemyHp)">
          Rewards
        </v-list-item-title>
        <v-list-item-subtitle  class="black--text">Congratulations {{ player.name }}! You Received:</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

     <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-gold
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Gold</v-list-item-title>
          <v-list-item-subtitle>100G</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

       <v-divider></v-divider>

     <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-star-face
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Experience</v-list-item-title>
          <v-list-item-subtitle>200 Exp.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

  </div>
    </div>

    <div v-for="player in players" :key="'B' + player.key">
  <div v-if="player.enemyHp >= 0 && player.health <= 0">
  <h2 class="text-center my-5 font-weight-medium red--text">Game Over, Retry?</h2>
  <v-row align="center" class="my-5" justify="center">
      <v-icon color="indigo" size="128">
        mdi-skull
      </v-icon>
  </v-row>

<v-list-item three-line class="mt-10">
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1" >
          Defeated by
        </v-list-item-title>
        <v-list-item-subtitle  class="black--text">You have been defeated by {{ bossName }}. You lost:</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

     <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-gold
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content class="red--text">
          <v-list-item-title>Gold</v-list-item-title>
          <v-list-item-subtitle class="red--text">- 100G</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    <v-divider></v-divider>

       <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-lightbulb-on-30
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content class="black--text">
          <v-list-item-title>Tip</v-list-item-title>
          <v-list-item-subtitle>Finish tasks to get gold and experience.</v-list-item-subtitle>
          <v-list-item-subtitle>Also, try upgrading your sword and or familiar.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

       <v-card-actions>
      <v-btn
       bottom block
        color="primary" class="white--text" @click="gameOver(player.gold, player.enemyBaseHp, player.baseHp)">
        Retry
      </v-btn>
    </v-card-actions>

  </div>
    </div>
  
  </div>
</template>

<script>
import { consoleInfo } from "vuetify/lib/util/console";
import { db } from "../firebaseDb";
import { docId } from "../firebaseDb";

  export default {
    data: () => ({
      players: [],
      bosses:[],
      bossHp: 0,
      bossDmg: 0,
      playerDmg: 0,
      playerHp: 0,
      baseHp: 0,
      interval: null,
      bossName: null,
    }),
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
            health: this.playerHp = doc.data().health,
            weapon: doc.data().weapon,
            level: doc.data().level,
            familiarSrc: doc.data().familiarSrc,
            enemyHp: this.bossHp = doc.data().enemyHp,
            damage: this.playerDmg = doc.data().damage,
            enemyBaseHp: doc.data().enemyBaseHp,
            src: doc.data().src,
            bossSrc: doc.data().bossSrc,
            quest: this.bossName = doc.data().quest,
            enemyDmg: this.bossDmg = doc.data().enemyDmg,
            baseHp: doc.data().baseHp,
            });
        });
        });

        this.dmgDelay()
        this.AddReward()

    },

      methods: {
        dmgDelay(){
        this.interval = setInterval(() => {
            if(this.bossHp > 0  && this.playerHp > 0 && this.bossName != ''){
               db.collection("players").doc("1")
              .update({enemyHp: this.bossHp -= this.playerDmg, health: this.playerHp -= this.bossDmg})
                .then(() => { 
                console.log("Damage");
                })
                .catch((error) => {
                console.log(error);
                });
                
            }else{

            }}, 5000) 
              
        },

        AddReward(bossHp){
          if(bossHp <= 0){
             db.collection("players").doc("1")
              .update({gold: 2000})
                .then(() => { 
                console.log("Reward Added");
                })
                .catch((error) => {
                console.log(error);
                });
          }
        },

        gameOver(gold, bossHp, playerBaseHp){
          if(gold > 0){
             db.collection("players").doc("1")
              .update({gold: gold -= 100, health: playerBaseHp, enemyHp: bossHp})
                .then(() => { 
                console.log("Reduced gold");
                
                })
                .catch((error) => {
                console.log(error);
                });
          }else{
             db.collection("players").doc("1")
              .update({health: 100})
                .then(() => {
                console.log("no gold");
                
                })
                .catch((error) => {
                console.log(error);
                });
          }
        }
      }
  }
</script>