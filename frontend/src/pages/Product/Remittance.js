import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Remittance = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const collectionsResponse = await axios.get(`${baseUrl}/collections`);
        const remittanceCollection = collectionsResponse.data.find(
          collection => collection.name.toLowerCase() === 'remittance'.toLowerCase()
        );

        if (remittanceCollection) {
          const photosResponse = await axios.get(`${baseUrl}/photos`);
          // Filter photos where slug matches 'remittance'
          const remittanceImages = photosResponse.data.filter(photo => 
            photo.slug.toLowerCase() === 'remittance'
          );
          
          console.log('Filtered images:', remittanceImages);
          setImages(remittanceImages);
        } else {
          setError('Remittance collection not found');
        }
      } catch (error) {
        console.error('API Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!images.length) return <div>No images found in remittance collection</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Remittance</h2>
      <div className="row">
        {images.map((image, index) => (
          <div className="mb-4 col-md-4" key={image.id || index}>
            <div className="text-center shadow card h-100"                     style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}
            >
              <div className="card-body">
                <img
                  src={`${imageUrl}${image.large_image}`}
                  alt={image.title}
                  className="rounded shadow img-fluid"
                />
                <h5 className="mt-3 card-title">{image.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remittance;