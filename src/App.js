import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import propertiesData from './data/properties.json'; // Importing your JSON

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Load data when app starts
  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  // The Filter Logic
  const handleSearch = (criteria) => {
    const results = properties.filter(property => {
      // 1. Filter by Type
      const typeMatch = criteria.type === 'any' || property.type === criteria.type;
      
      // 2. Filter by Price
      const priceMatch = property.price >= criteria.minPrice && property.price <= criteria.maxPrice;
      
      // 3. Filter by Bedrooms
      const bedMatch = property.bedrooms >= criteria.minBedrooms && property.bedrooms <= criteria.maxBedrooms;

      // 4. Filter by Postcode
      const postcodeMatch = criteria.postcode === '' || property.postcode.startsWith(criteria.postcode.toUpperCase());

      // Return true if ALL match
      return typeMatch && priceMatch && bedMatch && postcodeMatch;
    });

    setFilteredProperties(results);
  };

  return (
    <div className="App">
      <header>
        <h1>FarmSmart Estate Agent</h1>
      </header>

      {/* Pass the handleSearch function to the form */}
      <SearchForm onSearch={handleSearch} />

      {/* Display Results */}
      <div className="property-list">
        {filteredProperties.length === 0 ? (
            <p>No properties found.</p>
        ) : (
            filteredProperties.map(property => (
                <div key={property.id} className="property-card">
                    {/* We will improve this card later */}
                    <img src={property.picture} alt={property.description} width="200" />
                    <h3>{property.location}</h3>
                    <p>{property.type} - {property.bedrooms} Beds</p>
                    <p>£{property.price.toLocaleString()}</p>
                </div>
            ))
        )}
      </div>
    </div>
  );
}

export default App;