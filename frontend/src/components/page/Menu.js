import React from 'react';
import '../css/Menu.css'; 

function Menu() {
    return (
        <div className="menu-page">
            
            <div className="menu-header">
                <h1 className="menu-title">Our Delicious Menu</h1>
                <p className="menu-subtitle">Explore a wide variety of dishes prepared by our top chefs.</p>
            </div>

            
            <div className="menu-section">
                <h2 className="menu-section-title">Starters</h2>
                <ul className="menu-items">
                    <li>Bruschetta - $8</li>
                    <li>Garlic Bread - $6</li>
                    <li>Greek Salad - $10</li>
                </ul>
            </div>

            <div className="menu-section">
                <h2 className="menu-section-title">Main Course</h2>
                <ul className="menu-items">
                    <li>Grilled Salmon - $18</li>
                    <li>Steak with Garlic Butter - $25</li>
                    <li>Vegetable Lasagna - $15</li>
                </ul>
            </div>

            <div className="menu-section">
                <h2 className="menu-section-title">Desserts</h2>
                <ul className="menu-items">
                    <li>Chocolate Lava Cake - $9</li>
                    <li>Cheesecake - $7</li>
                    <li>Fruit Tart - $6</li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
