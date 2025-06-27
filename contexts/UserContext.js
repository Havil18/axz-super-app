import React, { createContext, useContext, useState } from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, userId, setUserId, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 