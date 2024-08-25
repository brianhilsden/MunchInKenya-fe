import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`https://munchinkenya-be.vercel.app/restaurant_menu/${id}`);
        setMenu(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) return <p> <Button variant="success" disabled>
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
  Getting the menu ready...
</Button></p>;
  if (error) return <p>Error loading menu: {error.message}</p>;

  return (
    <div className="container">
      <h1>Restaurant Menu</h1>
      {menu ? (
        <div className="row">
          {menu.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <Link to={`/MunchInKenya-fe/fooditem/${item.id}`} className="text-decoration-none">
                <div className="card h-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Ksh.{item.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No menu available.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
