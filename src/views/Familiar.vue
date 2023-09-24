<template>
  <v-card
    flat
    max-width="400"
    class="mx-auto"
  >
  
    <v-container>
      <v-row dense>

        <v-col
          v-for="familiar in familiars"
          :key="familiar.key"
          cols="12"
        >
        <router-link class="text-decoration-none" :to="{ name: 'FamiliarDetails', params: { id: familiar.key } }">
          <v-card :color="familiar.bg" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="familiar.name"></v-card-title>

                 <!-- <v-card-subtitle>Not in Battle</v-card-subtitle> -->

                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                  >
                    Damage: {{ familiar.damage }}
                  </v-btn>
              </div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="familiar.src"></v-img>
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
        familiars: [],
    }),
    methods: {
    },
    created() {
      db.collection("familiars").orderBy('damage').onSnapshot((snapshotChange) => {
        this.familiars = [];
        snapshotChange.forEach((doc) => {
          this.familiars.push({
            key: doc.id,
            name: doc.data().name,
            bg: doc.data().bg,
            src: doc.data().src,
            details: doc.data().details,
            damage: doc.data().damage,
            cost: doc.data().cost,
          });
        });
      });
    },
}
  
</script>