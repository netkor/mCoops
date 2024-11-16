import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const Contact = () => {
  const [settings, setSettings] = useState({});
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        if (response.data.length > 0) {
          setSettings(response.data[0]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
  }, [settingsUrl]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>Contact Information</h5>
          <p><strong>Address:</strong> {settings.address || "Default Address"}</p>
          <p><strong>Phone:</strong> {settings.phone || "Default Phone"}</p>
          <p><strong>Email:</strong> {settings.email || "Default Email"}</p>
          {settings.map_url && (
            <div className="embed-responsive embed-responsive-16by9 mb-4">
              <iframe
                className="embed-responsive-item"
                src={settings.map_url}
                allowFullScreen
                title="Google Maps"
              ></iframe>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h5>Contact Form</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;