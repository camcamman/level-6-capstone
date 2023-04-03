import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

const GroceriesCarousel = ({
  name,
  description,
  details,
  newPrice,
  oldPrice,
  type,
  imgUrl,
  id,
}) => {

  const cart = useContext(CartContext)
  
  return (
    <section className="grocery-product">
      <Link to={`/grocerydetails/${id}`} style={{textDecoration: "none", color: "white"}}>
      <img src={imgUrl} alt={name} />
      </Link>
      <button onClick={()=> cart.addOneToCart(id)}>
        <i className="fa-solid fa-plus"></i> Add
      </button>
      <div className="price-wrapper">
        <p className="product-new-price">Now ${newPrice}</p>
        <p className="product-old-price">${oldPrice}</p>
      </div>
      <p className="product-name">{name}</p>
    </section>
  );
};

export default GroceriesCarousel;