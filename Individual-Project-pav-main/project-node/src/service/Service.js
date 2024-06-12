import axios from "axios"; 

const REST_API_BASE_URL = 'http://localhost:8080/api/useremail/employees' 

export const listTask= () =>  axios.get(REST_API_BASE_URL);
