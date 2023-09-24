<template>
  <div class="pt-3">
   <v-btn fab @click="addTaskModal = true; note.name = ''; note.difficulty = '';"
      fixed right bottom
      dark
      color="indigo"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
 
  <div v-for="task in tasks" :key="task.key">
      <v-list v-for="player in players" :key="player.key"
      subheader>
      <!-- <v-subheader>Your Tasks</v-subheader> -->
        <v-list-item @click="doneTask(task.id)" :class="{ 'light-blue lighten-4' : task.done }">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox v-model="task.isDone" @click="addReward(task.isDone, player.gold, player.experience, player.level, player.health, player.baseHp)"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{ 'text-decoration-line-through' : task.isDone }">{{ task.name }}</v-list-item-title>
              <v-list-item-subtitle>Rewards: 100G and 100 exp.</v-list-item-subtitle>
            </v-list-item-content>
      
            <v-list-item-action>
              <router-link 
                :to="{ name: 'EditNote', params: { id: task.key } }"
                class="text-decoration-none">
              <v-btn icon>
                <v-icon color="primary lighten-1" >mdi-pencil</v-icon>
              </v-btn>
              </router-link>
            </v-list-item-action>
             

            <v-list-item-action>
              <v-btn @click.stop.prevent="deleteTask(task.key)" icon>
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
                
          </template>
        </v-list-item>
        <v-divider></v-divider>
    </v-list>
  </div>

     <!-- ADD TASK MODAL -->
     <v-dialog
        v-model="addTaskModal"
        max-width="500px">
        <v-form @submit.prevent="onFormSubmit">
        <v-card>
          <v-card-title>
            Add new task
          </v-card-title>
          <v-card-text>
             <v-text-field v-model="note.name" class="pa-3" 
              label="Input task" hide-details clearable>
             </v-text-field>
             <v-select v-model="note.difficulty" :items="difficulties" return-object label="Difficulty" solo></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn absolute right color="primary" @click="addTaskModal= false" type="submit">
              Add
            </v-btn>

            <v-btn color="primary" text @click="addTaskModal= false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
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

  <!-- Reward Modal -->
    <v-dialog v-for="player in players" :key="'A' + player.key"
        v-model="rewardModal"
        max-width="500px">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Rewards</v-toolbar>
            <div class="pt-5 px-5">
              <h4>Good job, {{ player.name }}! You Received:</h4>
            </div>

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

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-star-four-points
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Experience</v-list-item-title>
                <v-list-item-subtitle>100 Exp.</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="rewardModal = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
       </v-dialog>

       <!-- Level up modal -->
    <v-dialog v-for="player in players" :key="'B' + player.key"
        v-model="lvlUpModal"
        max-width="500px">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Level Up!</v-toolbar>
            <div class="pt-5 px-5 mb-5">
              <h4>You are now Level {{ player.level }}. You Received:</h4>
            </div>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-gold
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Gold</v-list-item-title>
                <v-list-item-subtitle>300G</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

             <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-heart
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Health</v-list-item-title>
                <v-list-item-subtitle>+20 Health</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="lvlUpModal = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
       </v-dialog>


</div>
</template>

<script>
import { db } from "../firebaseDb";

export default {
    name: "Todo",
    data() {
        return {
            newTask: "",
            // get and delete notes
            tasks: [],
            snackbar: false,
            text: `Task Added`,
            addTaskModal: false,
            editTaskModal: false,
            notifications: false,
            rewardModal: false,
            lvlUpModal: false,
            sound: true,
            difficulties: ["Easy", "Medium", "Hard", "Legendary"],
            selectedDifficulty: "",
            //for adding notes
            note: {},
            players: [],
        };
    },
    methods: {
        doneTask(id) {
            let task = this.tasks.filter(task => task.id === id)[0];
            task.done = !task.done;
        },
        deleteTask(id) {
            if (window.confirm("Do you really want to delete?")) {
                db.collection("notes")
                    .doc(id)
                    .delete()
                    .then(() => {
                    console.log("Document deleted!");
                })
                    .catch((error) => {
                    console.error(error);
                });
            }
        },
        onFormSubmit(event) {
            event.preventDefault();
            db.collection("notes").add(this.note).then(() => {
                this.note.name = "";
            }).catch((error) => {
                console.log(error);
            });
            this.snackbar = true;
        },

        addReward(isDone, gold, exp, lvl, hp, baseHp){
          if(isDone != false){
            this.rewardModal = true
            db.collection("players").doc("1")
              .update({gold: gold += 100, experience: exp += 100})
              .then(() => {
              console.log("Reward Added: 100");
              })
              .catch((error) => {
              console.log(error);
              });

              if(exp >= 1000){
                  db.collection("players").doc("1")
                    .update({level: lvl += 1, 
                              experience: 0, 
                              gold: gold += 300, 
                              baseHp: baseHp += 20, 
                              health: hp += 20})
                    .then(() => {
                    console.log("Level Up!");
                    this.lvlUpModal = true;
                    })
                    .catch((error) => {
                    console.log(error);
                    });
              }
          }
        }
    },
    created() {
        //display data
        db.collection("notes").onSnapshot((snapshotChange) => {
            this.tasks = [];
            snapshotChange.forEach((doc) => {
                this.tasks.push({
                    key: doc.id,
                    name: doc.data().name,
                    difficulty: doc.data().difficulty,
                    id: doc.id,
                    isDone: doc.isDone,
                });
            });
        });

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
}
</script>
