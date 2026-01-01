import React from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa'; 
import './FavouritesList.css'; 

const FavouritesList = ({ favourites, onRemove, onClear }) => {
    return (
        <div className="favourites-sidebar">
            <h3>Favourites ({favourites.length})</h3>
            
            {favourites.length === 0 ? (
                <p>Drag properties here or click the heart icon to save.</p>
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