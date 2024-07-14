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
    path: "/MunchInKenya-fe",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/MunchInKenya-fe", element: <LandingPage /> },
      { path: "/MunchInKenya-fe/contactUs", element: <ContactUs /> },
      { path: "/MunchInKenya-fe/foodItem/:id", element: <FoodItem /> },
      { path: "/MunchInKenya-fe/login", element: <Login /> },
      {
        path: "/MunchInKenya-fe/restaurantMenu/:id",
        element: <RestaurantMenu />,
      },
      { path: "/MunchInKenya-fe/signUp", element: <SignUp /> },
      { path: "/MunchInKenya-fe/trackOrder", element: <TrackOrder /> },

      {path:  "/MunchInKenya-fe/feedbackForm", element:<FeedbackForm/>},

      { path: "/MunchInKenya-fe/cart", element: <Cart />}

    ]
  }
];
export {routes}
