import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FoodItem() {
    const { id } = useParams();
    const [data,filteredList,addToCart,removeFromCart,cart,user,setUser,setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate()

    const [foodItem, setFoodItem] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/food_by_id/${id}`)
            .then(res => res.json())
            .then(data => {
                setFoodItem(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const handleAddToCart = () => {
        if (foodItem) {
            addToCart(foodItem);
            navigate('/cart')
            alert(`${foodItem.name} has been added to the cart!`);
        }
    };

    const background = foodItem && foodItem.price > 10 ? '#f0f0f0' : '#ffffff';

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="carrier p-4">
                        <div className="details_carrier row align-items-center border rounded p-4 shadow p-3 mb-5 bg-white rounded" style={{ backgroundColor: background }}>
                            <div className="col-md-6">
                                {foodItem && <img src={foodItem.image} alt="Food" className="img-fluid rounded" />}
                            </div>
                            <div className="col-md-6 text-center">
                                {foodItem ? (
                                    <div>
                                        <h1 className="mb-3">{foodItem.name}</h1>
                                        <p className="mb-3">{foodItem.description}</p>
                                        <div className="mb-3">
                                            <span className="text-muted">Price:</span> {foodItem.price.toFixed(2)}
                                        </div>
                                        <button className="btn btn-primary mb-3" onClick={handleAddToCart}>
                                            Add to Cart
                                        </button>
                                    </div>
                                ) : (
                                    <p>Loading food item...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodItem;
