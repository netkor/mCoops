import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const MobileBankingFeatured = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/`);
        const mobileBankingProduct = response.data.find(p => p.name === "Mobile Banking");
        setProduct(mobileBankingProduct);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the data!");
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No Mobile Banking product found.</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Features of Manakamana Mobile Banking App</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <img
            src={`${imageUrl}${product.image}`}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {/* <h5 className="text-center card-title">{product.name}</h5> */}
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBankingFeatured;