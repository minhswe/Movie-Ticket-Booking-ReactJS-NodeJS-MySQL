import axios from "axios";

const baseApi = axios.create({
    baseURL: "http://localhost:8080",
});

// API instances for specific endpoints
const bookingApi = axios.create({
    baseURL: "http://localhost:8080/booking",
});

const userApi = axios.create({
    baseURL: "http://localhost:8080/users",
});

const movieApi = axios.create({
    baseURL: "http://localhost:8080/movies",
});

const adminApi = axios.create({
    baseURL: "http://localhost:8080/admin",
})

export { baseApi, bookingApi, userApi, movieApi, adminApi };
