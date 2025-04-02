import { Route, Routes } from "react-router-dom";
import Landing from "./Website/Landing/Landing";
import Login from "./Website/Auth/Login/Login";
import Register from "./Website/Auth/Register/Register";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import MainAdminPage from "./Dashboard/Admin/Main/MainAdminPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
           {/* Admin Dahboard */}
        <Route path="/admin" element={<AdminDashboard />} >
        <Route path="main" element={<MainAdminPage/> } />
         

        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
