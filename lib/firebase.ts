import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDEjtkkB9EuM1u6_4YhUZELAyznd_Pwuvc",
  authDomain: "travel-a3bef.firebaseapp.com",
  projectId: "travel-a3bef",
  storageBucket: "travel-a3bef.firebasestorage.app",
  messagingSenderId: "357222433099",
  appId: "1:357222433099:web:df57a26456a908aad2a8ce",
  measurementId: "G-QBZGLEMJED",
}

// Initialize Firebase app
let app: FirebaseApp

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
} catch (error) {
  console.error("Firebase app initialization error:", error)
  app = initializeApp(firebaseConfig)
}

// Lazy initialization functions
export const getFirebaseAuth = async () => {
  if (typeof window === "undefined") return null

  try {
    const { getAuth } = await import("firebase/auth")
    return getAuth(app)
  } catch (error) {
    console.error("Firebase Auth initialization error:", error)
    return null
  }
}

export const getFirebaseDb = async () => {
  if (typeof window === "undefined") return null

  try {
    const { getFirestore } = await import("firebase/firestore")
    return getFirestore(app)
  } catch (error) {
    console.error("Firebase Firestore initialization error:", error)
    return null
  }
}

export const getFirebaseStorage = async () => {
  if (typeof window === "undefined") return null

  try {
    const { getStorage } = await import("firebase/storage")
    return getStorage(app)
  } catch (error) {
    console.error("Firebase Storage initialization error:", error)
    return null
  }
}

export default app
