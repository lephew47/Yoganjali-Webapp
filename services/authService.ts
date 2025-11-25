// authService.ts

import { User } from "../types";
import { auth, db } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment
} from "firebase/firestore";

export const authService = {
  /** LOGIN USER */
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const profile = await this.getUserProfile(firebaseUser.uid);

      if (!profile) throw new Error("User profile not found.");

      return profile;
    } catch (err: any) {
      if (err.code === "auth/network-request-failed") {
        throw new Error("Unable to connect. Please check your internet connection.");
      }
      throw err;
    }
  },

  /** SIGNUP USER */
  async signup(name: string, email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName: name });

    const newUser: User = {
      name,
      email,
      isPremium: false,
      enrolledCourses: ["c1"],
      progress: { meditationMinutes: 0, sessionsCompleted: 0 },
      dailyProgress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
    };

    await setDoc(doc(db, "users", firebaseUser.uid), newUser);

    return newUser;
  },

  /** LOGOUT */
  async logout() {
    await signOut(auth);
  },

  /** GET USER PROFILE */
  async getUserProfile(uid: string): Promise<User | null> {
    try {
      const docRef = doc(db, "users", uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) return snap.data() as User;

      return null;
    } catch (err: any) {
      if (err.message.includes("offline")) {
        throw new Error("Firestore is offline. Please reconnect.");
      }
      throw err;
    }
  },

  /** UPDATE USER */
  async updateUser(updated: User) {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found.");

    await updateDoc(doc(db, "users", user.uid), { ...updated });
  },

  /** UPDATE USER PROGRESS (Mindfulness Counter) */
  async updateUserProgress(minutes: number) {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in.");

    const dayName = new Date().toLocaleDateString('en-US', { weekday: 'short' }); // "Mon", "Tue"...

    await updateDoc(doc(db, "users", user.uid), {
      "progress.meditationMinutes": increment(minutes),
      "progress.sessionsCompleted": increment(1),
      [`dailyProgress.${dayName}`]: increment(minutes)
    });

    return { dayName, minutes };
  },

  /** ENROLL IN COURSE */
  async enrollInCourse(courseId: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in.");

    await updateDoc(doc(db, "users", user.uid), {
      enrolledCourses: arrayUnion(courseId)
    });
  },

  /** GET CURRENT USER BASIC AUTH DATA */
  getCurrentUser() {
    const user = auth.currentUser;
    return user
      ? { name: user.displayName || "", email: user.email || "", uid: user.uid }
      : null;
  }
};