import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
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

    const fetchOtherProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product-details`);
        setOtherProducts(response.data.filter(product => product.id !== parseInt(id)));
      } catch (error) {
        console.error('There was an error fetching the other products!', error);
      }
    };

    fetchProductDetail();
    fetchOtherProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          {productDetail && (
            <div className="card h-100 text-center shadow">
              <div className="mt-3">
                <img
                  src={`${imageUrl}${productDetail.banner}`}
                  className="img-fluid"
                  alt={productDetail.name}
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title"><strong>{productDetail.name}</strong></h5>
                <h6 className="card-subtitle mb-2 text-muted justify " >{productDetail.description}</h6>
                <p className="card-text justify">{productDetail.withdrawal_policy}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Other Products</h4>
          <ul className="list-group">
            {otherProducts.map((product) => (
              <li className="list-group-item" key={product.id}>
                <div className="d-flex align-items-center">
                  <img
                    src={`${imageUrl}${product.banner}`}
                    alt={product.name}
                    className="img-fluid me-3"
                    style={{ width: '75px', height: '50px', objectFit: 'fit' }}
                  />
                  <div>
                    <h6 className="mb-0">{product.name}</h6>
                    <small className="text-muted">{product.description.substring(0, 50)}...</small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;