import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL

const GlobalActivitiesFilter = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchSuggestions = useCallback(async () => {
        if (searchTerm.length < 3) {
            setSuggestions([])
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.get(`${API_URL}/activities/search`, {
                params: { q: searchTerm }
            });
            setSuggestions(response.data)
        } catch (error) {
            console.error('Error looking suggestions:', error)
            setError('Failed to look up for suggestions. Please try again.')
            setSuggestions([])
        } finally {
            setIsLoading(false)
        }
    }, [searchTerm])

    useEffect(() => {
        const debounceTimer = setTimeout(fetchSuggestions, 300)
        return () => clearTimeout(debounceTimer)
    }, [fetchSuggestions])

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="GlobalActivitiesFilter">
            <h1>Filtro de Actividades</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar actividades..."
            />
            {isLoading && <p>Cargando sugerencias...</p>}
            {error && <p className="error">{error}</p>}
            {!isLoading && !error && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default GlobalActivitiesFilter