import React from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa'; 
import './FavouritesList.css'; 

// We added 'onDropProperty' to the props vvv
const FavouritesList = ({ favourites, onRemove, onClear, onDropProperty }) => {
    
    // 1. Allow the drop (Required by browsers)
    const handleDragOver = (e) => {
        e.preventDefault(); 
        e.currentTarget.style.backgroundColor = "#f0f8ff"; // Light blue highlight when dragging over
    };

    // 2. Reset style when drag leaves
    const handleDragLeave = (e) => {
        e.currentTarget.style.backgroundColor = "white"; 
    };

    // 3. Handle the actual drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "white"; 
        
        // Get the "ID" we attached to the item when we started dragging
        const propertyId = e.dataTransfer.getData("propertyId");
        
        if (propertyId) {
            onDropProperty(propertyId);
        }
    };

    return (
        <div 
            className="favourites-sidebar"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h3>Favourites ({favourites.length})</h3>
            
            {favourites.length === 0 ? (
                <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center', color: '#999' }}>
                    Drag properties here to save
                </div>
            ) : (
                <div className="fav-list">
                    {favourites.map(prop => (
                        <div key={prop.id} className="fav-item">
                            <img src={prop.picture} alt="thumb" className="fav-thumb" />
                            <div className="fav-info">
                                <h4>{prop.location}</h4>
                                <p>£{prop.price.toLocaleString()}</p>
                            </div>
                            <button className="remove-btn" onClick={() => onRemove(prop.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    
                    <button className="clear-btn" onClick={onClear}>
                        <FaTimes /> Clear All
                    </button>
                </div>
            )}
        </div>
    );
};

export default FavouritesList;