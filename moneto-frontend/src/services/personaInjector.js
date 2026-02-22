import { db } from "../lib/firebase";
import { doc, getDoc, setDoc, collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";

/**
 * Clone persona template into user's banking data
 */
export async function injectPersona(uid, personaType) {
  // 1️⃣ Fetch persona template
  const personaRef = doc(db, "personas", personaType);
  const personaSnap = await getDoc(personaRef);

  if (!personaSnap.exists()) {
    throw new Error("Persona template not found");
  }

  const persona = personaSnap.data();

  // 2️⃣ Clear existing user data (important when switching persona)
  await clearUserBankingData(uid);

  // 3️⃣ Clone Accounts
  for (const key in persona.accounts) {
    await setDoc(
      doc(db, "users", uid, "accounts", key),
      persona.accounts[key]
    );
  }

  // 4️⃣ Clone Loan
  await setDoc(
    doc(db, "users", uid, "loans", "home_loan"),
    persona.loan
  );

  // 5️⃣ Clone Transactions
  for (let txn of persona.transactions) {
    await addDoc(
      collection(db, "users", uid, "transactions"),
      {
        ...txn,
        createdAt: new Date()
      }
    );
  }

  // 6️⃣ Save persona type in user profile
  await setDoc(
    doc(db, "users", uid),
    { personaType: personaType },
    { merge: true }
  );
}


/**
 * Clears user banking data before injecting new persona
 */
async function clearUserBankingData(uid) {
  const collections = ["accounts", "loans", "transactions"];

  for (let col of collections) {
    const snap = await getDocs(collection(db, "users", uid, col));

    for (let document of snap.docs) {
      await deleteDoc(document.ref);
    }
  }
}