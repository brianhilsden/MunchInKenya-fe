import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function FoodItem() {
    const { id } = useParams();
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    const [foodItem, setFoodItem] = useState(null);

    useEffect(() => {
        fetch(`https://muchinkenya-be.onrender.com/food_by_id/${id}`)
            .then(res => res.json())
            .then(data => {
                setFoodItem(data);
            })
            .catch(error => console.error('Error fetching food item:', error));
    }, [id]);

    const handleAddToCart = () => {
        if(!user){
            alert("Kindly log in first")
        }
        else if (foodItem) {
            addToCart(foodItem);
            navigate('/cart');
            alert(`${foodItem.name} has been added to the cart!`);
        }
    };

    if (foodItem){
        return (
            <div
                className="container-fluid d-flex align-items-center justify-content-center"
                style={{
                    minHeight: "100vh",
                    backgroundImage: `url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, // Background image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed', // Optional: Ensures the background image stays in place during scroll
                    backgroundColor: '#f5f5dc' // Beige color to complement the image
                }}
            >
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="carrier p-4">
                            <div className="details_carrier row align-items-center rounded p-4 shadow p-3 mb-5" style={{ backgroundColor: '#bfbfbf' }}>
                                {/* Rich Chocolate Brown color */}
                                <div className="col-md-6">
                                    {foodItem && <img src={foodItem.image} alt="Food" className="img-fluid rounded" />}
                                </div>
                                <div className="col-md-6 text-center">
                                    {foodItem ? (
                                        <div>
                                            <h1 className="mb-3" style={{ color: '#ffffff' }}>{foodItem.name}</h1> {/* White text for contrast */}
                                            <p className="mb-3" style={{ color: '#ffffff' }}>{foodItem.description}</p> {/* White text for contrast */}
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
        );

    }
    else{
        return(
            <><Button variant="secondary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>{' '}
          <Button variant="dark" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
            </>
        )
    }
    
}

export default FoodItem;
