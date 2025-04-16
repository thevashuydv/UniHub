import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that wraps the app and provides auth context
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  // Sign up function
  async function signup(email, password, firstName, lastName) {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`,
        role: 'user',
        createdAt: new Date().toISOString(),
        followedClubs: [],
        attendingEvents: []
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  // Sign up as club admin
  async function signupAdmin(email, password, firstName, lastName, clubInfo) {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      
      // Create admin user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`,
        role: 'admin',
        createdAt: new Date().toISOString(),
        clubId: null // Will be updated when club is created
      });
      
      // If club info is provided, create the club
      if (clubInfo) {
        const clubRef = doc(db, "clubs", user.uid); // Using user ID as club ID for simplicity
        await setDoc(clubRef, {
          id: user.uid,
          name: clubInfo.name,
          description: clubInfo.description,
          category: clubInfo.category,
          foundedYear: clubInfo.foundedYear || new Date().getFullYear(),
          meetingSchedule: clubInfo.meetingSchedule || '',
          logoUrl: clubInfo.logoUrl || '',
          adminId: user.uid,
          memberCount: 1,
          members: [user.uid],
          followers: [user.uid],
          createdAt: new Date().toISOString()
        });
        
        // Update user with club ID
        await setDoc(doc(db, "users", user.uid), {
          clubId: user.uid
        }, { merge: true });
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  // Sign in function
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
  
  // Sign out function
  async function logout() {
    return signOut(auth);
  }
  
  // Get user role from Firestore
  async function getUserRole(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return null;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  }
  
  // Effect to handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user role from Firestore
        const role = await getUserRole(user.uid);
        setUserRole(role);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    
    // Cleanup subscription
    return unsubscribe;
  }, [auth]);
  
  // Context value
  const value = {
    currentUser,
    userRole,
    isAdmin: userRole === 'admin',
    isUser: userRole === 'user',
    signup,
    signupAdmin,
    login,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
