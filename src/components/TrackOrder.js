import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function TrackOrder() {
    const [orderStatus, setOrderStatus] = useState('Preparing order');
    const [showReview,setShowReview] = useState(false)
    const [message,setMessage] = useState("")
    const [ ,user, setUser,setIsLoggedIn] = useOutletContext();
    const [orders,setOrders] = useState()

    const simulateOrderProgress = () => {
      setTimeout(() => setOrderStatus('Driver Picking Up'), 3000);
      setTimeout(() => setOrderStatus('On the way'), 6000);
      setTimeout(() => setOrderStatus('Delivered'), 12000);
    };
    useEffect(()=>{
        if (orderStatus == "Delivered"){
            setShowReview(true)

        }

    },[orderStatus])

    function handleChange(e){
        setMessage(e.target.value) 
    }
    useEffect(()=>{
        if (user){

        fetch(`http://127.0.0.1:5555/past_orders/${user.id}`)
        .then(res=>res.json())
        .then(data=>setOrders(data))
        }
        


    },[user])
    


    function reviewFood(e){

        e.preventDefault()
        fetch("http://127.0.0.1:5555/reviews",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "message":message,
                "customer_id":user.id,
                "food_id":2
            })
            
        }).then(res=>res.json())
        .then(setMessage(""))
        .then(setShowReview(false))
    }
    console.log(orders);
    
    if (user){
        return (
            <div>
              <h1>Order Status: {orderStatus}</h1>
              {orderStatus === 'Preparing order' && (
                <>
                <button onClick={simulateOrderProgress}>Start Order</button>
                <p>Cutting up the onions...</p>
                </>
              )}
              {orderStatus === 'Driver Picking Up' && (
                <p>Driver is picking up your order...</p>
              )}
              {orderStatus === 'On the way' && (
                <p>Your order is on the way!It will be with you soon.</p>
              )}
              {orderStatus === 'Delivered' && (
                <p>Your order has been delivered! Thank you for ordering with us. Enjoy!</p>
              )}
              <h2>Past Orders</h2>

              {showReview && <form onSubmit={reviewFood}>
                <div className="mb-3">
                  <label for="message" className="form-label">We would love for you to leave a review for the food below:</label>
                  <textarea className="form-control" id="message" rows="3" onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>}
              {orders && <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Driver</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <th scope="row">{order.id}</th>
                      <td>{order.food_name}</td>
                      <td>{order.driver_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
              
             
            </div>
          );

    }
    else{
        return(
            <div>
                <h1>Kindly log in to make an order</h1>
            </div>
        )
    }
    
  }

export default TrackOrder;