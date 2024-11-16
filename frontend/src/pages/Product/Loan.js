import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Loan = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productDetailsUrl = `${baseUrl}/product-details`;
  const productsUrl = `${baseUrl}/products`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productDetailsResponse, productResponse] = await Promise.all([
          axios.get(productDetailsUrl),
          axios.get(productsUrl),
        ]);
        setProductDetails(productDetailsResponse.data);
        setProducts(productResponse.data);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the data!");
        setLoading(false);
      }
    };

    fetchData();
  }, [productDetailsUrl, productsUrl]);

  const filteredProducts = products.filter((product) => product.name === "कर्जा");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mb-2 "  style={{  backgroundImage: 'url(https://wallpapercave.com/wp/wp3589868.jpg)' }}>
      {filteredProducts.map((product, index) => (
        <div key={index}>
          <h3 className="my-4 text-center">{product.name}</h3>
          <div className="row justify-content-center">
            {productDetails
              .filter((detail) => detail.product === product.id)
              .map((detail, index) => (
                <div className="col-md-3 mb-2" key={index}>
                  <div className="card border-0 shadow-sm rounded"
                   onClick={() => handleProductClick(detail.id)}>
                    <div className="card-header bg-white border-0 text-center py-3">
                      <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">
                          <img
                            src={`${imageUrl}${detail.banner}`}
                            alt={detail.name}
                            style={{ height: "150px" }}
                          />
                        </div>
                        <h5 className="text-success fw-bold mb-1">
                          {detail.name}
                        </h5>
                      </div>
                    </div>
                    <div className="card-body text-center">
                      <h6 className="fw-bold text-dark">
                        Minimum Deposit: {detail.minimum_deposit}
                      </h6>
                      <p className="text-muted" style={{ textAlign: "justify", fontSize: "14px" }}>
                        {detail.description.length > 50 ? `${detail.description.substring(0, 50)}...` : detail.description}
                      </p>
                      <a href="/test" className="text-success text-decoration-none">
                        थप पढ्नुहोस् <i className="bi bi-arrow-right"></i>
                      </a>
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

export default Loan;
