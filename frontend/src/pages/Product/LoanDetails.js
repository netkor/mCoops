import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [interestRates, setInterestRates] = useState(location.state?.interestRates || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productDetailResponse, otherProductsResponse, interestRatesResponse] = await Promise.all([
          axios.get(`${baseUrl}/product-details/${id}`),
          axios.get(`${baseUrl}/product-details`),
          axios.get(`${baseUrl}/interest-rates/${id}/`)
        ]);

        setProductDetail(productDetailResponse.data);
        setOtherProducts(otherProductsResponse.data.filter(productdepo => productdepo.id !== parseInt(id) && productdepo.product === 1));
        setInterestRates(interestRatesResponse.data.filter(rate => rate.end_date === null));
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setError('There was an error fetching the data!');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleProductClick = async (productId) => {
    try {
      const [productDetailResponse, otherProductsResponse, interestRatesResponse] = await Promise.all([
        axios.get(`${baseUrl}/product-details/${productId}`),
        axios.get(`${baseUrl}/product-details`),
        axios.get(`${baseUrl}/interest-rates/${productId}/`)
      ]);

      setProductDetail(productDetailResponse.data);
      setOtherProducts(otherProductsResponse.data.filter(productdepo => productdepo.id !== parseInt(productId) && productdepo.product === 1));
      setInterestRates(interestRatesResponse.data.filter(rate => rate.end_date === null));
      navigate(`/productLoan/${productId}`, { state: { interestRates } });
    } catch (error) {
      console.error('There was an error fetching the interest rates!', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4" >
      <div className="row">
        <div className="col-md-8">
          {productDetail && (
            <div className="shadow card h-100" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
              <div className="mt-3">
                <img
                  src={`${imageUrl}${productDetail.banner}`}
                  className="mx-auto img-fluid d-block"
                  alt={productDetail.name}
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="text-center card-title"><strong>{productDetail.name}</strong></h5>
                  {interestRates.length > 0 && (
                  <>
                    <h5 className="mt-4">Interest Rates</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Effective Date</th>
                          <th>Interest Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interestRates.map((rate, index) => (
                          <tr key={index}>
                            <td>{rate.effective_date}</td>
                            <td>{rate.interest_rate}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
                <p className="card-text justify" dangerouslySetInnerHTML={{ __html: productDetail.description }}></p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Other Products</h4>
          <ul className="list-group" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
            {otherProducts.map((products) => (
              <li className="list-group-item" key={products.id} onClick={() => handleProductClick(products.id)}>
                <div className="d-flex align-items-center" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
                  <img
                    src={`${imageUrl}${products.banner}`}
                    alt={products.name}
                    className="img-fluid me-3"
                    style={{ width: '75px', height: '50px', objectFit: 'fit'  }}
                  />
                  <div>
                    <h6 className="mb-0">{products.name}</h6>
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