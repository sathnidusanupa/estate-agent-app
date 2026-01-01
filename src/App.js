import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SearchForm from './components/SearchForm';
import FavouritesList from './components/FavouritesList';
import PropertyPage from './pages/PropertyPage';
import propertiesData from './data/properties.json';

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  // --- FAVOURITES LOGIC ---
  const addToFavourites = (property) => {
    if (!favourites.some(fav => fav.id === property.id)) {
        setFavourites([...favourites, property]);
    } else {
        alert("Property is already in favourites!");
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  const handleDrop = (propertyId) => {
    const propertyToAdd = properties.find(p => p.id === propertyId);
    if (propertyToAdd) {
        addToFavourites(propertyToAdd);
    }
  };

  // --- SEARCH LOGIC ---
  const handleSearch = (criteria) => {
    const results = properties.filter(property => {
      const typeMatch = criteria.type === 'any' || property.type === criteria.type;
      const priceMatch = property.price >= criteria.minPrice && property.price <= criteria.maxPrice;
      const bedMatch = property.bedrooms >= criteria.minBedrooms && property.bedrooms <= criteria.maxBedrooms;
      const postcodeMatch = criteria.postcode === '' || (property.postcode && property.postcode.toUpperCase().startsWith(criteria.postcode.toUpperCase()));
      return typeMatch && priceMatch && bedMatch && postcodeMatch;
    });
    setFilteredProperties(results);
  };

  return (
    <div className="App">
      <header>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <h1>FarmSmart Estate Agent</h1>
        </Link>
      </header>

      {/* UPDATED: Removed style={{...}} and added className="main-container" */}
      <div className="main-container">
        
        {/* LEFT SIDE: Content Area */}
        {/* UPDATED: Added className="content-area" */}
        <div className="content-area">
            <Routes>
                <Route path="/" element={
                    <>
                        <SearchForm onSearch={handleSearch} />
                        <div className="property-list">
                            {filteredProperties.length === 0 ? <p>No properties found.</p> : (
                                filteredProperties.map(property => (
                                    <div 
                                        key={property.id} 
                                        className="property-card"
                                        draggable="true" 
                                        onDragStart={(e) => handleDragStart(e, property)}
                                        style={{ cursor: 'grab' }}
                                    >
                                        <img src={property.picture} alt={property.description} width="100%" />
                                        <h3>{property.location}</h3>
                                        <p>{property.type} - {property.bedrooms} Beds</p>
                                        <p>£{property.price.toLocaleString()}</p>
                                        
                                        <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                                            <Link to={`/property/${property.id}`}>
                                                <button className="details-btn">View Details</button>
                                            </Link>
                                            <button onClick={() => addToFavourites(property)} style={{cursor:'pointer'}}>
                                                ❤ Save
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                } />
                
                <Route path="/property/:id" element={<PropertyPage addToFavourites={addToFavourites} />} />
            </Routes>
        </div>

        {/* RIGHT SIDE: Favourites Sidebar */}
        {/* UPDATED: Added className="sidebar-area" */}
        <div className="sidebar-area">
            <FavouritesList 
                favourites={favourites} 
                onRemove={removeFromFavourites}
                onClear={clearFavourites}
                onDropProperty={handleDrop} 
            />
        </div>

      </div>
    </div>
  );
}

export default App;