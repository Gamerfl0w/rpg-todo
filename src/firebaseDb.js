import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDbBbHtG2xoXRapjbZ7GqdTOiktYK1qoLI",
  authDomain: "rpg-to-do-list-a0cc0.firebaseapp.com",
  projectId: "rpg-to-do-list-a0cc0",
  storageBucket: "rpg-to-do-list-a0cc0.appspot.com",
  messagingSenderId: "223680785887",
  appId: "1:223680785887:web:8b0ddea71cb61fca1fe86a",
  measurementId: "G-ZGMFLNYEFH"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()

export const docId = firebase.firestore.FieldPath.documentId()

