import { useFormik } from "formik";
import * as Yup from "yup";
import {  toast } from 'react-toastify';
import http from "../../apis/http";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate()
  // useFormik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: async (values , {resetForm , setSubmitting}) => {
     
      try {
        const res = await http.postApi("login" ,values);
        console.log(res)
        if(res.data.success){
            resetForm()
            toast.success(res?.data?.message)
            localStorage.setItem('job_app',JSON.stringify(res?.data?.data))
            navigate("/")
        }else{
          toast.error(res?.data?.data?.message)
        }
      } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message || "Some thing went wrong")
      }
      finally{
          setSubmitting(false)
      }
    },
  });


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('job_app'))?.token;
    if(token){
      navigate("/")
    }
  },[navigate])

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Sign Up/Login</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Log In</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="mb-4">Log In To JobBoard</h2>
              <form onSubmit={formik.handleSubmit} className="p-4 border rounded">
                <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row form-group mb-4">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      value={formik.isSubmitting ? "Logging in...." : "Log In"}
                      className="btn px-4 btn-primary text-white"
                    />
                  </div>
                </div>
             <p>Don't have an account <NavLink to = "/sign-up">Sign Up</NavLink></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
