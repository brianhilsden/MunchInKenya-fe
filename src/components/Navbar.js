import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/images/MunchInKenyaLogo.png";
import { FaHome, FaSignInAlt, FaBox, FaUserAlt, FaPhoneAlt, FaRegPaperPlane } from "react-icons/fa"; 

function Navbar({
  search,
  setSearch,
  setUser,
  loggedIn,
  setIsLoggedIn,
  setCart,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const restaurantElement = document.querySelector("#restaurants");
    if (restaurantElement) {
      setTimeout(() => {
        restaurantElement.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      console.error("Element with ID 'restaurants' not found.");
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    setIsLoggedIn(false);
    setCart([]);
    setUser(null);
    navigate("/MunchInKenya-fe");
  };

  return (
    <motion.nav className="bg-surface shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/MunchInKenya-fe"
          className="flex items-center justify-center text-3xl font-semibold"
        >
          <img src={logo} alt="logo" width={80} height={10} />
          <span className="font-poppins text-primary">Munch</span>
          <span className="font-poppins text-secondary">InKenya</span>
        </Link>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex space-x-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/MunchInKenya-fe"
              className="text-xl text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline"
            >
              Home
            </Link>
          </motion.div>

          {!loggedIn ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/MunchInKenya-fe/login"
                className="text-xl text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline"
              >
                Login
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/MunchInKenya-fe/trackOrder"
                className="text-xl text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline"
              >
                Orders
              </Link>
            </motion.div>
          )}

          <div className="relative group">
            <motion.span
              whileHover={{
                scale: 1.1,
                color: "#ff5722",
                textShadow: "0px 0px 8px rgba(255, 87, 34, 0.6)",
              }}
              className="text-xl text-textPrimary hover:text-primary cursor-pointer transition duration-300 ease-in-out hover:underline"
            >
              Contacts
            </motion.span>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="absolute hidden group-hover:block bg-background/70 shadow-lg rounded-lg w-40 z-50"
            >
              <motion.li
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Link
                  to="/MunchInKenya-fe/contactUs"
                  className="block px-4 py-2 text-lg text-black hover:bg-background/80 hover:text-primary transition duration-300 ease-in-out"
                >
                  Contact Us
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Link
                  to="/MunchInKenya-fe/feedbackForm"
                  className="block px-4 py-2 text-lg text-black hover:bg-background/80 hover:text-primary transition duration-300 ease-in-out"
                >
                  Feedback
                </Link>
              </motion.li>
            </motion.ul>
          </div>
          <div className="flex items-center">
          <form className="hidden md:flex relative" onSubmit={handleSubmit}>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary outline-none pl-10"
              type="text"
              placeholder="Search For Restaurant"
              onChange={handleSearch}
              value={search}
            />
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textPrimary" />
            <button className="sr-only" type="submit">
              Search
            </button>
          </form>

          <div className="ml-4 flex items-center space-x-4">
            {!loggedIn ? (
              <Link to="/MunchInKenya-fe/signUp">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary"
                >
                  Signup
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent"
                onClick={logout}
              >
                Log out
              </motion.button>
            )}

            <Link to="/MunchInKenya-fe/cart">
              <motion.img
                src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/shopping_cart.png"
                className="w-10 h-10"
                alt="Cart"
                whileHover={{ scale: 1.1 }}
              />
            </Link>
          </div>
        </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="block md:hidden text-textPrimary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
           <motion.div
           className="md:hidden bg-surface/90 p-4 absolute z-50 top-20 w-full right-0"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ type: "spring", stiffness: 100, damping: 25 }}
         >
           <motion.div className="flex flex-col items-center space-y-4">
             <motion.div
               whileHover={{ scale: 1.05 }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ delay: 0.1, duration: 0.5 }}
             >
               <Link
                 to="/MunchInKenya-fe"
                 className="text-lg text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline flex items-center"
               >
                 <FaHome className="mr-2" /> Home
               </Link>
             </motion.div>
 
             {!loggedIn ? (
               <motion.div
                 whileHover={{ scale: 1.05 }}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ delay: 0.2, duration: 0.5 }}
               >
                 <Link
                   to="/MunchInKenya-fe/login"
                   className="text-lg text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline flex items-center"
                 >
                   <FaSignInAlt className="mr-2" /> Login
                 </Link>
               </motion.div>
             ) : (
               <motion.div
                 whileHover={{ scale: 1.05 }}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ delay: 0.2, duration: 0.5 }}
               >
                 <Link
                   to="/MunchInKenya-fe/trackOrder"
                   className="text-lg text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline flex items-center"
                 >
                   <FaBox className="mr-2" /> Orders
                 </Link>
               </motion.div>
             )}
 
             <motion.div
               whileHover={{ scale: 1.05 }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ delay: 0.3, duration: 0.5 }}
             >
               <Link
                 to="/MunchInKenya-fe/contactUs"
                 className="text-lg text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline flex items-center"
               >
                 <FaPhoneAlt className="mr-2" /> Contact Us
               </Link>
             </motion.div>
 
             <motion.div
               whileHover={{ scale: 1.05 }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ delay: 0.4, duration: 0.5 }}
             >
               <Link
                 to="/MunchInKenya-fe/feedbackForm"
                 className="text-lg text-textPrimary hover:text-primary transition duration-300 ease-in-out hover:underline flex items-center"
               >
                 <FaRegPaperPlane className="mr-2" /> Feedback
               </Link>
               
             </motion.div>
             <form className="relative" onSubmit={handleSubmit}>
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary outline-none pl-10"
                type="text"
                placeholder="Search For Restaurant"
                onChange={handleSearch}
                value={search}
              />
              <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textPrimary" />
            </form>
           </motion.div>
         </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
