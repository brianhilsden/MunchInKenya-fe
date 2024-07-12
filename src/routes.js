import App from "./App";
import ContactUs from "./components/ContactUs";
import FoodItem from "./components/FoodItem";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import RestaurantMenu from "./components/RestaurantMenu";
import SignUp from "./components/SignUp";
import TrackOrder from "./components/TrackOrder";
import ErrorPage from "./components/ErrorPage";

import FeedbackForm from "./components/Feedback";

import Cart from "./components/Cart";

const routes = [
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/contactUs", element: <ContactUs /> },
      { path: "/foodItem/:id", element: <FoodItem /> },
      { path: "/login", element: <Login /> },
      {
        path: "/restaurantMenu/:id",
        element: <RestaurantMenu />,
      },
      { path: "/signUp", element: <SignUp /> },
      { path: "/trackOrder", element: <TrackOrder /> },

      {path:  "/feedbackForm", element:<FeedbackForm/>},

      { path: "/cart", element: <Cart />}

    ]
  }
];
export {routes}
