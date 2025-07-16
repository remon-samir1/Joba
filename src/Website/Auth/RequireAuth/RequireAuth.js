import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";

import { Axios } from "../../../components/Helpers/Axios";
import ForbiddenPage from "../ErrorsPages/ForbiddenPage";
import Loading from "../../../components/Loading/Loading";
import { useContext } from "react";
import { User } from "../../../Context/UserContext";

const ReqiureAuth = ({ alowedRole }) => {
  const nav = useNavigate();
  //user
  const userContext = useContext(User)
  const user = userContext.userC
  const setUser = userContext.setUserC
  // const [user, setUser] = useState("");
  // cookie & token
  const cookie = Cookies();
  const token = cookie.get("token");
  //useeffect
  useEffect(() => {
    const fetchAdmin = Axios.get("/admin/edit-profile");
    const fetchStudent = Axios.get("/student/setting");
  
    Promise.allSettled([fetchAdmin, fetchStudent]).then((results) => {
      const [adminResult, studentResult] = results;
  
      if (adminResult.status === "fulfilled" && adminResult.value?.data) {
        setUser('admin');
      } else if (studentResult.status === "fulfilled" && studentResult.value?.data) {
        setUser('student');
      } else {
        nav("/login", { replace: true });
      }
    });
  }, []);
  
  console.log(user);
  
  return token ? (
    user === "" ? (
      <Loading />
    ) :   alowedRole.includes(user) ? (
      <Outlet />
    ) : (
      <ForbiddenPage />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ReqiureAuth;
