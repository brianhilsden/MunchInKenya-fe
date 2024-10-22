import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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

  if (loading) {
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

  if (error) {
    return <p className="text-center text-red-600">Error loading menu: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-semibold text-secondary mb-6">
        Restaurant Menu
      </h1>
      {menu ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <motion.div
              key={item.id}
              className="bg-surface shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Link to={`/MunchInKenya-fe/fooditem/${item.id}`} className="text-decoration-none">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-xl font-semibold text-secondary">{item.name}</h5>
                  <p className="text-sm text-textSecondary mb-2">{item.description}</p>
                  <p className="text-lg font-semibold text-primary">Ksh.{item.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No menu available.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
