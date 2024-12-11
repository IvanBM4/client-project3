import { useEffect, useState } from "react"
import { ListGroup, Form } from "react-bootstrap"
import axios from "axios"
import './GlobalActivitiesFilter.css'

const GlobalActivitiesFilter = () => {
    const API_URL = import.meta.env.VITE_APP_API_URL

    const [filterValue, setFilterValue] = useState("")
    const [filterResults, setFilterResults] = useState([])

    const handleFilterChange = e => {
        const { value } = e.target
        setFilterValue(value)
    }

    useEffect(() => {
        if (filterValue.length > 1) {
            fetchActivitiesData()
        } else {
            setFilterResults([])
        }
    }, [filterValue])

    const fetchActivitiesData = () => {
        axios
            .get(`${API_URL}/api/activities/search?name=${filterValue}`)
            .then(response => {
                const resultsArray = Array.isArray(response.data) ? response.data : Object.values(response.data);
                setFilterResults(resultsArray)
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="GlobalActivitiesFilter">
            <div className="searcher">
                <Form.Control
                    type="text"
                    placeholder="Título de la actividad"
                    value={filterValue}
                    onChange={handleFilterChange}
                />
                <div className="search-icon">
                    <i className="fa-solid fa-search"></i>
                </div>
            </div>

            <div className="list-filtered">
                <ListGroup>
                    {filterResults.map((elm, idx) => (
                        <ListGroup.Item key={idx}>
                            <h7>{elm.title}</h7>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}

export default GlobalActivitiesFilter