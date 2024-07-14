import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    const handlePurchase = (item) => {
        const purchaseData = {
            food_id: item.id,
            customer_id: user.id // Replace with the actual customer ID as needed
        };

        fetch('https://muchinkenya-be.onrender.com/orders', {
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
            navigate('/trackOrder');
        })
        .catch(error => {
            console.error('There was a problem with the purchase:', error);
            alert('Purchase failed. Please try again.');
        });
        
    };

    const handleRemove = (itemId) => {
        fetch(`https://muchinkenya-be.onrender.com/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            removeFromCart(itemId);
        })
        .catch(error => {
            console.error('There was a problem with the removal:', error);
            alert('Removal failed. Please try again.');
        });
    };

    return (
        <div
            className="container my-4 rounded"
            style={{
                backgroundImage: `url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, // Background image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f5f5dc', // Beige color to complement the image
                minHeight: '100vh', // Ensure the container fills the viewport height
                padding: '20px' // Add padding for spacing
            }}
        >
            <h1 className="text-center mb-4" style={{ color: '#ffffff' }}>Your Cart</h1> {/* White text for contrast */}

            {cart.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty</p>
            ) : (
                <div className="row">
                    {cart.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card" style={{ backgroundColor: '#bfbfbf' }}>
                                <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: '#ffffff' }}>{item.name}</h5> {/* White text for contrast */}
                                    <p className="card-text" style={{ color: '#ffffff' }}>{item.description}</p> {/* White text for contrast */}
                                    <p className="card-text" style={{ color: '#ffffff' }}>
                                        <strong>Price: {item.price.toFixed(2)}</strong>
                                    </p>
                                    <button className="btn btn-danger me-2" onClick={() => handleRemove(item.id)}>Remove</button>
                                    <button className="btn btn-primary" onClick={() => handlePurchase(item)}>Purchase</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    );
}

export default Cart;
