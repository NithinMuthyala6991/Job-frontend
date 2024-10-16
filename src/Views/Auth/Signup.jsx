import { useFormik } from "formik";
import * as Yup from "yup"; // For schema-based validation
import http from "../../apis/http";
import { NavLink, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { useEffect } from "react";

const SignUp = () => {
  const naviagte = useNavigate()
  const formik = useFormik({
    initialValues: {
      name : '',
      email: '',
      userType: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name : Yup.string().required(),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      userType: Yup.string()
        .oneOf(['Recruiter', 'Job Seeker'], 'Invalid User Type')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async (values , {setSubmitting , resetForm}) => {
    try {
      const res = await http.postApi("sign-up" ,values);
      if(res.data.success){
          resetForm()
          toast.success(res?.data?.message)
          naviagte("/login")
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Some thing went wrong")
    }
    finally{
        setSubmitting(false)
    }

    }
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('job_app'))?.token;
    if(token){
      naviagte("/")
    }
  },[naviagte])

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
            <div className="col-lg-12 mb-5">
              <h2 className="mb-4">Sign Up To JobBoard</h2>
              <form onSubmit={formik.handleSubmit} className="p-4 border rounded">
                <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>
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
                <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" style={{ display: "block" }} htmlFor="userType">
                      User Type
                    </label>
                    <select
                      id="userType"
                      name="userType"
                      className="form-control"
                      value={formik.values.userType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Type</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Job Seeker">Job Seeker</option>
                    </select>
                    {formik.touched.userType && formik.errors.userType ? (
                      <div className="text-danger">{formik.errors.userType}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row form-group">
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
                <div className="row form-group mb-4">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="confirmPassword">Re-Type Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Re-type Password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="text-danger">{formik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      value={formik.isSubmitting ? "Signing up...." : "Sign Up"}
                      className="btn px-4 btn-primary text-white"
                    />
                  </div>
                </div>
                <p> Have an account <NavLink to = "/login">Login</NavLink></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
