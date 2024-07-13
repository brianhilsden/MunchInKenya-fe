
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

import { useState, useEffect } from 'react';

function App() {
    const [cart, setCart] = useState([]);
    const addToCart = (item) => {
        setCart((prevCart) => {
            const newCart = [...prevCart, item];
            console.log('Updated cart:', newCart); // Log the updated cart state
            return newCart;
        });
    };
    

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };
    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    const [data, setData] = useState([]);
    const [user,setUser] = useState()
    const [loggedIn,setIsLoggedIn] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (token) {
        fetch('http://127.0.0.1:5555/check_session', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to verify token');
          }
          return response.json(); // Parse JSON response
        })
        .then(userData => {
          setIsLoggedIn(true);
          setUser(userData); // Set user data once fetched
        })
        .catch(error => {
          console.error('Token verification failed:', error);
          setIsLoggedIn(false);
          setUser(null); // Reset user state if verification fails
          localStorage.removeItem('access_token');
        });
      }
    }, []);

    useEffect(()=>{
        fetch("http://127.0.0.1:5555/restaurant")
        .then((res)=>res.json())
        .then((data)=>setData(data))
    },[])
    useEffect(() => {
          const filterList = () => {
            const keywords = search.toLowerCase().split(" ");
            const filteredList = data.filter((restaurant) => {
              return keywords.every((keyword) => {
                return (
                  restaurant.name.toLowerCase().includes(keyword)
                );
              });
            });
            setFilteredList(filteredList);
          };
      
      
          const delaySearch = setTimeout(() => {
            filterList();
          }, 300); 
      
          return () => clearTimeout(delaySearch);
        }, [search, data]); 
      console.log(user);
      
  return (
    <>

      <Navbar search = {search} setSearch={setSearch} setUser={setUser} loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Outlet context={[data,filteredList,addToCart,removeFromCart,cart,user,setUser,setIsLoggedIn]}/>  



    </>
  )
  }

export default App;
