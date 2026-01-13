import React, { useState } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();

    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);

    // ✅ Task-1 state
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" }
            ]
        }
        // (keep rest of your categories unchanged)
    ];

    // ✅ Task-1 function
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));

        setAddedToCart(prev => ({
            ...prev,
            [plant.name]: true
        }));
    };

    const styleObj = {
        backgroundColor: '#4CAF50',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar" style={styleObj}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" onClick={handleHomeClick}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>

                <div style={styleObjUl}>
                    <div><a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a></div>
                    <div><a href="#" onClick={handleCartClick} style={styleA}>🛒</a></div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((category, catIndex) =>
                        category.plants.map((plant, index) => (

                            <div className="product-card" key={`${catIndex}-${index}`}>
                                <img src={plant.image} alt={plant.name} />
                                <h3>{plant.name}</h3>
                                <p>{plant.description}</p>
                                <p>{plant.cost}</p>

                                <button
                                    onClick={() => handleAddToCart(plant)}
                                    disabled={addedToCart[plant.name]}
                                >
                                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                </button>
                            </div>

                        ))
                    )}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
