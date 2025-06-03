'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase.config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";


const AuthContext = createContext();

const MySwal = withReactContent(Swal);

export const useAuth = () => useContext(AuthContext);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // Register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };






  // Listen to auth changes
  useEffect(() => {
 
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



 useEffect(() => {
  if (user?.email) {
    const fetchSingleUser = async () => {
      try {
        const res = await axios.get(`https://babynamegenarate.vercel.app/users/email/${user?.email}`);
        setRole(res?.data.role);
      } catch (err) {
        console.error('Error fetching user:', err);
        MySwal.fire('Error', 'Failed to fetch user', 'error');
      }
    };

    fetchSingleUser();
  }
}, [user]);
console.log("User role:", role);



  const authValue = {
    user,
    role,
    loading,
    register,
    login,
    googleLogin,
    setLoading,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
