<template>
<div>
 <v-form v-for="player in players" :key="player.id" @submit.prevent="updateFamiliar(familiar.damage, player.familiar, familiar.name, player.damage)">
  <v-card
    class="mx-auto"
    flat
  >
    <v-img
      max-height="150"
              contain
      :src="familiar.src"
    ></v-img>

    <v-card-title>{{ familiar.name }}</v-card-title>

    <v-card-text>

      <div class="black--text">
       {{ familiar.details }}. 
      </div>

    <v-card flat>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-sword
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Damage</v-list-item-title>
          <v-list-item-subtitle>{{ familiar.damage }}</v-list-item-subtitle>
        </v-list-item-content>        
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-gold
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Cost</v-list-item-title>
          <v-list-item-subtitle>{{ familiar.cost }} Gold</v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>
    </v-list>
    </v-card>

    </v-card-text>

    <v-card-actions>
      <v-btn
       bottom block
        color="green" class="white--text" v-if="familiar.isBought == false" @click="buyFamiliar(player.gold, familiar.cost)">
        Unlock
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="familiar.isBought == true">
      <v-btn
       bottom block
        color="deep-purple" class="white--text" type="submit">
        Summon in battle
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-form>

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

  export default {
    data: () => ({
      familiar: {},
      players: [],
      weaponDmg: '',
      snackbar: false,
      text: `This familiar is already in use`,
    }),
      created() {
    let dbRef = db.collection("familiars").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.familiar = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });

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
            familiarSrc: doc.data().familiarSrc,
            damage: doc.data().damage,
            familiarDmg: doc.data().familiarDmg,
            weaponDmg: this.weaponDmg = doc.data().weaponDmg,
            });
        });
        });
  },

    methods: {
        updateFamiliar(familiarDmg, playerFamiliar, familiarName, playerDmg){
            if(familiarName != playerFamiliar){
                db.collection("players").doc("1")
                  .update({familiar: this.familiar.name, damage: this.weaponDmg + familiarDmg, familiarDmg: familiarDmg, familiarSrc: this.familiar.src})
                    .then(() => {
                    console.log("Familiar successfully updated!");
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            }else{
               console.log("Familiar already equipped " + playerFamiliar)
               this.snackbar = true
            }
        },

         buyFamiliar(gold, cost){
          if(gold >= cost){
            db.collection("players").doc("1")
              .update({gold: gold -= cost})
                .then(() => {
                console.log("Familiar bought");
                })
                .catch((error) => {
                console.log(error);
                });

            db.collection("familiars").doc(this.$route.params.id)
              .update({isBought: true})
                .then(() => {
                console.log("isBought = true");
                window.location.reload()
                })
                .catch((error) => {
                console.log(error);
                });  
          }else{
            console.log("Not enough gold");
          }
        }

    },
  }
</script>