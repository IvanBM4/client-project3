import axios from "axios";

class ReviewsServices {

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

    fetchReviews() {
        return this.axiosApp.get(`/reviews`)
    }

    fetchReviewsByActivity(id) {
        return this.axiosApp.get(`/reviews/${id}`)
    }

    saveReview(reviewData) {
        return this.axiosApp.post(`/reviews`, reviewData)
    }

    editReview(reviewData, id) {
        return this.axiosApp.put(`/reviews/${id}`, reviewData)
    }

    deleteReview(id) {
        return this.axiosApp.delete(`/reviews/${id}`)
    }

    filterReviews(query) {
        return this.axiosApp.get(`/reviews`, {
            params: query
        })
    }
}

export default new ReviewsServices