import React, { createContext, useState } from 'react';

const AppContext = createContext();

export default function Context({ children }) {
    const [IsAdmin,setAdmin] = useState(true)
    const [LoadingState,SetLoading] = useState(false)
  return (
    <AppContext.Provider value={{IsAdmin,setAdmin,LoadingState,SetLoading}}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
