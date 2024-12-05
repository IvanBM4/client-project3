import axios from "axios"

class CategoriesServicies {

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

    fetchExistentCategories() {
        return this.axiosApp.get(`/activities/categories`)
    }

    fetchAllowedCategories() {
        return this.axiosApp.get(`/categories-allowed`)
    }

}

export default new CategoriesServicies