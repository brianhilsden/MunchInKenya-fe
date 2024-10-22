import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';

function FoodItem() {
    const { id } = useParams();
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    const [foodItem, setFoodItem] = useState(null);

    useEffect(() => {
        fetch(`https://munchinkenya-be.vercel.app/food_by_id/${id}`)
            .then(res => res.json())
            .then(data => {
                setFoodItem(data);
            })
            .catch(error => console.error('Error fetching food item:', error));
    }, [id]);

    const handleAddToCart = () => {
        if (!user) {
            alert("Kindly log in first");
        } else if (foodItem) {
            addToCart(foodItem);
            navigate('/MunchInKenya-fe/cart');
            alert(`${foodItem.name} has been added to the cart!`);
        }
    };

    if (foodItem) {
        return (
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                }}>
                <div className="w-full md:w-3/4 bg-background p-6 rounded-lg shadow-lg">
                    <motion.div 
                        className="flex flex-col md:flex-row items-center justify-center gap-4 bg-surface p-4 rounded-lg shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-full md:w-1/2">
                            {foodItem && <img src={foodItem.image} alt="Food" className="w-full h-auto rounded-lg shadow-md" />}
                        </div>
                        <div className="w-full md:w-1/2 text-center">
                            {foodItem ? (
                                <div>
                                    <h1 className="text-secondary text-3xl font-semibold mb-3">{foodItem.name}</h1>
                                    <p className="text-textSecondary mb-3">{foodItem.description}</p>
                                    <div className="text-secondary mb-3">
                                        <span className="text-gray-400">Price:</span> KSH {foodItem.price.toFixed(2)}
                                    </div>
                                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                        onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            ) : (
                                <p className="text-white">Loading food item...</p>
                            )}
                        </div>
                    </motion.div>

                    <div className="mt-8">
                        <h3 className="text-secondary text-2xl font-semibold text-center mb-4">Reviews</h3>
                        {foodItem.reviews && foodItem.reviews.length > 0 ? (
                            <ul className="space-y-4">
                                {foodItem.reviews.map((review, index) => (
                                    <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                                        <p className="text-gray-700">{review.message}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white text-center">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <motion.div 
                    className="bg-surface text-textPrimary p-4 rounded-md"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="animate-spin h-6 w-6 border-t-2 border-primary rounded-full mx-auto"></div>
                    <span className="text-textPrimary">Loading...</span>
                </motion.div>
            </div>
        );
    }
}

export default FoodItem;
