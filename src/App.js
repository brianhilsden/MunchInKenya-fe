
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
    const [latestOrder,setLatestOrder] = useState()

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (token) {
        fetch('https://munchinkenya-7uhdoq4y7-brianhilsdens-projects.vercel.app/check_session', {
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
        fetch("https://munchinkenya-7uhdoq4y7-brianhilsdens-projects.vercel.app/restaurant")
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
    
      useEffect(()=>{
        if (user){
          fetch(`https://munchinkenya-7uhdoq4y7-brianhilsdens-projects.vercel.app/past_orders/${user.id}`)
        .then(res=>res.json())
        .then(data=>setLatestOrder(data[0]))

        }
        
  
      },[user])
    
      
  return (
    <>

      <Navbar search = {search} setSearch={setSearch} setUser={setUser} loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} setCart={setCart}/>
      <Outlet context={[data,filteredList,addToCart,removeFromCart,cart,user,setUser,setIsLoggedIn,latestOrder,setLatestOrder]}/>  



    </>
  )
  }

export default App;
