import axios from "axios"

class MessagesServices {
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

    fetchReceivedMessages(id) {
        return this.axiosApp.get(`/messages/users/${id}`)
    }

    sendMessage() {
        return this.axiosApp.get(`/messages`)
    }

}

export default new MessagesServices()