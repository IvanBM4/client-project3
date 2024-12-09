import React, { useState, useEffect, useCallback, useRef } from 'react';
import activitiesServices from '../../services/activities.services.jsx';


const NavbarActivitiesSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const loadActivities = async () => {
            setIsLoading(true);
            try {
                const response = await activitiesServices.getAllActivities();
                setAllActivities(response.data);
            } catch (error) {
                console.error('Error al cargar actividades:', error);
                setError('Error al cargar actividades.');
            } finally {
                setIsLoading(false);
            }
        };

        loadActivities();
    }, []);

    const fetchSuggestions = useCallback(() => {
        if (searchTerm.length < 1) {
            setSuggestions([]);
            return;
        }

        const filteredSuggestions = allActivities.filter(activity =>
            activity.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
    }, [searchTerm, allActivities]);

    useEffect(() => {
        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [fetchSuggestions]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
    };

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="NavbarActivitiesSearch" ref={searchRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder="Buscar actividades..."
                disabled={isLoading}
            />
            {isOpen && (
                <div className="search-dropdown">
                    {isLoading && <p>Cargando...</p>}
                    {error && <p className="error">{error}</p>}
                    {!isLoading && !error && suggestions.length > 0 && (
                        <ul className="suggestion-list">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className="suggestion-item">{suggestion.name}</li>
                            ))}
                        </ul>
                    )}
                    {!isLoading && !error && searchTerm && suggestions.length === 0 && (
                        <p>No se encontraron actividades</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default NavbarActivitiesSearch;