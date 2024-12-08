import React, { useEffect, useState } from 'react';
import '../css/Home.css'; 

const images = [
    {
        src: '/images/Home_1.jpg',
        name: 'Peacock Corridor Holiday House',
        description: 'Nestled in the heart of Mathugama, Peacock Corridor Holiday House offers a serene escape with stunning views and exceptional service. Experience the perfect blend of comfort and nature during your stay.'
    },
    {
        src: '/images/Home_2.jpg', 
        name: 'Peacock Corridor Holiday House',
        description: 'Nestled in the heart of Mathugama, Peacock Corridor Holiday House offers a serene escape with stunning views and exceptional service. Experience the perfect blend of comfort and nature during your stay.'
    },
    
];

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval); 
    }, []);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="home">
            
            <div className="image-container">
                
                <img src={images[currentIndex].src} alt="Hotel" className="background-image" />
                
                
                <div className="overlay">
                    <h1 className="hotel-name">{images[currentIndex].name}</h1>
                    <p className="hotel-description">{images[currentIndex].description}</p>
                </div>

                
                <button className="nav-button left" onClick={prevImage}>&#10094;</button>
                <button className="nav-button right" onClick={nextImage}>&#10095;</button>
            </div>

            
            <div className="why-peacock-corrido">
                <div className="content">
                    <h2>Welcome to Peacock Corridor Holiday House</h2>
                    <p>
                      Our restaurant is a peaceful retreat surrounded by nature, 
                      featuring a lovely pool and all the comforts you need. 
                      Whether you're dining with us or enjoying a stay, 
                      we offer a wonderful culinary experience with a variety of food and drinks. 
                      You can also place orders online, bringing the delicious flavors of our kitchen straight to your table, 
                      wherever you are.
                    </p>
                </div>
                <div className="image">
                <img src="/images/Home_9.jpg" alt="Description" />
                </div>
            </div>

            
            <div className="food">
                <div className="content">
                    <h2>Fresh Flavors at Peacock Corridor Holiday House</h2>
                    <p>
                      At Peacock Corrido Holiday House, we serve a variety of delicious dishes made from fresh, 
                      seasonal ingredients. 
                      Our menu offers everything from tasty starters to flavorful main courses and sweet desserts. 
                      Each meal is carefully prepared to bring out the best flavors. 
                      Whether you want something light or a full meal, we have something for everyone to enjoy. 
                      Experience the great taste of our food in a relaxing, natural setting.
                    </p>
                </div>
                <div className="image">
                    <img src="/images/Home_4.jpg" alt="Delicious Dish" />
                </div>
            </div>

            
            <div className="why-peacock-corrido">
                <div className="content">
                    <h2>Customer Service</h2>
                    <p>
                      We are committed to providing great customer service at Peacock Corridor Holiday House. 
                      Our friendly staff is here to help you with anything you need, 
                      from making reservations to answering your questions. 
                      Whether you're dining with us or ordering online, we want to make sure you have a wonderful experience. 
                      Your satisfaction is our priority!
                    </p>
                </div>
                <div className="image">
                <img src="/images/About_2.jpg" alt="Service" />
                </div>
            </div>

            
            <div className="photo">
                <div className="image">
                    <img src="/images/Home_3.jpeg" alt="Food" className="small-image rotate1" />
                </div>
                <div className="image">
                    <img src="/images/Home_5.jpeg" alt="Table" className="small-image rotate2"/>
                </div>
                <div className="image">
                    <img src="/images/Home_13.jpg" alt="Room"  className="small-image rotate3"/>
                </div>
            </div>

        </div>
    );
}

export default Home;
