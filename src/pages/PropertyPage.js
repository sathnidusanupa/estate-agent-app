import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // Required for Tab Marks
import 'react-tabs/style/react-tabs.css'; // Default tab styles
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Icons
import propertiesData from '../data/properties.json';
import './PropertyPage.css';

const PropertyPage = () => {
    const { id } = useParams(); // Get the ID from the URL (e.g., "prop1")
    const property = propertiesData.properties.find(p => p.id === id);

    // State for the Image Gallery (Default to the first image)
    const [mainImage, setMainImage] = useState(property ? property.picture : '');

    if (!property) return <h2>Property not found!</h2>;

    return (
        <div className="property-page">
            <div className="property-header">
                <h1>{property.location}</h1>
                <h2>£{property.price.toLocaleString()}</h2>
                
                {/* Save Button (We will make this work in the next phase) */}
                <button className="save-btn" style={{ padding: '10px', cursor: 'pointer' }}>
                    <FaRegHeart /> Save to Favourites
                </button>
            </div>

            {/* --- GALLERY SECTION (5% Marks) --- */}
            <div className="gallery-container">
                {/* Big Main Image */}
                <img src={mainImage} alt="Main" className="main-image" />
                
                {/* Thumbnails Row */}
                <div className="thumbnail-grid">
                    {property.images.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            alt={`Thumbnail ${index}`} 
                            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)} // Click to swap image
                        />
                    ))}
                </div>
            </div>

            {/* --- TABS SECTION (7% Marks) --- */}
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                </TabList>

                <TabPanel>
                    <h3>Property Details</h3>
                    <p>{property.description}</p>
                    <p><strong>Type:</strong> {property.type}</p>
                    <p><strong>Tenure:</strong> {property.tenure}</p>
                    <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
                </TabPanel>

                <TabPanel>
                    <h3>Floor Plan</h3>
                    {/* Placeholder for now - normally this is an image */}
                    <div style={{height: '300px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        Floor Plan Image Would Go Here
                    </div>
                </TabPanel>

                <TabPanel>
                    <h3>Map</h3>
                    {/* Placeholder for Google Map */}
                    <div style={{height: '300px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        Google Map Integration (Placeholder)
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default PropertyPage;