import { NavLink } from "react-router-dom"
import { useEffect , useState } from "react"
import http from "../../apis/http";
import {  toast } from 'react-toastify';


const Jobs = () => {

  const [laoding , setLoading] = useState(true);
  const [error , setError] = useState(null);
  const [data ,setData] = useState([])

  const getJobsList = async () => {
    try {
      const res = await http.getApi("/get-all-jobs");
      console.log(res)
      if(res.data.success){
          setData(res?.data?.data);
          setLoading(false)
      }else{
          setData([]);
          toast.error(res?.data?.message)
      }
    } catch (error) {
        setData([]);
        toast.error("Internal server error")
    }
  }

  useEffect(() => {
    getJobsList()
  },[])

  console.log(data)

    return  <>
        <section
      className="section-hero overlay inner-page bg-image"
      style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
      id="home-section"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="text-white font-weight-bold">Jobs List</h1>
            <div className="custom-breadcrumbs">
              <NavLink to="/">Home</NavLink> <span className="mx-2 slash">/</span>
              <span className="text-white">
                <strong>Jobs</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    {
      laoding ?   <div className="loader">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div> :    <section className="site-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-7 text-center">
          <h2 className="section-title mb-2">{data.length > 0 ? data?.length : ''} Job Listed</h2>
        </div>
      </div>
      <ul className="job-listings mb-5">
        {
          data && data.length > 0 ? data?.map((each) => {
            return   <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <NavLink to="/" />
            <div className="job-listing-logo">
              <img
                src="images/hero_1.jpg"
                alt="Free Website Template by Free-Template.co"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>{each?.jobTitle}</h2>
                <strong>{each?.companyName}</strong>
                <p>{each?.jobDescription}</p>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> {each?.location}
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-danger">{each?.jobType}</span>
              </div>
            </div>
          </li>

          }) : <h1>No Jobs</h1>
        }
      

      </ul>
   
    </div>
  </section>
    }
 
    </>  
}

export default Jobs