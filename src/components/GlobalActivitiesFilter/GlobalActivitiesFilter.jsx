import { useState, useEffect } from "react"
import { Form, ListGroup } from "react-bootstrap"
import './GlobalActivitiesFilter.css'
import axios from "axios"
import activitiesServices from "../../services/activities.services"

const axiosApp = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
})

const GlobalActivitiesFilter = () => {

    const [filterValue, setFilterValue] = useState('')
    const [filterResults, setFilterResults] = useState([])

    useEffect(() => {
        if (filterValue.length > 1) {
            fetchAutocompleteResults(filterValue)
        } else {
            setFilterResults([])
        }
    }, [filterValue])



    const fetchAutocompleteResults = (query) => {

        activitiesServices
            .filterActivities({ query })

            .then(({ data }) => {
                setFilterResults(data)
            })

            .catch(error => {
                console.error("Error in  autocomplete results:", error)
                setFilterResults([])
            })
    }

    const handleFilterChange = e => {
        const { value } = e.target
        setFilterValue(value)
    }

    return (
        <div className="GlobalActivitiesFilter">
            <Form.Control
                type="text"
                placeholder="Título de la actividad"
                className="mr-sm-2"
                value={filterValue}
                onChange={handleFilterChange}
            />

            <ListGroup>
                {filterResults.map((elm, index) => (
                    <ListGroup.Item key={index}>{elm.title}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default GlobalActivitiesFilter