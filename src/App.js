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
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import MainStudentPage from "./Dashboard/Student/MainStudentPage/MainStudentPage";
import ExploreCourses from "./Dashboard/Student/ExploreCourses/ExploreCourses";
import CourseDetails from "./Dashboard/Student/CourseDetails/CourseDetails";
import Cart from "./components/Cart/Cart";
import OrderStudentHistory from "./Dashboard/Student/OrderHistory/OrderStudentHistory";
import EnrolledCourseDetails from "./Dashboard/Student/EnrolledCourseDetails/EnrolledCourseDetails";
import MyCourses from "./Dashboard/Student/MyCourses/MyCourses";
import WishList from "./Dashboard/Student/WishList/WishList";
import Reviews from "./Dashboard/Student/Reviews/Reviews";
import StudentReviewsDetails from "./Dashboard/Student/Reviews/StudentReviewsDetails";
import MyQuiz from "./Dashboard/Student/MyQuiz/MyQuiz";
import Payment from "./Dashboard/Student/Payment/Payment";
import ProfileSettings from "./Dashboard/Student/ProfileSettings/ProfileSettings";
import OrderStudentHistoryDetails from "./Dashboard/Student/OrderHistory/OrderStudentHistoryDetails";
import AddSubCategory from "./Dashboard/Admin/Categories/SubCategory/AddSubCategory/AddSubCategory";
import UpdateSubCategory from "./Dashboard/Admin/Categories/SubCategory/UpdateSubCategory/UpdateSubCategory";
import Blog from "./Website/Blog/Blog";
import UpdateCourse from "./Dashboard/Admin/Courses/UpdateCourse/UpdateCourse";
import NotFoundPage from "./Website/Auth/ErrorsPages/NotFoundPage";
import ForbiddenPage from "./Website/Auth/ErrorsPages/ForbiddenPage";
import ReqiureAuth from "./Website/Auth/RequireAuth/RequireAuth";
import QuizExam from "./Dashboard/Student/MyQuiz/QuizExam";
import QuizResualt from "./Dashboard/Student/MyQuiz/QuizResualt";
import Blogs from "./Website/Blog/Blogs";
import Coupon from "./Dashboard/Admin/Coupon/Coupon";
import ForgetPassword from "./Website/Auth/ForgetPassword/ForgetPassword";
import Support from "./Website/Support/Support";
import About from "./Website/About/About";
import AllCourses from "./Website/AllCourses/AllCourses";
import BecomeInstructor from "./Website/BecomeInstructor/BecomeInstructor";
import ResetPassword from "./Website/Auth/ResetPassword/ResetPassword";
import Verify from "./Website/Auth/Verify/Verify";
import Provider from "./Website/Auth/Provider/Provider";
import AddStudent from "./Dashboard/Admin/AllStudents/AddStudent";
import CourseView from "./Dashboard/Student/CourseDetails/CourseView";
function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="/BecomeInstructor" element={<BecomeInstructor />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/About" element={<About />} />
        <Route path="/Courses" element={<AllCourses />} />
        <Route path="/Course-view/:id" element={<CourseView />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/providers/:provider/:token" element={<Provider />} />
           {/* Admin Dahboard */}
           <Route element={<ReqiureAuth  alowedRole={['admin' , 'student' ]}/>}  >
           <Route element={<ReqiureAuth  alowedRole={['admin' ]}/>}  >

        <Route path="/admin" element={<AdminDashboard />} >
        <Route path="main" element={<MainAdminPage/> } />
        <Route path="courses" element={<Courses/> } />
        <Route path="/admin/courses/add" element={<AddCourse/> } />
        <Route path="/admin/courses/update/:id" element={<UpdateCourse/> } />
        <Route path="Categories" element={<Categories/> } />
        <Route path="/admin/Categories/update/:id" element={<UpdateCategory/> } />
        <Route path="/admin/Categories/add" element={<AddCategory/> } />
        <Route path="/admin/Categories/sub-category/:id" element={<SubCategory/> } />
        <Route path="/admin/Categories/sub-category/:id/add" element={<AddSubCategory/> } />
        <Route path="/admin/Categories/sub-category/:id/update/:id" element={<UpdateSubCategory/> } />
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
         <Route path="/admin/post-list/update/:id" element={<UpdatePost/>} />
         <Route path="Post-comments" element={<PostComments/>} />
         <Route path="order-history" element={<OrderHistory/>} />
         <Route path="/admin/order-history/view/:id" element={<OrderDetails/>} />
         <Route path="Pending-payment" element={<PendingPayment/>} />
         <Route path="All-Students" element={<AllStudents/>} />
         <Route path="All-Students/add" element={<AddStudent/>} />
         <Route path="/admin/All-Students/view/:id" element={<StudentsDetails/>} />
         <Route path="/admin/active-users/view/:id" element={<StudentsDetails/>} />
         <Route path="/admin/Non-verified/view/:id" element={<StudentsDetails/>} />
         <Route path="Instructors" element={<Instructors/>} />
         <Route path="/admin/Instructors/view" element={<InstructorsDetails/>} />
         <Route path="Active-users" element={<ActiveUsers/>} />
         <Route path="Non-verified" element={<NonVerifiedUsers/>} />
         <Route path="Banned-users" element={<BannedUsers/>} />
         <Route path="Send-bulk-mail" element={<SendbulkMail/>} />
         <Route path="withdraw-method" element={<WithdrawMethod/>} />
         <Route path="coupon" element={<Coupon/>} />
         <Route path="/admin/withdraw-method/update/:id" element={<UpdateWithdrawMethod/>} />
         <Route path="/admin/withdraw-method/add" element={<AddWithdrawMethod/>} />
         <Route path="withdraw-request" element={<WidthdrawRequest/>} />
         <Route path="certificate-builder" element={<CertificateBuilder/>} />
         <Route path="profile" element={<Profile/>} />
         <Route path="setting" element={<Setting/>} />
           </Route>
        
        </Route>
                   {/* Student Dashboard */}
           <Route element={<ReqiureAuth alowedRole={['student' ]} />} >


          <Route path="/student" element={<StudentDashboard/>}>
          <Route path="cart" element={<Cart/>}/>
          <Route path="/student" element={<MainStudentPage/>}/>
          <Route path="explore" element={<ExploreCourses/>}/>
          <Route path="course-details/:id" element={<CourseDetails/>}/>
          <Route path="order-history" element={<OrderStudentHistory/>}/>
          <Route path="/student/order-history/view/:id" element={<OrderStudentHistoryDetails/>}/>
          <Route path="quiz-exam/:id" element={<QuizExam/>}/>
          <Route path="quiz-result/:id" element={<QuizResualt/>}/>

          <Route path="enrolled-course/:id" element={<EnrolledCourseDetails/>}/>
          <Route path="my-courses" element={<MyCourses/>}/>
          <Route path="wishlist" element={<WishList/>}/>
          <Route path="reviews" element={<Reviews/>}/>
          <Route path="my-Quiz" element={<MyQuiz/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="profile" element={<ProfileSettings/>}/>
          <Route path="/student/reviews/details/:id" element={<StudentReviewsDetails/>}/>
      
            
           </Route>
            </Route>    
            </Route>     
      </Routes>
    </div>
  );
}

export default App;
