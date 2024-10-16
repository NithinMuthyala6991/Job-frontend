
import axios from "axios"


// const baseUrl = "http://localhost:8080/api/v1/"
const baseUrl = "http://54.80.90.90:8080/api/v1/"
const token  = JSON.parse(localStorage.getItem('job_app'))?.token

const http = {
    postApi : (path ,body ) => {
        return new Promise(async (resolve ,reject) => {
            await axios.post(`${baseUrl}${path}`,body).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getApi : (path) => {
        const headers = {
            'Content-Type':"application/json",
             "Authorization": `Bearer ${token ? token : ""}`
        }
        return new Promise(async (resolve ,reject) => {
            await axios.get(`${baseUrl}${path}`,{headers} ).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    postFormData : (path , body) => {
        const headers = {
            'Content-Type':"multipart/form-data",
             "Authorization": `Bearer ${token}`
        }
        return new Promise(async (resolve ,reject) => {
            await axios.post(`${baseUrl}${path}`,body ,{ headers }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default http