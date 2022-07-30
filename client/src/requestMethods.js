import axios from "axios";


const BASE_URL = "http://localhost:5000/api/";
/* const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2VlYjU3YzUyZWYzZmU0NDMwOWQ3MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODA0MTQzNywiZXhwIjoxNjU4MzAwNjM3fQ.dWxvx5MVa-F60jL2OSFpYYI4vA_-zVs1y_mgRudR-as";
 */
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: `Bearer ${TOKEN}`
    }
})

export const mercadopagoRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
    }
});