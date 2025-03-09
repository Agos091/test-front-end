import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCMyW_swJU17f119RTSMGfU4Lsm2UNqDHQ",
    projectId: "billordriverapp",
    appId: "1:766708698044:android:8e0f96cfea702ad564f9b9"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }