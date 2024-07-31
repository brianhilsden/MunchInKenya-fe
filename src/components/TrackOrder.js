import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

function TrackOrder() {
    const [orderStatus, setOrderStatus] = useState('No ongoing orders');
    const [progressbarPosition,setprogressbarPosition] = useState(0)
    const [showReview,setShowReview] = useState(false)
    const [message,setMessage] = useState("")
    const [data,filteredList,addToCart,removeFromCart,cart,user,setUser,setIsLoggedIn,latestOrder,setLatestOrder] = useOutletContext();
    const [orders,setOrders] = useState([])
    const [currentOrder,setCurrentOrder] = useState()
    const simulateOrderProgress = () => {
      const totalDuration = 13500; // Total duration in milliseconds for the entire process
      const progressUpdateInterval = 50; // Interval at which progress bar updates
      const totalSteps = totalDuration / progressUpdateInterval; // Total steps for the progress bar
    
      let stepCount = 0;
    
      const interval = setInterval(() => {
        setprogressbarPosition((prev) => Math.min(prev + 100 / totalSteps, 100)); // Update progress bar
        stepCount++;
    
        // Update order status based on the elapsed time
        if (stepCount * progressUpdateInterval >= 3500 && stepCount * progressUpdateInterval < 7500) {
          setOrderStatus('Driver Picking Up');
        } else if (stepCount * progressUpdateInterval >= 7500 && stepCount * progressUpdateInterval < 13500) {
          setOrderStatus('On the way');
        } else if (stepCount * progressUpdateInterval >= 13500) {
          setOrderStatus('Delivered');
          setprogressbarPosition(0)
          clearInterval(interval); // Clear the interval once the order is delivered
        }
      }, progressUpdateInterval);
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

        fetch(`https://munchinkenya-7uhdoq4y7-brianhilsdens-projects.vercel.app/past_orders/${user.id}`)
        .then(res=>res.json())
        .then(data=>setOrders(data))
        }
        


    },[user])
    useEffect(()=>{
      if (orders.length ){
        if(!latestOrder){
          setLatestOrder(orders[0])
          setCurrentOrder(orders[0])
          setOrderStatus("Preparing order")
          simulateOrderProgress()
        

        }
        else if(latestOrder.id==orders[0].id){
          setLatestOrder(orders[0])
          
        }
        else{
          setLatestOrder(orders[0])
          setCurrentOrder(orders[0])
          setOrderStatus("Preparing order")
          simulateOrderProgress()
          
        }

      }
     

    },[orders])
    


    function reviewFood(e){

        e.preventDefault()
        fetch("https://munchinkenya-7uhdoq4y7-brianhilsdens-projects.vercel.app/reviews",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "message":message,
                "customer_id":user.id,
                "food_id":currentOrder.food_id
            })
            
        }).then(res=>res.json())
        .then(setMessage(""))
        .then(setShowReview(false))
    }


    if (user){
        return (
            <div>
              <ProgressBar animated now={progressbarPosition} />;
              <h1 className="ms-3">Order Status: {orderStatus}</h1>
              {orderStatus === 'Preparing order' && (
                <>
               
                {currentOrder && <h2 className="ms-4">Cutting up the onions...{currentOrder.food_name} will be ready soon</h2>}
                </>
              )}
              {orderStatus === 'Driver Picking Up' && (
                currentOrder && <h2 className="ms-4">{currentOrder.driver_name} is picking up your order...</h2>
              )}
              {orderStatus === 'On the way' && (
                currentOrder && <h2 className="ms-4">Your order is on the way!It will be with you soon.</h2>
              )}
              {orderStatus === 'Delivered' && (
               currentOrder && <h2 className="ms-4">Your order has been delivered! Thank you {user.name} for ordering with us. Enjoy!</h2>
              )}
             

              {showReview && <form onSubmit={reviewFood} >
                <div className="mb-3" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <label for="message" className="form-label">We would love for you to leave a review for the food below:</label>
                  <textarea className="form-control mb-2" id="message" rows="3" onChange={handleChange}></textarea>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
               
              </form>}
              {orders && <table className="table table-striped table-hover">
                
                <thead>
                  <tr><th scope="col" colSpan={3} style={{textAlign:"center"}}>Order history</th></tr>
                  <tr>

                    <th scope="col">Order ID</th>
                    <th scope="col">Food name</th>
                    <th scope="col">Driver/Rider</th>

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