// src/services/personaService.js

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * Fetch financial profile (persona + consent)
 */
export async function getFinancialProfile(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;

  return snapshot.data().financial_profile || null;
}

/**
 * Check if consent is given
 */
export async function hasConsent(uid) {
  const profile = await getFinancialProfile(uid);
  return profile?.consent_given === true;
}

/**
 * Initialize user after consent (default persona = stable)
 */
export async function initializeUserWithConsent(uid) {
  await setDoc(
    doc(db, "users", uid),
    {
      financial_profile: {
        persona: "stable",
        consent_given: true,
        connected_at: new Date()
      }
    },
    { merge: true }
  );
}

/**
 * Update persona when switching profiles
 */
export async function updatePersona(uid, persona) {
  await updateDoc(doc(db, "users", uid), {
    "financial_profile.persona": persona
  });
}