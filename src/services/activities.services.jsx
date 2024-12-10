import axios from "axios"

class ActivitiesServices {
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

    fetchActivities() {
        return this.axiosApp.get('/activities')
    }

    fetchOneActivity(id) {
        return this.axiosApp.get(`/activities/${id}`)
    }

    saveActivity(activityData) {
        return this.axiosApp.post('/activities', activityData)
    }

    editActivity(id, activityData) {
        return this.axiosApp.put(`/activities/${id}`, activityData)
    }

    deleteActivity(id) {
        return this.axiosApp.delete(`/activities/${id}`)
    }

    filterActivities(query) {
        return this.axiosApp.get('/activities/search', {
            params: query
        })
    }

    filterActivitiesName(query) {
        return this.axiosApp.get('/api/activities/search?name', {
            params: query
        })
    }

    getAllActivities() {
        return this.axiosApp.get('/activities')
    }

    joinActivity(id) {
        return this.axiosApp.post(`/activities/${id}/join`)
    }

    leaveActivity(id) {
        return this.axiosApp.post(`/activities/${id}/leave`)
    }
}

export default new ActivitiesServices()