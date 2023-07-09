import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // user var below comes from the onAuthStateChanged func provided by firebase. The lambda passed below to onAuthStateChanged thus has access to this variable
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user); // will set to a user on log-ing, or null if there is a log out
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
