import { useState, useEffect} from 'react'
import "../styles/homeLayout.css"
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios'

// Images
import main from "../images/main.jpg"
import hero from "../images/hero.jpg"
import trees from "../images/trees.jpg"

// Components
import GroceriesCarousel from '../components/GroceriesCarousel'
import KitchenCarousel from '../components/KitchenCarousel'
import EssentialsCarousel from '../components/EssentialsCarousel'

//hooks
import useEssentials from '../hooks/useEssentials';
import useGroceries from '../hooks/useGroceries';
import useKitchen from '../hooks/useKitchen';

const Home = () => {

  const {essentials, isLoaded} = useEssentials()
  const {groceries, isGroceryLoaded} = useGroceries()
  const {kitchen, isKitchenLoaded} = useKitchen()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet1: {
      breakpoint: { max: 1024, min: 960 },
      items: 4
    },
    tablet2: {
      breakpoint: { max: 960, min: 660 },
      items: 3
    },
    tablet3: {
      breakpoint: { max: 660, min: 460 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 460, min: 0 },
      items: 1
    }
  };

  if(!isLoaded) return <h2>Loading...</h2>
  if(!isGroceryLoaded) return <h2>Loading...</h2>
  if(!isKitchenLoaded) return <h2>Loading...</h2>

  return (
    <div className='home-container'>
      <div className='image-wrapper'>
        <img className='main-image' src={main}/>
        <div className='sales-details'>
          <h1>Cozy Savings, Incoming</h1>
          <p>Grab a blanket and save on Animal Welfare Certified ground beef as well as pantry favorites from Rao's. Plus, save an extra 10% on sale items with Sunrise Plus.</p>
          <Link to={"/sales"}>
          <button>See all sales</button>
          </Link>
          <p>Valid 2/22 - 2/28/23. U.S. only. Restrictions apply.</p>
        </div>
      </div>
      <div className='carousel-container'>
        <div className='carousel-header-wrapper'>
          <h3 className='carousel-header'>Discover Our Latest & Greatest</h3>
          <p className='carousel-description'>Check out what's hot right now, including limited-time-only finds and seasonal favorites.</p>
        </div>
        <div className="carousel-wrapper">
          <h3>Groceris</h3>
          <Carousel 
            responsive={responsive}   
            infinite={true} 
          >
            {groceries.map((grocery) => {
          return (
            <GroceriesCarousel
              key={grocery._id}
              name={grocery.name}
              description={grocery.description}
              details={grocery.details}
              newPrice={grocery.new_price}
              oldPrice={grocery.old_price}
              type={grocery.type}
              imgUrl={grocery.imgUrl}
              id={grocery._id}
            />
          );
        })}
          </Carousel>
          <h3>Kitchen</h3>
          <Carousel 
            responsive={responsive}   
            infinite={true} 
          >
            {kitchen.map((kitchen) => {
          return (
            <KitchenCarousel
              key={kitchen._id}
              name={kitchen.name}
              description={kitchen.description}
              details={kitchen.details}
              newPrice={kitchen.new_price}
              oldPrice={kitchen.old_price}
              type={kitchen.type}
              imgUrl={kitchen.imgUrl}
              id={kitchen._id}
            />
          );
        })}
          </Carousel>
          <h3>Essentials</h3>
          <Carousel 
            responsive={responsive}   
            infinite={true} 
          >
            {essentials.map((essential) => {
          return (
            <EssentialsCarousel
              key={essential._id}
              name={essential.name}
              description={essential.description}
              details={essential.details}
              newPrice={essential.new_price}
              oldPrice={essential.old_price}
              type={essential.type}
              imgUrl={essential.imgUrl}
              id={essential._id}
            />
          );
        })}
          </Carousel>
        </div> 
      </div>
      <div className='image-wrapper'>
        <img className='main-image' src={hero}/>
        <div className='sales-details'>
          <h1>Cold-weather meals with the comfy feels.</h1>
          <p>Brrrrravo to our culinary team for these cozy takes on breakfast, lunch and dinner, including seasonal produce and blanket-worthy recipes. (Snacks and desserts, too.) That's good eating by the fire.</p>
          <Link to={"/recipes"}>
          <button>Get all meals</button>
          </Link>
        </div>
      </div>
      <div className='our-purpose'>
        <img src={trees}/>
        <h3>Our purpose is to nourish people and the planet.</h3>
        </div>      
    </div>
  )
}

export default Home