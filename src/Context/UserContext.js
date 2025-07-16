import React, { createContext, useEffect, useState } from 'react';
export const User = createContext()
const UserContext = ({children}) => {
  const [userC  , setUserC] = useState('')

  return <User.Provider value={{userC ,setUserC }}>{children}</User.Provider>


}

export default UserContext;
