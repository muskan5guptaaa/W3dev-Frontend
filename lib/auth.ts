"use client"
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// Signup
export const signup = async (
email: string,
password: string
): Promise<UserCredential> => {
return await createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const login = async (
email: string,
password: string
): Promise<UserCredential> => {
return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
return await signOut(auth);
};