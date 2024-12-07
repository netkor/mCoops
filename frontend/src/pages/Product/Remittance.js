import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Remittance = () => {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/`);
        const remittanceProduct = response.data.find(p => p.name === "Remittance");
        setProduct(remittanceProduct);

        // Modify the description to prepend base URL to img src attributes
        let description = remittanceProduct.description;
        description = description.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/g, (match, p1) => {
          return match.replace(p1, `${imageUrl}${p1}`);
        });

        // Extract image URLs from the description
        const parser = new DOMParser();
        const doc = parser.parseFromString(description, 'text/html');
        const imageElements = doc.getElementsByTagName('img');
        const imageUrls = Array.from(imageElements).map(img => img.src);
        setImages(imageUrls);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container my-4">
      <h2 className="text-center">Remittance</h2>
      <div className="row mt-4">
        {images.map((src, index) => (
          <div className="col-md-3 mb-4" key={index}>
              <img src={src} className="card-img-top" alt={`Remittance ${index + 1}`} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Remittance;