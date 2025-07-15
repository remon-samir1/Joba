import React, { createContext, useEffect, useState } from "react";
export const StudentSearch = createContext();
const StudentSearchContext = ({ children }) => {
  const [studentSearch, setStudentSearch] = useState("");

  return (
    <StudentSearch.Provider value={{ studentSearch, setStudentSearch }}>
      {children}
    </StudentSearch.Provider>
  );
};

export default StudentSearchContext;
