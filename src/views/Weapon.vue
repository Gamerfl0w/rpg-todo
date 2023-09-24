<template>
  <v-card
    flat
    max-width="400"
    class="mx-auto"
  >

    <v-container>
      <v-row dense>
        <v-col
          v-for="weapon in weapons"
          :key="weapon.key"
          cols="12"
        >
        <router-link class="text-decoration-none" :to="{ name: 'WeaponDetails', params: { id: weapon.key } }">
          <v-card :color="weapon.bg" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="weapon.name"></v-card-title>

                 <!-- <v-card-subtitle>{{ isEquipped }}</v-card-subtitle> -->

                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                  >
                    Damage: {{ weapon.damage }}
                  </v-btn>
              </div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="weapon.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { db } from "../firebaseDb";

export default {
    data: () => ({
        weapons: [],
        players: [],
        name:'',
        isEquipped: '',
    }),
    methods: {
    },
    created() {
      db.collection("weapons").orderBy('damage').onSnapshot((snapshotChange) => {
        this.weapons = [];
        snapshotChange.forEach((doc) => {
          this.weapons.push({
            key: doc.id,
            name: doc.data().name,
            bg: doc.data().bg,
            src: doc.data().src,
            details: doc.data().details,
            damage: doc.data().damage,
            isEquipped: doc.data().isEquipped,
            isBought: doc.data().isBought,
          });
        });
      });

    },
}
  
</script>