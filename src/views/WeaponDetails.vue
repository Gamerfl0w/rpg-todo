<template>
<div>
 <v-form v-for="player in players" :key="player.id" @submit.prevent="updateWeapon(weapon.damage, player.weapon, weapon.name)">
  <v-card
    class="mx-auto"
    flat
  >
    <v-img
      max-height="150"
              contain
      :src="weapon.src"
    ></v-img>

    <v-card-title>{{ weapon.name }}</v-card-title>

    <v-card-text>

      <div class="black--text">
       {{ weapon.details }}. 
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
          <v-list-item-subtitle>{{ weapon.damage }}</v-list-item-subtitle>
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
          <v-list-item-subtitle>{{ weapon.cost }} Gold</v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>
    </v-list>
    </v-card>

    </v-card-text>

    <v-card-actions v-if="weapon.isBought == false" @click="buyWeapon(player.gold, weapon.cost)">
      <v-btn
       bottom block
        color="green" class="white--text">
        Unlock
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="weapon.isBought == true">
      <v-btn
       bottom block
        color="deep-purple" class="white--text" type="submit">
        Equip
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
import { docId } from "../firebaseDb";

  export default {
    data: () => ({
      weapon: {},
      players: [],
      familiarDmg: '',
      snackbar: false,
      text: `This weapon is already equipped`,
    }),
      created() {
    let dbRef = db.collection("weapons").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.weapon = doc.data();
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
            damage: doc.data().damage,
            familiarDmg: this.familiarDmg = doc.data().familiarDmg,
            weaponDmg: doc.data().weaponDmg,
            });
        });
        });
  },

    methods: {
        updateWeapon(weaponDmg, playerWeapon, weaponName){
          if(playerWeapon != weaponName){
              db.collection("players").doc("1")
                .update({weapon: this.weapon.name, damage: this.familiarDmg + weaponDmg})
                  .then(() => {
                  console.log("Weapon successfully updated!");
                  })
                  .catch((error) => {
                  console.log(error);
                  });
          }else{
              console.log("Weapon already equipped "+ playerWeapon)
              this.snackbar = true
          }
        },

        buyWeapon(gold, cost){
          if(gold >= cost){
            db.collection("players").doc("1")
              .update({gold: gold -= cost})
                .then(() => {
                console.log("Item bought");
                })
                .catch((error) => {
                console.log(error);
                });

            db.collection("weapons").doc(this.$route.params.id)
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