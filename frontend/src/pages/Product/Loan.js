import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Deposit = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [interest, setInterest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productDetailsUrl = `${baseUrl}/product-details`;
  const productsUrl = `${baseUrl}/products`;
  const interestUrl = `${baseUrl}/interest-rates`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productDetailsResponse, productResponse, interestRatesResponse] = await Promise.all([
          axios.get(productDetailsUrl),
          axios.get(productsUrl),
          axios.get(interestUrl),
        ]);
        setProductDetails(productDetailsResponse.data);
        setProducts(productResponse.data);
        setInterest(interestRatesResponse.data);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the data!");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [productDetailsUrl, productsUrl, interestUrl]);

  const getInterestRatesForProduct = (productId) => {
    return interest.filter(rate => rate.product_type === productId && rate.end_date === null);
  };

  const filteredProducts = products.filter((product) => product.name === "कर्जा");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleProductClick = (id, interestRates) => {
    navigate(`/product/${id}`, { state: { interestRates } });
  };

  return (
    <div className="container my-4">
      {filteredProducts.map((product, index) => (
        <div key={index}>
          <h3 className="my-4 text-center">{product.name}</h3>
          <div className="row justify-content-center">
            {productDetails
              .filter((detail) => detail.product === product.id)
              .map((detail, index) => (
                <div className="mb-2 col-md-3" key={index}>
                  <div className="border-0 shadow-sm card"
                    onClick={() => handleProductClick(detail.id, getInterestRatesForProduct(detail.id))}
                    style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}
>
                    <div className="py-3 text-center bg-white border-0 card-header">
                      <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">
                          <img
                            src={`${imageUrl}${detail.banner}`}
                            alt={detail.name}
                            style={{ height: "150px" }}
                          />
                        </div>
                        <h5 className="mb-1 text-success fw-bold">
                          {detail.name}
                        </h5>
                      </div>
                    </div>
                    <div className="text-center card-body">
                      <h6 className="fw-bold text-dark">
                        Minimum Deposit: {detail.minimum_deposit}
                      </h6>
                      <h6 className="fw-bold text-dark">
                        Interest Rate: {getInterestRatesForProduct(detail.id).map(rate => rate.interest_rate).join(', ')}%
                      </h6>
                      <button onClick={() => handleProductClick(product.id)} className="p-0 btn btn-link text-success text-decoration-none">
                        थप पढ्नुहोस् <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deposit;