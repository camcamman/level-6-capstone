import React from 'react'
import "../styles/contact.css"

function Contact() {
  return (
    <div className="contact">
      <h3 className="heading">Get in touch</h3>
      <form>
        <label>Your Name</label>
        <input
          type="text"
          id="name"
          className="name"
          placeholder="Your name....."
        />
        <label>Email</label>
        <input
          className="email"
          type="email"
          id="email"
          name="email"
          placeholder="Your email..."
        />
        <label>Message</label>
        <textarea
          className="message"
          id="subject"
          name="subject"
          placeholder="Write your message....."
        ></textarea>
        <center>
          <input className="submit" type="submit" value="Submit" />
        </center>
      </form>
    </div>
  );
}

export default Contact