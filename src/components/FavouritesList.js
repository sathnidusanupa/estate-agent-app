import React from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa'; 
import './FavouritesList.css'; 

const FavouritesList = ({ favourites, onRemove, onClear, onDropProperty }) => {
    
    const handleDragOver = (e) => {
        e.preventDefault(); 
        e.currentTarget.style.backgroundColor = "#f0f8ff"; 
    };

    const handleDragLeave = (e) => {
        e.currentTarget.style.backgroundColor = "white"; 
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "white"; 
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
                            {/* FIXED IMAGE PATH BELOW vvv */}
                            <img 
                                src={process.env.PUBLIC_URL + prop.picture} 
                                alt="thumb" 
                                className="fav-thumb" 
                            />
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