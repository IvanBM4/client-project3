import axios from "axios"

class AccesibilitiesServicies {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    fetchExistentTargets() {
        return this.axiosApp.get(`/activities/accesibilities`)
    }

    fetchAllowedTargets() {
        return this.axiosApp.get(`/accesibilities-allowed`)
    }

}

export default new AccesibilitiesServicies