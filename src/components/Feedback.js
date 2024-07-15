import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
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
      const response = await fetch('https://muchinkenya-be.onrender.com/feedback', {
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
      console.log('Feedback submitted: ', data);

      setFormData({
        name: '',
        email: '',
        feedback: ''
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', height: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

    <div className="feedback-form" style={{width:"100%"}}>
      <h2 style={{textAlign: 'center'}}>Feedback Form</h2>
      <form onSubmit={handleSubmit} style={{width: '500px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9',textAlign:"center"}}>
        <div style={{marginBottom: '20px'}}>
          <label htmlFor="name" style={{display: 'block', marginBottom: '5px'}}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
        </div>
        <div style={{marginBottom: '20px'}}>
          <label htmlFor="email" style={{display: 'block', marginBottom: '5px'}}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
        </div>
        <div style={{marginBottom: '20px'}}>
          <label htmlFor="feedback" style={{display: 'block', marginBottom: '5px'}}>Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px'}}
          />
        </div>
        <button type="submit" style={{padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer'}}>Submit</button>
      </form>
    </div>
    </div>
  );
}


export default FeedbackForm;
