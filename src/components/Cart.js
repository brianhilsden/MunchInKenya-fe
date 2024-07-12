import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

function Cart() {
    const [addToCart, removeFromCart, cart] = useOutletContext();

    console.log('Cart contents:', cart); // For debugging

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
                                    <button className="btn btn-danger me-2" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    <button className="btn btn-primary" onClick={() => alert(`Purchased ${item.name}`)}>Purchase</button>
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
