import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCMyW_swJU17f119RTSMGfU4Lsm2UNqDHQ",
    projectId: "billordriverapp",
    appId: "1:766708698044:android:8e0f96cfea702ad564f9b9",
    storageBucket: "billordriverapp.firebasestorage.app"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const firestore = getFirestore(app)

export { app, auth, storage, firestore }
