import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantMenu = () => {
  const { id } = useParams();
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
          {menu.map((item) => (
            <li key={item.id}>
              <Link to={`/fooditem/${item.id}`}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <div>{item.name}: {item.description}: ${item.price}</div>
              </Link>
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

