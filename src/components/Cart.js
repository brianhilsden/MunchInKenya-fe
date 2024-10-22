import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Cart() {
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    const handlePurchase = (item) => {
        const purchaseData = {
            food_id: item.id,
            customer_id: user.id // Replace with the actual customer ID as needed
        };

        fetch('https://munchinkenya-be.vercel.app/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchaseData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(`Purchased ${item.name} successfully!`);
            navigate('/MunchInKenya-fe/trackOrder');
        })
        .catch(error => {
            console.error('There was a problem with the purchase:', error);
            alert('Purchase failed. Please try again.');
        });
    };

    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundColor: '#f5f5dc',
            }}
        >
            <h1 className="text-white text-4xl mb-6 font-bold">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-textSecondary">Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cart.map((item) => (
                        <motion.div
                            key={item.id}
                            className="bg-surface rounded-lg shadow-lg overflow-hidden"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h5 className="text-primary text-lg font-semibold mb-2">{item.name}</h5>
                                <p className="text-textSecondary mb-2">{item.description}</p>
                                <p className="text-accent font-bold mb-4">Price: {item.price.toFixed(2)}</p>
                                <div className="flex justify-between">
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                                        onClick={() => handlePurchase(item)}
                                    >
                                        Purchase
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
