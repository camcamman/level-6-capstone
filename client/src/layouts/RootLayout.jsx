import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CartDropDown from "../components/CartDropDown";
import CartItem from "../components/CartItem"
import { CartContext } from "../CartContext";
import { userContext } from "../authContext";
import "../styles/rootLayout.css";
import axios from "axios";

const RootLayout = () => {
  const cart = useContext(CartContext);
  const { logout } = useContext(userContext);

  const [productCount, setProductCount] = useState(cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  ))

  useEffect(() => {
    axios.get("cart")
    .then(res => {
      res.data.map(item => {
        if (JSON.parse(localStorage.getItem('user'))._id === item.user) {
          setProductCount(prevCount => prevCount + 1)
        }
      })
    })
    .catch(err => console.error(err))
  }, [])

  const [click, setClick] = useState(false);
  const [hidden, setHidden] = useState(true);

  const toggleHidden = () => setHidden(!hidden);

  const handleClick = () => setClick((prevClick) => !prevClick);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            Sunrise Food <span>MARKET</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/groceries"
                className="nav-links"
                onClick={handleClick}
              >
                Groceries
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/recipes"
                className="nav-links"
                onClick={handleClick}
              >
                Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/kitchen"
                className="nav-links"
                onClick={handleClick}
              >
                Kitchen
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/essentials"
                className="nav-links"
                onClick={handleClick}
              >
                Essentials
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/help" className="nav-links" onClick={handleClick}>
                Help
              </NavLink>
            </li>
          </ul>

          {localStorage.getItem("token") ? 
            <div className="nav-item-cart">
              <i className="fa-solid fa-cart-shopping" onClick={() => toggleHidden()}>
              </i>
              <p className="product-count">{productCount}</p>
            </div>
            :
            <div></div>
          }

          {hidden  ? null : <CartDropDown />}

          <div>
            <div>
              {localStorage.getItem("token") ? (
                <div className="logout-btn" onClick={handleLogout}>
                  Logout
                </div>
              ) : (
                <NavLink to="/auth" className="logout-btn">
                  Sign in
                </NavLink>
              )}
            </div>
          </div>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default RootLayout;
