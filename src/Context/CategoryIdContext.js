import React, { createContext, useEffect, useState } from 'react';
export const Category = createContext()
const CategoryIdContext = ({children}) => {
  const [categoryId  , setcategoryId] = useState('')

  return <Category.Provider value={{categoryId ,setcategoryId }}>{children}</Category.Provider>


}

export default CategoryIdContext;
