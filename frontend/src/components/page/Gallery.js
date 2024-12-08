import React from 'react';
import '../css/Gallery.css'; // Ensure you have the correct CSS file for styling

const Gallery = () => {
    return (
        <div className="gallery-container">
            <h1 className="gallery">Gallery</h1>
            
            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery.jpg" alt="Gallery1" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_2.jpg" alt="Gallery2" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_3.jpg" alt="Gallery3"/>
                </div>
            </div>
            {/* You can add more gallery content here */}

            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery_4.jpeg" alt="Gallery4" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_5.png" alt="Gallery5" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_6.jpeg" alt="Gallery6"/>
                </div>
            </div>

            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery_7.jpg" alt="Gallery7" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_8.jpg" alt="Gallery8" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_9.jpg" alt="Gallery9"/>
                </div>
            </div>

            <div className="photos">
                <div className="images">
                    <img src="/images/Gallery_10.jpeg" alt="Gallery10" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_11.jpg" alt="Gallery11" />
                </div>
                <div className="images">
                    <img src="/images/Gallery_12.jpeg" alt="Gallery12"/>
                </div>
            </div>

        </div>
        
    );
};

export default Gallery;
