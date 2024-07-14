import React, { useState } from 'react';
import './contact.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to send the form data to the backend
      const response = await fetch('https://muchinkenya-be.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form Data Submitted: ', data);

      // Handle success response (e.g., show a success message, reset form)
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div style={{backgroundImage:"https://unsplash.com/photos/a-wooden-cutting-board-topped-with-blueberries-and-grapes-Z8GEw7adf5U",height:"86vh"}}>
    <div className="contact-us-form-container">
      <h2 style={{textAlign:'center'}}>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
   </div>
  );
}

export default ContactUs;
