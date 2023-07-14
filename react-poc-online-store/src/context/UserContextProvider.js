import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    isRegistered: false,
    setUserRegistered: () => {}
});

export const UserProvider = ({children}) => {
  const userStorage = JSON.parse(localStorage.getItem("user")) || null;
  const [currentUser, setCurrentUser] = useState(userStorage);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
        localStorage.removeItem("user");
    }
  },[currentUser]);

  const value = {currentUser, setCurrentUser, isRegistered, setIsRegistered};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};