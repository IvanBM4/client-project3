import axios from "axios"

class AuthServicies {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

        this.axiosApp.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`
            }
            return config
        })
    }

    signupUser(userData) {
        return this.axiosApp.post('/signup', userData)
    }

    loginUser(userData) {
        return this.axiosApp.post('/login', userData)
    }

    verifyUser(token) {
        return this.axiosApp.get('/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    getOneUser(id) {
        return this.axiosApp.get(`/users/${id}`)
    }

    fetchUsers() {
        return this.axiosApp.get(`/users`)

    }
}

export default new AuthServicies()