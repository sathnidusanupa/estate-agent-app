import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; 
import 'react-tabs/style/react-tabs.css'; 
import { FaHeart } from 'react-icons/fa'; 
// Note: Adjusted path to data
import propertiesData from '../data/properties.json';
import './PropertyPage.css';

const PropertyPage = ({ addToFavourites }) => {
    const { id } = useParams(); 
    const property = propertiesData.properties.find(p => p.id === id);

    const [mainImage, setMainImage] = useState(property ? property.picture : '');

    if (!property) return <h2>Property not found!</h2>;

    return (
        <div className="property-page">
            <div className="property-header">
                <h1>{property.location}</h1>
                <h2>£{property.price.toLocaleString()}</h2>
                
                <button 
                    className="save-btn" 
                    onClick={() => addToFavourites(property)}
                    style={{ padding: '10px', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                    <FaHeart /> Save to Favourites
                </button>
            </div>

            <div className="gallery-container">
                {/* FIXED MAIN IMAGE PATH BELOW vvv */}
                <img 
                    src={process.env.PUBLIC_URL + mainImage} 
                    alt="Main" 
                    className="main-image" 
                />
                
                <div className="thumbnail-grid">
                    {property.images.map((img, index) => (
                        // FIXED THUMBNAIL IMAGE PATHS BELOW vvv
                        <img 
                            key={index}
                            src={process.env.PUBLIC_URL + img} 
                            alt={`Thumbnail ${index}`} 
                            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)} 
                        />
                    ))}
                </div>
            </div>

            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                </TabList>

                <TabPanel>
                    <h3>Property Details</h3>
                    <p>{property.description}</p>
                    <div style={{ marginTop: '10px', lineHeight: '1.6' }}>
                        <p><strong>Type:</strong> {property.type}</p>
                        <p><strong>Tenure:</strong> {property.tenure}</p>
                        <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <h3>Floor Plan</h3>
                    <div style={{height: '300px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666'}}>
                        Floor Plan Image Would Go Here
                    </div>
                </TabPanel>

                <TabPanel>
                    <h3>Location Map</h3>
                    <div style={{ width: '100%', height: '450px', background: '#f0f0f0' }}>
                        <iframe 
                            title="Property Location"
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            scrolling="no" 
                            marginHeight="0" 
                            marginWidth="0" 
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        >
                        </iframe>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default PropertyPage;