import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const baseUrl = process.env.REACT_APP_API_URL;

function Footer() {
  const [settings, setSettings] = useState(null);
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
  }, [settingsUrl]); // Include settingsUrl in the dependency array

  return (
    <footer className="pt-5 pb-4 text-light" style={{ backgroundColor: '#039103FF', }}>
      <div className="container">
        {settings && (
          <div className="row">
            {/* Contact Information */}
            <div className="col-md-4">
              <h5>Contact Information</h5>
              <ul className="list-unstyled">
                <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {settings.address}</li>
                <li><FontAwesomeIcon icon={faPhone} /> Phone: {settings.phone}</li>
                <li><FontAwesomeIcon icon={faEnvelope} /> Email: {settings.email}</li>
                <li><FontAwesomeIcon icon={faClock} /> Hours: Mon-Fri 9am-5pm</li>
              </ul>
            </div>
            {/* Quick Links */}
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/about" className="text-light">About Us</a></li>
                <li><a href="/privacy-policy" className="text-light">Privacy Policy</a></li>
                <li><a href="/terms-of-use" className="text-light">Terms of Use</a></li>
              </ul>
            </div>
            {/* Newsletter Signup */}
            <div className="col-md-4">
              <h5>Newsletter Signup</h5>
              <form>
                <div className="mb-3 input-group">
                  <input type="email" className="form-control" placeholder="Your email" aria-label="Your email" aria-describedby="button-addon2" />
                  <button className="btn btn-primary" type="button" id="button-addon2">Subscribe</button>
                </div>
              </form>
              {/* Social Media Links */}
              <h5>Follow Us</h5>
              <a href="https://www.facebook.com" className="text-light me-3"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              <a href="https://www.linkedin.com" className="text-light"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
            </div>
          </div>
        )}
        {/* Language Switcher (if applicable) */}
        <div className="mt-4 row">
          <div className="text-center col">
            <button className="btn btn-secondary">Switch Language</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;