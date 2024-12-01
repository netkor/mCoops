import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/contact-messages/`, formData);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your message has been sent successfully!',
        });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error sending your message. Please try again later.',
      });
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-5 text-center">Contact Us</h2>
      <div className="row">
        <div className="mb-4 col-md-6">
          <div className="shadow-sm card">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <p className="card-text"><strong>Address:</strong> {settings.address || "Default Address"}</p>
              <p className="card-text">
                <strong>Phone:</strong> 
                <a href={`tel:${settings.phone || "Default Phone"}`} className="text-decoration-none">
                  {settings.phone || "Default Phone"}
                </a><> | </>
                <a href={`tel:${settings.phone1 || "Default Phone"}`} className="text-decoration-none">
                  {settings.phone1 || "Default Phone"}
                </a><> | </>
                <a href={`tel:${settings.landline || "Default Phone"}`} className="text-decoration-none">
                  {settings.landline || "Default Phone"}
                </a><> | </>
                <a href={`tel:${settings.landline2 || "Default Phone"}`} className="text-decoration-none">
                  {settings.landline2 || ""}
                </a>
              </p>
              <p className="card-text">
                <strong>Email:</strong> 
                <a href={`mailto:${settings.email || "Default Email"}`} className="text-decoration-none">
                  {settings.email || "Default Email"}
                </a>
              </p>
              <div className="mb-4 embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.829645040161!2d87.55893087574904!3d26.660466370884617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5897b4ce24dd1%3A0x4d56acaf83a9e033!2z4KSu4KSo4KSV4KS-4KSu4KSo4KS-IOCkrOCkmuCkpCDgpKTgpKXgpL4g4KSL4KSjIOCkuOCkueCkleCkvuCksOClgCDgpLjgpILgpLjgpY3gpKXgpL4g4KSy4KS_IOCkquCkpeCksOClgA!5e1!3m2!1sen!2snp!4v1732873039036!5m2!1sen!2snp"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="shadow-sm card">
            <div className="card-body">
              <h5 className="card-title">Contact Form</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;