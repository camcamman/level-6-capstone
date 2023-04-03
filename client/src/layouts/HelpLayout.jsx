import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import "../styles/helpLayout.css"
import berries from "../images/berries.png"
import peaches from "../images/peaches.png"

function HelpLayout() {
  return (
    <div className="help-layout">
        <header>
        <h1>We're here to help.</h1>
        <img src={berries}/>
        </header>
        <div className='main'>
            <div className="help-section">
                <div className="meals-left">
                    <h1>Meals & Catering</h1>
                </div>
                <div className='meals-right'>
                    <p>Get the scoop on changing or picking up orders, special requests, and nutritional information for items on our menu.</p>
                    <h2>Popular question</h2>
                    <a href="#">Can I order a cake online? How do I order a custom cake?</a>
                    <h4>See all questions <i className="fa-solid fa-arrow-right"></i></h4>
                </div>
                <div className='plus-left'>
                    <h1>Sunrise + at Sunrise Foods Market</h1>
                </div>
                <div className="plus-right">
                    <p>Sunrise Plus Members get exclusive savings at our stores and grocery delivery in select cities.</p>
                    <h2>Popular question</h2>
                    <a href="#">How can I use my Plus membership at Sunrise Foods Market?</a>
                    <h4>See all questions <i className="fa-solid fa-arrow-right"></i></h4>
                </div>
                <div className="giftcard-left">
                    <h1>Git Cards</h1>
                </div>
                <div className="giftcard-right">
                    <p>Placing orders, redeeming and checking balances.</p>
                    <h2>Popular question</h2>
                    <a href="#">Can I use an Sunrise Plus gift card at Sunrise Foods Market stores?</a>
                    <h4>See all questions <i className="fa-solid fa-arrow-right"></i></h4>
                </div>
            <img src={peaches} alt="" />
            </div>
        </div>
        <nav className='help-nav'>
            <h3>Let's Connect</h3>
            <p>You have questions, we have answers.</p>
            <NavLink to="faq">View the FAQ</NavLink>
            <NavLink to="contact">Contact Us</NavLink>
        </nav>
        <Outlet />
    </div>
  )
}

export default HelpLayout