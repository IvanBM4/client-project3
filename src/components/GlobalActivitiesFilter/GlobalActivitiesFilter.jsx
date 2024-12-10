import { useState } from "react"
import { Form, ListGroup } from "react-bootstrap"
import axios from 'axios'
import './GlobalActivitiesFilter.css'

const GlobalActivitiesFilter = () => {
    const [filterValue, setFilterValue] = useState('')
    const [filterResults, setFilterResults] = useState([])

    const handleFilterChange = (e) => {
        const { value } = e.target
        setFilterValue(value)

        if (value.length > 1) {
            console.log("Searching for:", value)
            axios.get(`${import.meta.env.VITE_APP_API_URL}/api/activities/search?`, {
                params: { name: value }
            })
                .then(response => {
                    console.log("Response from API:", response.data)
                    const resultsArray = Array.isArray(response.data) ? response.data : Object.values(response.data)
                    setFilterResults(resultsArray)
                })
                .catch(error => {
                    console.error("Error fetching activities:", error)
                    setFilterResults([])
                })
        } else {
            setFilterResults([])
        }
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