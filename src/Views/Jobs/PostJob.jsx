import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import http from "../../apis/http";
import {  toast } from 'react-toastify'
import { NavLink, useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null); // State to handle image preview

  // useFormik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      jobTitle: '',
      location: '',
      jobType: '',
      jobDescription: '',
      companyName: '',
     
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      jobTitle: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      
      jobType: Yup.string().required('Required'),
      jobDescription: Yup.string().required('Required'),
      companyName: Yup.string().required('Required'),
    }),
    onSubmit: async (values , {setSubmitting, resetForm}) => {
      try {
      
        const formData = new  FormData();
        formData.append("companyName", values.companyName);
        formData.append("companyEmail", values.email);
        formData.append("jobTitle", values.jobTitle);
        formData.append("location", values.location);
        formData.append("jobType",values.jobType);
        formData.append("jobDescription" , values.jobDescription);


        const res = await http.postFormData("/add-job",formData);
        if(res.data.success){
          resetForm()
          toast.success(res?.data?.message)
          navigate("/")
      }else{
        toast.error(res?.data?.message)
      }

      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Some thing went wrong")
      }
      finally{
        setSubmitting(false)
      }

      
    },
  });



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
              <h1 className="text-white font-weight-bold">Post A Job</h1>
              <div className="custom-breadcrumbs">
                <NavLink to="/">Home</NavLink> <span className="mx-2 slash">/</span>
                <NavLink to="">Job</NavLink> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Post a Job</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <form
                onSubmit={formik.handleSubmit}
                className="p-4 p-md-5 border rounded"
              >
                <h3 className="text-black mb-5 border-bottom pb-2">Job Details</h3>

                {/* Image Upload Section */}
                <div className="form-group">
               

                  {/* Company Name */}
                  <div className="form-group">
                    <label htmlFor="company-name">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="company-name"
                      placeholder="e.g. Company Name"
                      {...formik.getFieldProps("companyName")}
                    />
                    {formik.touched.companyName && formik.errors.companyName ? (
                      <div className="text-danger">{formik.errors.companyName}</div>
                    ) : null}
                  </div>
              
                  
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="you@yourdomain.com"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>

                {/* Job Title */}
                <div className="form-group">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job-title"
                    placeholder="Product Designer"
                    {...formik.getFieldProps("jobTitle")}
                  />
                  {formik.touched.jobTitle && formik.errors.jobTitle ? (
                    <div className="text-danger">{formik.errors.jobTitle}</div>
                  ) : null}
                </div>

                {/* Location */}
                <div className="form-group">
                  <label htmlFor="job-location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job-location"
                    placeholder="e.g. New York"
                    {...formik.getFieldProps("location")}
                  />
                  {formik.touched.location && formik.errors.location ? (
                    <div className="text-danger">{formik.errors.location}</div>
                  ) : null}
                </div>

         

                {/* Job Type */}
                <div className="form-group">
                  <label htmlFor="job-type">Job Type</label>
                  <select
                    className="form-control"
                    id="job-type"
                    {...formik.getFieldProps("jobType")}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Full Time">Full Time</option>
                  </select>
                  {formik.touched.jobType && formik.errors.jobType ? (
                    <div className="text-danger">{formik.errors.jobType}</div>
                  ) : null}
                </div>

                {/* Job Description */}
                <div className="form-group">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    className="form-control"
                    id="job-description"
                    placeholder="Write Job Description"
                    {...formik.getFieldProps("jobDescription")}
                  />
                  {formik.touched.jobDescription && formik.errors.jobDescription ? (
                    <div className="text-danger">{formik.errors.jobDescription}</div>
                  ) : null}
                </div>



                {/* Add Job Button */}
                <div className="form-group">
                  <button type="submit" className="btn btn-block btn-primary btn-md">
                   {formik.isSubmitting ? "Adding Job..." : "Add Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostJob;
