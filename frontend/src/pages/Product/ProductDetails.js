import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product-details/${id}`);
        setProductDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the product details!', error);
        setError('There was an error fetching the product details!');
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      {productDetail && (
        <div className="card h-100 text-center shadow">
          <div className="mt-3">
            <img
              src={`${imageUrl}${productDetail.banner}`}
              className="rounded-circle shadow"
              alt={productDetail.name}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title"><strong>{productDetail.name}</strong></h5>
            <h6 className="card-subtitle mb-2 text-muted">{productDetail.description}</h6>
            <p className="card-text">{productDetail.withdrawal_policy}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;