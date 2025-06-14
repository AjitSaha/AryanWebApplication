import { getFirebaseAuth, getFirebaseDb } from "./firebase"

export interface User {
  uid: string
  email: string
  displayName: string
  role: "admin" | "faculty" | "student"
  profileData?: any
}

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: "admin" | "faculty" | "student"
  rollNumber?: string
  department?: string
  course?: string
  semester?: number
  phoneNumber?: string
  address?: string
  profileImage?: string
  createdAt: any
  updatedAt: any
}

// Demo users for testing
const DEMO_USERS = [
  {
    uid: "demo-student-1",
    email: "student@college.edu",
    password: "student123",
    displayName: "John Student",
    role: "student" as const,
    rollNumber: "CS2021001",
    department: "Computer Science",
    course: "B.Tech CSE",
    semester: 6,
  },
  {
    uid: "demo-faculty-1",
    email: "faculty@college.edu",
    password: "faculty123",
    displayName: "Dr. Sarah Professor",
    role: "faculty" as const,
    department: "Computer Science",
  },
  {
    uid: "demo-admin-1",
    email: "admin@college.edu",
    password: "admin123",
    displayName: "Admin User",
    role: "admin" as const,
  },
]

// Check if we should use demo mode
const isDemoMode = () => {
  return (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || !navigator.onLine)
  )
}

// Demo authentication functions
const loginDemo = async (email: string, password: string): Promise<User> => {
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password)
  if (!user) {
    throw new Error("Invalid credentials. Try: student@college.edu / student123")
  }

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    profileData: user,
  }

  // Store in localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("demo-user", JSON.stringify(userData))
  }

  return userData
}

const registerDemo = async (
  email: string,
  password: string,
  displayName: string,
  role: "admin" | "faculty" | "student",
): Promise<User> => {
  // In demo mode, just create a temporary user
  const userData = {
    uid: `demo-${role}-${Date.now()}`,
    email,
    displayName,
    role,
    profileData: {
      uid: `demo-${role}-${Date.now()}`,
      email,
      displayName,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("demo-user", JSON.stringify(userData))
  }

  return userData
}

const logoutDemo = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("demo-user")
  }
}

const getCurrentUserDemo = async (): Promise<User | null> => {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem("demo-user")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

// Firebase authentication functions
export const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  role: "admin" | "faculty" | "student",
  additionalData: Partial<UserProfile> = {},
): Promise<User> => {
  if (isDemoMode()) {
    return registerDemo(email, password, displayName, role)
  }

  const auth = await getFirebaseAuth()
  const db = await getFirebaseDb()

  if (!auth || !db) {
    throw new Error("Firebase services not available")
  }

  try {
    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth")
    const { doc, setDoc, serverTimestamp } = await import("firebase/firestore")

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await updateProfile(user, { displayName })

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...additionalData,
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    return {
      uid: user.uid,
      email: user.email!,
      displayName,
      role,
      profileData: userProfile,
    }
  } catch (error: any) {
    throw new Error(error.message || "Registration failed")
  }
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  if (isDemoMode()) {
    return loginDemo(email, password)
  }

  const auth = await getFirebaseAuth()
  const db = await getFirebaseDb()

  if (!auth || !db) {
    throw new Error("Firebase services not available")
  }

  try {
    const { signInWithEmailAndPassword } = await import("firebase/auth")
    const { doc, getDoc } = await import("firebase/firestore")

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      throw new Error("User profile not found")
    }

    const profileData = userDoc.data() as UserProfile

    return {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || profileData.displayName,
      role: profileData.role,
      profileData,
    }
  } catch (error: any) {
    throw new Error(error.message || "Login failed")
  }
}

export const logoutUser = async (): Promise<void> => {
  if (isDemoMode()) {
    return logoutDemo()
  }

  const auth = await getFirebaseAuth()
  if (!auth) {
    throw new Error("Firebase auth not available")
  }

  try {
    const { signOut } = await import("firebase/auth")
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message || "Logout failed")
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  if (isDemoMode()) {
    return getCurrentUserDemo()
  }

  const auth = await getFirebaseAuth()
  const db = await getFirebaseDb()

  if (!auth || !db) {
    return null
  }

  return new Promise((resolve) => {
    import("firebase/auth").then(({ onAuthStateChanged }) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe()

        if (!firebaseUser) {
          resolve(null)
          return
        }

        try {
          const { doc, getDoc } = await import("firebase/firestore")
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

          if (!userDoc.exists()) {
            resolve(null)
            return
          }

          const profileData = userDoc.data() as UserProfile

          resolve({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || profileData.displayName,
            role: profileData.role,
            profileData,
          })
        } catch (error) {
          console.error("Error getting user profile:", error)
          resolve(null)
        }
      })
    })
  })
}
