import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import activitiesServices from '../../services/activities.services.jsx';

const Navigation = () => {
    const { loggedUser, logoutUser } = useContext(AuthContext);
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
        <div className="Navigation">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to={'/'}>Logo o nombre</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <div className="NavbarActivitiesSearch me-auto" ref={searchRef}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                onFocus={() => setIsOpen(true)}
                                placeholder="Buscar actividades..."
                                disabled={isLoading}
                                className="form-control"
                            />
                            {isOpen && (
                                <div className={`search-dropdown ${isOpen ? 'show' : ''}`}>
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
                        {/* ... other Nav items ... */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;