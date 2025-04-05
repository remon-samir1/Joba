import { Route, Routes } from "react-router-dom";
import Landing from "./Website/Landing/Landing";
import Login from "./Website/Auth/Login/Login";
import Register from "./Website/Auth/Register/Register";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import MainAdminPage from "./Dashboard/Admin/Main/MainAdminPage";
import Courses from "./Dashboard/Admin/Courses/Courses";
import Categories from "./Dashboard/Admin/Categories/Categories";
import UpdateCategory from "./Dashboard/Admin/Categories/UpdateCategory/UpdateCategory";
import SubCategory from "./Dashboard/Admin/Categories/SubCategory/SubCategory";
import Levels from "./Dashboard/Admin/Levels/Levels";
import UpdateLevel from "./Dashboard/Admin/Levels/UpdateLevel/UpdateLevel";
import AddLevel from "./Dashboard/Admin/Levels/AddLevel/AddLevel";
import CourseReview from "./Dashboard/Admin/CourseReview/CourseReview";
import BlogsCategory from "./Dashboard/Admin/BlogsCategory/BlogsCategory";
import AddBlogsCategory from "./Dashboard/Admin/BlogsCategory/AddBlogsCategory/AddBlogsCategory";
import UpdateBlogsCategory from "./Dashboard/Admin/BlogsCategory/UpdateBlogsCategory/UpdateBlogsCategory";
import PostList from "./Dashboard/Admin/PostList/PostList";
import AddPost from "./Dashboard/Admin/PostList/AddPost/AddPost";
import UpdatePost from "./Dashboard/Admin/PostList/UpdatePost/UpdatePost";
import PostComments from "./Dashboard/Admin/PostComments/PostComments";
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
        <Route path="courses" element={<Courses/> } />
        <Route path="Categories" element={<Categories/> } />
        <Route path="/admin/Categories/update" element={<UpdateCategory/> } />
        <Route path="/admin/Categories/sub-category" element={<SubCategory/> } />
        <Route path="Levels" element={<Levels/> } />
        <Route path="/admin/Levels/update" element={<UpdateLevel/> } />
        <Route path="/admin/Levels/Add" element={<AddLevel/> } />
        <Route path="Course-Review" element={<CourseReview/> } />
        <Route path="Blogs-Category" element={<BlogsCategory/> } />
        <Route path="/admin/Blogs-Category/add" element={<AddBlogsCategory/> } />
        <Route path="/admin/Blogs-Category/update" element={<UpdateBlogsCategory/> } />
         <Route path="post-list" element={<PostList/>} />
         <Route path="/admin/post-list/add" element={<AddPost/>} />
         <Route path="/admin/post-list/update" element={<UpdatePost/>} />
         <Route path="Post-comments" element={<PostComments/>} />
         

        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
