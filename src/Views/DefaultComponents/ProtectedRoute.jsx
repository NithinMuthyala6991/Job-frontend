import { Navigate } from "react-router-dom"

const ProtectedRoute = ({element : Element}) => {
        const token = JSON.parse(localStorage.getItem('job_app'))?.token

       return  token ? <Element/> :  <Navigate to = "/login"/>
}

export default ProtectedRoute