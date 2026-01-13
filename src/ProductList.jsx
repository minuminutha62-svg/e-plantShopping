import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {

  const dispatch = useDispatch();

  // Redux cart state
  const cartItems = useSelector(state => state.cart.items);

  // Total quantity for cart icon
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "...", description: "Air purifier", cost: "$15" },
        { name: "Spider Plant", image: "...", description: "Air purifier", cost: "$12" },
        { name: "Peace Lily", image: "...", description: "Air purifier", cost: "$18" },
        { name: "Boston Fern", image: "...", description: "Air purifier", cost: "$20" },
        { name: "Rubber Plant", image: "...", description: "Air purifier", cost: "$17" },
        { name: "Aloe Vera", image: "...", description: "Air purifier", cost: "$14" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi", image: "...", description: "Medicinal", cost: "$10" },
        { name: "Mint", image: "...", description: "Medicinal", cost: "$9" },
        { name: "Neem", image: "...", description: "Medicinal", cost: "$11" },
        { name: "Basil", image: "...", description: "Medicinal", cost: "$8" },
        { name: "Lavender", image: "...", description: "Medicinal", cost: "$13" },
        { name: "Rosemary", image: "...", description: "Medicinal", cost: "$14" }
      ]
    },
    {
      category: "Indoor Decorative Plants",
      plants: [
        { name: "ZZ Plant", image: "...", description: "Decorative", cost: "$22" },
        { name: "Pothos", image: "...", description: "Decorative", cost: "$16" },
        { name: "Fiddle Leaf Fig", image: "...", description: "Decorative", cost: "$25" },
        { name: "Areca Palm", image: "...", description: "Decorative", cost: "$19" },
        { name: "Calathea", image: "...", description: "Decorative", cost: "$21" },
        { name: "Monstera", image: "...", description: "Decorative", cost: "$24" }
      ]
    }
  ];
  

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
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="logo"
          />
          <a href="/" onClick={handleHomeClick}>
            <div>
              <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
              <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
          </div>

          <div style={{ position: "relative" }}>
            <a href="#" onClick={handleCartClick} style={styleA}>🛒</a>

            {totalQuantity > 0 && (
              <span className="cart_quantity_count">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Page content */}
      {showCart ? (

        <CartItem onContinueShopping={handleContinueShopping} />

      ) : showPlants ? (

        <div className="product-grid">
          <div className="product-list">

            {plantsArray.map((category, catIndex) =>
              category.plants.map((plant, index) => (
                <div className="product-card" key={`${catIndex}-${index}`}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="product-image"
                  />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p>{plant.cost}</p>

                  <button
                    className="product-button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))
            )}

          </div>
        </div>

      ) : null}

    </div>
  );
}

export default ProductList;
