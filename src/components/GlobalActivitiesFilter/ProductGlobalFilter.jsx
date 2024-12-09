import { useEffect, useState } from "react"
import { ListGroup, Form } from "react-bootstrap"
import axios from "axios"
import './ProductGlobalFilter.css'

const ProductGlobalFilter = () => {
    const API_URL = import.meta.env.VITE_APP_API_URL
    const [filterValue, setFilterValue] = useState("")
    const [filterResult, setFilterResult] = useState([])

    const handleFilterChange = e => {
        const { value } = e.target
        console.log(value)
        setFilterValue(value)
    };

    useEffect(() => {
        if (filterValue !== "") {
            fetchProductsData()
        } else {
            setFilterResult([])
        }
    }, [filterValue])

    const fetchProductsData = () => {
        axios
            .get(`${API_URL}/products?title_like=${filterValue}`)
            .then(response => {
                console.log(response.data)
                setFilterResult(response.data)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="ProductGlobalFilter">
            <div className="searcher">
                <Form.Control
                    type="text"
                    placeholder="PRODUCT"
                    value={filterValue}
                    onChange={handleFilterChange}
                />
                <div className="search-icon">
                    <i className="fa-solid fa-search"></i>
                </div>
            </div>

            <div className="list-filtered">
                <ListGroup>
                    {filterResult.map((elm, idx) => (
                        <ListGroup.Item key={idx}>
                            <img src={elm.gallery[0]} alt={elm.title} />
                            <h7>{elm.title}</h7>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}

export default ProductGlobalFilter