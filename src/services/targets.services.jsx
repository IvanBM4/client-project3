import axios from "axios"

class TargetsServicies {

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
        return this.axiosApp.get(`/activities/targets`)
    }

    fetchAllowedTargets() {
        return this.axiosApp.get(`/targets-allowed`)
    }

}

export default new TargetsServicies