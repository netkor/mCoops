import React from 'react';

const MobileBankingFeatured = () => {
  return (
    <section className="mobile bg-cGray200 py-5">
    <h1 className="text-center mb-4">Mobile Banking</h1>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="img-wrapper">
              <img
                src="https://api.janasachetan.org.np/uploads/sitepages/2024-03-27-09-31-36-mobile banking.jpg"
                alt="Mobile Banking"
                className="img-fluid rounded shadow mx-auto d-block"
                style={{ width: 'auto', height: '640px' }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="mt-3 mb-3">Easy banking from your mobile</h3>
            <p>
              Welcome to all Mobile Banking users. Our members can enjoy online payment facilities from anywhere and anytime including utilities payment, fund transfer, wallet load, deposit-loan payment, alert service and more services using our mobile banking service.
            </p>
            <div className="img-landscape my-4">
              <iframe
                width="100%"
                height="315"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src="https://www.youtube.com/embed/oNmVEXQupsA"
              ></iframe>
            </div>
            <h6>Download Our Mobile App:</h6>
            <div className="d-flex align-items-center gap-3 mt-3">
              <a href="null" target="_blank" rel="noopener noreferrer">
                <img src="/assets/appstore.9ea94700.png" alt="App Store" className="store-badge" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.infodev.mjanasachetan&hl=en&gl=US" target="_blank" rel="noopener noreferrer">
                <img src="/assets/googleplay.8210fe9c.png" alt="Google Play" className="store-badge" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileBankingFeatured;