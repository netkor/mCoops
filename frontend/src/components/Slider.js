import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function Slider() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/sliders/`)
      .then(response => {
        setSliders(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the sliders!", error);
      });
  }, []);

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative' }}>
      <div className="carousel-indicators">
        {sliders.map((slider, index) => (
          <button
            key={slider.id}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {sliders.map((slider, index) => (
          <div key={slider.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={`${imageUrl}${slider.image}`}
              className="d-block w-100"
              style={{ height: '500px', objectFit: 'cover' }}
              alt={slider.title}
            />
            <div className="p-3 bg-opacity-50 rounded carousel-caption d-none d-md-block bg-dark">
              <h5 className="text-white">{slider.title}</h5>
              <p className="text-white">{slider.description}</p>
              {slider.link && <a href={slider.link} className="rounded btn btn-primary">Learn More</a>}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;