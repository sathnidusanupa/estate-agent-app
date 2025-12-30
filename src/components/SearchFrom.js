import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './SearchForm.css'; // We will create this next

const SearchForm = ({ onSearch }) => {
  // State for all our filters
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxBedrooms, setMaxBedrooms] = useState(10);
  const [dateAdded, setDateAdded] = useState(null);
  const [postcode, setPostcode] = useState('');

  // Handle the Search Button Click
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      type,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      minBedrooms: Number(minBedrooms),
      maxBedrooms: Number(maxBedrooms),
      dateAdded,
      postcode
    });
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      {/* Property Type */}
      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="any">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="form-group">
        <label>Min Price</label>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Max Price</label>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>

      {/* Bedrooms */}
      <div className="form-group">
        <label>Min Beds</label>
        <input type="number" value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Max Beds</label>
        <input type="number" value={maxBedrooms} onChange={(e) => setMaxBedrooms(e.target.value)} />
      </div>

      {/* Postcode */}
      <div className="form-group">
        <label>Postcode</label>
        <input 
            type="text" 
            placeholder="e.g. BR1" 
            value={postcode} 
            onChange={(e) => setPostcode(e.target.value)} 
        />
      </div>

      {/* Date Added Widget (Crucial for Marks) */}
      <div className="form-group">
        <label>Added After</label>
        <DatePicker 
            selected={dateAdded} 
            onChange={(date) => setDateAdded(date)} 
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
        />
      </div>

      <button type="submit" className="search-btn">Search Properties</button>
    </form>
  );
};

export default SearchForm;