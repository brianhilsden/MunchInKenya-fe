import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function FoodItem() {
    const { id } = useParams();
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    const [foodItem, setFoodItem] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/food_by_id/${id}`)
            .then(res => res.json())
            .then(data => {
                setFoodItem(data);
            })
            .catch(error => console.error('Error fetching food item:', error));
    }, [id]);

    const handleAddToCart = () => {
        if (foodItem) {
            addToCart(foodItem);
            navigate('/cart');
            alert(`${foodItem.name} has been added to the cart!`);
        }
    };

    // Ensure foodItem is not null before accessing its properties
    if (!foodItem) {
        return <p>Loading food item...</p>;
    }

    return (
        <div
            className="container-fluid d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                backgroundImage: `url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundColor: '#f5f5dc'
            }}
        >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="carrier p-4">
                        <div className="details_carrier row align-items-center rounded p-4 shadow p-3 mb-5" style={{ backgroundColor: '#bfbfbf' }}>
                            <div className="col-md-6">
                                {foodItem && <img src={foodItem.image} alt="Food" className="img-fluid rounded" />}
                            </div>
                            <div className="col-md-6 text-center">
                                <div>
                                    <h1 className="mb-3" style={{ color: '#ffffff' }}>{foodItem.name}</h1>
                                    <p className="mb-3" style={{ color: '#ffffff' }}>{foodItem.description}</p>
                                    <div className="mb-3">
                                        <span className="text-muted">Price:</span> {foodItem.price.toFixed(2)}
                                    </div>
                                    <button className="btn btn-primary mb-3" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="reviews mt-4">
                            <h3 className="mb-3" style={{ color: '#ffffff', textAlign: 'center' }}>Reviews</h3>
                            {foodItem.reviews && foodItem.reviews.length > 0 ? (
                                <ul className="list-group">
                                    {foodItem.reviews.map((review, index) => (
                                        <li key={index} className="list-group-item">
                                            <p className="mb-0">{review.message}</p>
                                            {/* Add more details if available */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted text-center">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodItem;
