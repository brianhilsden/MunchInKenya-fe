// src/RestaurantMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantMenu = ({ id }) => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5555/restaurant_menu/${id}`);
        setMenu(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

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
              {item.name}: {item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No menu available.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
