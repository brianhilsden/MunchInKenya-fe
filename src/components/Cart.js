import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate()

    const handlePurchase = (item) => {
        const purchaseData = {
            food_id: item.id,
            customer_id: 1 // Replace with the actual customer ID as needed
        };

        fetch('http://127.0.0.1:5555/orders', {
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
        })
        .catch(error => {
            console.error('There was a problem with the purchase:', error);
            alert('Purchase failed. Please try again.');
        });
        navigate('/trackOrder')
    }

    const handleRemove = (itemId) => {
        fetch(`http://127.0.0.1:5555/orders/${itemId}`, {
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
    }

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty</p>
            ) : (
                <div className="row">
                    {cart.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">
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
