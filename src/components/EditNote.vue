<template>
    <v-app>
          <!--EDIT TASK MODAL -->
      <v-form @submit.prevent="onUpdateForm">
        <v-card flat>
          <v-card-title>
            Edit task
          </v-card-title>
          <v-card-text>
             <v-text-field class="pa-3"  v-model="note.name"
              label="Input task" hide-details clearable>
             </v-text-field>
          </v-card-text>
          <v-card-actions>
          <v-btn fixed bottom left color="primary" class="pa-3" text>
            <router-link class="text-decoration-none" to="/todo">
              Close
            </router-link>
            </v-btn>
            <v-btn fixed bottom right color="primary" class="pa-3" type="submit">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      </v-app>
</template>

<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      note: {},
      difficulties: ["Easy", "Medium", "Hard", "Legendary"],
    };
  },
  created() {
    let dbRef = db.collection("notes").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.note = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("notes")
        .doc(this.$route.params.id)
        .update(this.note)
        .then(() => {
          console.log("note successfully updated!");
          this.$router.push("/todo");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>