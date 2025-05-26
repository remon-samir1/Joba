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
import CourseReviewDetails from "./Dashboard/Admin/CourseReview/CourseReviewDetails/CourseReviewDetails";
import OrderHistory from "./Dashboard/Admin/OrderHistory/OrderHistory";
import OrderDetails from "./Dashboard/Admin/OrderHistory/OrderDetails/OrderDetails";
import PendingPayment from "./Dashboard/Admin/PandingPayment/PandingPayment";
import AllStudents from "./Dashboard/Admin/AllStudents/AllStudents";
import StudentsDetails from "./Dashboard/Admin/AllStudents/StudentsDetails/StudentsDetails";
import Instructors from "./Dashboard/Admin/Instructors/Instructors";
import InstructorsDetails from "./Dashboard/Admin/Instructors/InstructorsDetails/InstructorsDetails";
import ActiveUsers from "./Dashboard/Admin/ActiveUsers/ActiveUsers";
import NonVerifiedUsers from "./Dashboard/Admin/NonVerifiedUsers/NonVerifiedUsers";
import BannedUsers from "./Dashboard/Admin/BannedUsers/BannedUsers";
import SendbulkMail from "./Dashboard/Admin/SendbulkMail/SendbulkMail";
import WithdrawMethod from "./Dashboard/Admin/WithdrawMethod/WithdrawMethod";
import UpdateWithdrawMethod from "./Dashboard/Admin/WithdrawMethod/UpdateWithdrawMethod/UpdateWithdrawMethod";
import AddWithdrawMethod from "./Dashboard/Admin/WithdrawMethod/AddWithdrawMethod/AddWithdrawMethod";
import WidthdrawRequest from "./Dashboard/Admin/WidthdrawRequest/WidthdrawRequest";
import CertificateBuilder from "./Dashboard/Admin/CertificateBuilder/CertificateBuilder";
import Profile from "./Dashboard/Admin/Profile/Profile";
import Setting from "./Dashboard/Admin/Setting/Setting";
import AddCategory from "./Dashboard/Admin/Categories/AddCategory/AddCategory";
import AddCourse from "./Dashboard/Admin/Courses/AddCourse/AddCourse";
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
        <Route path="/admin/courses/add" element={<AddCourse/> } />
        <Route path="Categories" element={<Categories/> } />
        <Route path="/admin/Categories/update/:id" element={<UpdateCategory/> } />
        <Route path="/admin/Categories/add" element={<AddCategory/> } />
        <Route path="/admin/Categories/sub-category" element={<SubCategory/> } />
        <Route path="Levels" element={<Levels/> } />
        <Route path="/admin/Levels/update/:id" element={<UpdateLevel/> } />
        <Route path="/admin/Levels/Add" element={<AddLevel/> } />
        <Route path="Course-Review" element={<CourseReview/> } />
        <Route path="/admin/Course-Review/view/:id" element={<CourseReviewDetails/>} />
        <Route path="Blogs-Category" element={<BlogsCategory/> } />
        <Route path="/admin/Blogs-Category/add" element={<AddBlogsCategory/> } />
        <Route path="/admin/Blogs-Category/update/:id" element={<UpdateBlogsCategory/> } />
         <Route path="post-list" element={<PostList/>} />
         <Route path="/admin/post-list/add" element={<AddPost/>} />
         <Route path="/admin/post-list/update" element={<UpdatePost/>} />
         <Route path="Post-comments" element={<PostComments/>} />
         <Route path="order-history" element={<OrderHistory/>} />
         <Route path="/admin/order-history/view" element={<OrderDetails/>} />
         <Route path="Pending-payment" element={<PendingPayment/>} />
         <Route path="All-Students" element={<AllStudents/>} />
         <Route path="/admin/All-Students/view/:id" element={<StudentsDetails/>} />
         <Route path="Instructors" element={<Instructors/>} />
         <Route path="/admin/Instructors/view" element={<InstructorsDetails/>} />
         <Route path="Active-users" element={<ActiveUsers/>} />
         <Route path="Non-verified" element={<NonVerifiedUsers/>} />
         <Route path="Banned-users" element={<BannedUsers/>} />
         <Route path="Send-bulk-mail" element={<SendbulkMail/>} />
         <Route path="withdraw-method" element={<WithdrawMethod/>} />
         <Route path="/admin/withdraw-method/update" element={<UpdateWithdrawMethod/>} />
         <Route path="/admin/withdraw-method/add" element={<AddWithdrawMethod/>} />
         <Route path="withdraw-request" element={<WidthdrawRequest/>} />
         <Route path="certificate-builder" element={<CertificateBuilder/>} />
         <Route path="profile" element={<Profile/>} />
         <Route path="setting" element={<Setting/>} />
         

        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
