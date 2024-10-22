import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function TrackOrder() {
    const [orderStatus, setOrderStatus] = useState('No ongoing orders');
    const [progressbarPosition, setprogressbarPosition] = useState(0);
    const [showReview, setShowReview] = useState(false);
    const [message, setMessage] = useState("");
    const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn, latestOrder, setLatestOrder] = useOutletContext();
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState();

    const simulateOrderProgress = () => {
        const totalDuration = 13500; 
        const progressUpdateInterval = 50;
        const totalSteps = totalDuration / progressUpdateInterval;
        let stepCount = 0;

        const interval = setInterval(() => {
            setprogressbarPosition((prev) => Math.min(prev + 100 / totalSteps, 100)); 
            stepCount++;

            if (stepCount * progressUpdateInterval >= 3500 && stepCount * progressUpdateInterval < 7500) {
                setOrderStatus('Driver Picking Up');
            } else if (stepCount * progressUpdateInterval >= 7500 && stepCount * progressUpdateInterval < 13500) {
                setOrderStatus('On the way');
            } else if (stepCount * progressUpdateInterval >= 13500) {
                setOrderStatus('Delivered');
                setprogressbarPosition(0);
                clearInterval(interval); 
            }
        }, progressUpdateInterval);
    };

    useEffect(() => {
        if (orderStatus === "Delivered") {
            setShowReview(true);
        }
    }, [orderStatus]);

    function handleChange(e) {
        setMessage(e.target.value);
    }

    useEffect(() => {
        if (user) {
            fetch(`https://munchinkenya-be.vercel.app/past_orders/${user.id}`)
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    }, [user]);

    useEffect(() => {
        if (orders.length) {
            if (!latestOrder) {
                setLatestOrder(orders[0]);
                setCurrentOrder(orders[0]);
                setOrderStatus("Preparing order");
                simulateOrderProgress();
            } else if (latestOrder.id === orders[0].id) {
                setLatestOrder(orders[0]);
            } else {
                setLatestOrder(orders[0]);
                setCurrentOrder(orders[0]);
                setOrderStatus("Preparing order");
                simulateOrderProgress();
            }
        }
    }, [orders]);

    function reviewFood(e) {
        e.preventDefault();
        fetch("https://munchinkenya-be.vercel.app/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "message": message,
                "customer_id": user.id,
                "food_id": currentOrder.food_id
            })
        })
        .then(res => res.json())
        .then(() => setMessage(""))
        .then(() => setShowReview(false));
    }

    if (user) {
        return (
            <div className="p-6 bg-background min-h-screen">
                <motion.div 
                    className="relative w-full h-2 bg-surface rounded-full overflow-hidden mb-6"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressbarPosition}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="h-full bg-primary"></div>
                </motion.div>

                <h1 className="text-2xl font-poppins text-textPrimary mb-4">Order Status: {orderStatus}</h1>

                {orderStatus === 'Preparing order' && (
                    <>
                        {currentOrder && <h2 className="text-xl font-poppins text-textSecondary">Cutting up the onions... {currentOrder.food_name} will be ready soon</h2>}
                    </>
                )}

                {orderStatus === 'Driver Picking Up' && (
                    currentOrder && <h2 className="text-xl font-poppins text-textSecondary">{currentOrder.driver_name} is picking up your order...</h2>
                )}

                {orderStatus === 'On the way' && (
                    currentOrder && <h2 className="text-xl font-poppins text-textSecondary">Your order is on the way! It will be with you soon.</h2>
                )}

                {orderStatus === 'Delivered' && (
                    currentOrder && <h2 className="text-xl font-poppins text-textSecondary">Your order has been delivered! Thank you {user.name} for ordering with us. Enjoy!</h2>
                )}

                {showReview && (
                    <form onSubmit={reviewFood} className="mt-6 space-y-4">
                        <div className="flex flex-col items-center">
                            <label htmlFor="message" className="text-lg font-poppins">We would love for you to leave a review:</label>
                            <textarea 
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                id="message"
                                rows="3"
                                onChange={handleChange}
                                value={message}
                            ></textarea>
                            <button type="submit" className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90">Submit</button>
                        </div>
                    </form>
                )}

                {orders && (
                    <table className="w-full mt-6 table-auto bg-surface rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Food Name</th>
                                <th className="p-4">Driver/Rider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="text-center border-t hover:bg-background">
                                    <td className="p-4">{order.id}</td>
                                    <td className="p-4">{order.food_name}</td>
                                    <td className="p-4">{order.driver_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    } else {
        return (
            <div className="p-6 bg-background min-h-screen">
                <h1 className="text-2xl font-poppins text-textPrimary">Kindly log in to make an order</h1>
            </div>
        );
    }
}

export default TrackOrder;
