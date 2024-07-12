import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantMenu({ id }) {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMenu() {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/restaurant_menu/${id}`);
                setMenu(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchMenu();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading menu: {error.message}</p>;

    return (
        <div>
            <h1>Restaurant Menu</h1>
            {menu ? (
                <ul>
                    {menu.items.map((item) => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>${item.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No menu items available.</p>
            )}
        </div>
    );
}

export default RestaurantMenu;
