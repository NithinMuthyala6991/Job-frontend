import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()

  const role = JSON.parse(localStorage.getItem("job_app"))?.userType

  const handleLogout = () => {
    localStorage.removeItem('job_app');
    navigate("/login")
  }

  return <header className="site-navbar mt-3">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="site-logo col-6">
          <NavLink to="/">JobBoard</NavLink>
        </div>
        <nav className="mx-auto site-navigation">
          <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
            {/* <li>
              <a href="index.html" className="nav-link active">
                Home
              </a>
            </li> */}
            {/* <li>
              <a href="about.html">About</a>
            </li> */}

            {role === 'Recruiter' && <>  <li className="d-lg-none">
              <NavLink to="/post-job">
                <span className="mr-2">+</span> Post a Job
              </NavLink>
            </li>
              <li className="d-lg-none">
                <NavLink to="/posted-jobs">
                  <span className="mr-2">+</span> Posted Jobs
                </NavLink>

              </li></>}
            {localStorage.getItem("job_app") && <li className="d-lg-none" onClick={handleLogout}>
              <Link  >
                <span className="mr-2">+</span> Log out
              </Link>
            </li>}

            {!localStorage.getItem("job_app") && <li className="d-lg-none">
              <NavLink to="/login">Log In</NavLink>
            </li>}
          </ul>
        </nav>
        <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
          <div className="ml-auto">
            <>
              {
                role === 'Recruiter' && localStorage.getItem("job_app") && <>     <NavLink
                  to="/post-job"
                  className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
                >

                  Post a Job
                </NavLink>
                  <NavLink
                    to="/posted-jobs"
                    className="btn btn-outline-white border-width-2 d-none d-lg-inline-block mx-2"
                  >

                    Posted Jobs
                  </NavLink>
                </>
              }

            </>
            {localStorage.getItem("job_app") && <Link
              onClick={handleLogout}
              to=""
              className="btn btn-outline-white border-width-2 d-none d-lg-inline-block mx-2"
            >
              {/* <span className="mr-2 icon-add" /> */}
              Log out
            </Link>}
            {!localStorage.getItem("job_app") && <NavLink
              to="/login"
              className="btn btn-primary border-width-2 d-none d-lg-inline-block"
            >
              <span className="mr-2 icon-lock_outline" />
              Log In
            </NavLink>}
          </div>
          <a
            href="#"
            className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
          >
            <span className="icon-menu h3 m-0 p-0 mt-2" />
          </a>
        </div>
      </div>
    </div>
  </header>

};

export default Navbar