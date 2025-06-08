// app/lib/firebase/authContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, getUserRole } from "./firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading untuk status autentikasi awal
  const [userRole, setUserRole] = useState(null); // Role user: null, 'member', 'admin'
  const [roleLoading, setRoleLoading] = useState(false); // NEW: Loading khusus untuk role

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setRoleLoading(true); // Start role loading
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user.uid, result.user.email);
      const role = await getUserRole(result.user.uid); // Fetch role immediately after creation/login
      setUserRole(role);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setUser(null); // Pastikan user direset jika login gagal
      setUserRole(null);
    } finally {
      setLoading(false);
      setRoleLoading(false); // End role loading
    }
  };

  const signOutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setRoleLoading(true); // Start loading role when user detected
        try {
          const role = await getUserRole(currentUser.uid);
          setUserRole(role);
          console.log("Auth state changed. User:", currentUser.email, "Role:", role);
        } catch (error) {
          console.error("Error fetching user role on auth state change:", error);
          setUserRole("member"); // Default to member if error fetching role
        } finally {
          setRoleLoading(false); // End loading role
        }
      } else {
        setUserRole(null); // No user, no role
        setRoleLoading(false); // End loading
        console.log("Auth state changed. No user.");
      }
      setLoading(false); // End overall auth loading
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading, // Overall authentication status loading
    userRole,
    roleLoading, // NEW: Loading status specifically for user role
    signInWithGoogle,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
