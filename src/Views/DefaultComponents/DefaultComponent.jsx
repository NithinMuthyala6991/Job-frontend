
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../Auth/Login';
import SignUp from '../Auth/Signup';
import Jobs from '../Jobs/Jobs';
import Home from '../Home/Home';
import PostJob from '../Jobs/PostJob';
import JobDetail from '../Jobs/JobDetail';
import Navbar from './Navbar';
import Footer from './Footer';
import MyJobs from '../Jobs/MyJobs';
import ProtectedRoute from './ProtectedRoute';
import { useEffect } from 'react';

const DefaultComponent = () => {


  useEffect(() => {
    window.scroll(0,100)
  },[])

return <div className="site-wrap">
<div className="site-mobile-menu site-navbar-target">
  <div className="site-mobile-menu-header">
    <div className="site-mobile-menu-close mt-3">
      <span className="icon-close2 js-menu-toggle" />
    </div>
  </div>
  <div className="site-mobile-menu-body" />
</div>{" "}
<BrowserRouter>
<Navbar/>
  <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/jobs-list" element = {<Jobs/>}/>
    <Route path = "/posted-jobs" element = {<ProtectedRoute element={MyJobs}/>}/>
    <Route path = "/job-detail" element = {<JobDetail/>}/>
    <Route path = "/post-job" element = {<ProtectedRoute element={PostJob}/>}/>
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/sign-up" element = {<SignUp/>}/>
  </Routes>
<Footer/>
</BrowserRouter>

</div>





};


export default DefaultComponent