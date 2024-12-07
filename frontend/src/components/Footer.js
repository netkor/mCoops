import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function Footer() {
  // const [settings, setSettings] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  // const settingsUrl = `${baseUrl}/settings`;
  const socialLinksUrl = `${baseUrl}/social-links`;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11 (0 = January, 11 = December)
  const currentDay = currentDate.getDate();

  const isWinterSeason = (currentMonth === 10 && currentDay >= 1) || // November
                         (currentMonth === 11) || // December
                         (currentMonth === 0) || // January
                         (currentMonth === 1 && currentDay <= 31);

  useEffect(() => {
    // axios.get(settingsUrl)
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       setSettings(response.data[0]);
    //     }
    //   })
    //   .catch(error => {
    //     console.error("There was an error fetching the settings!", error);
    //   });

    axios.get(socialLinksUrl)
      .then(response => {
        setSocialLinks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the social links!", error);
      });
  }, [socialLinksUrl]);
  const usefulLinks = socialLinks.filter(link => link.is_useful_link);
  const otherLinks = socialLinks.filter(link => link.is_social_link);

  return (
      <footer style={{ backgroundColor: '#0A5A22FF' }}>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-3 col-md-12 mb-4">
              <h5 className="mb-3" style={{ letterSpacing: '2px', color: '#F8F9F5FF' }}>Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-1">
                  <a href="/introduction" style={{ color: '#F5F4F4FF' }}>About Us</a>
                </li>
                <li className="mb-1">
                  <a href="/branches" style={{ color: '#F7EEEEFF' }}>Branches</a>
                </li>
                <li className="mb-1">
                  <a href="/deposit" style={{ color: '#F6F1F1FF' }}>Deposits</a>
                </li>
                <li className="mb-1">
                  <a href="/loan" style={{ color: '#F5F2F2FF' }}>Loans</a>
                </li>
                <li>
                  <a href="/contact" style={{ color: '#F7F4F4FF' }}>Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3" style={{ letterSpacing: '2px', color: '#F3F5EFFF' }}>Useful Links</h5>
              <ul className="list-unstyled mb-0">
                {usefulLinks.map(link => (
                  <li className="mb-1" key={link.id}>
                    <a href={link.url} style={{ color: '#F8F5F5FF' }}>
                      {/* <img src={`${imageUrl}${link.icon}`} alt={link.platform} width="24" height="24" className="me-2" /> */}
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3" style={{ letterSpacing: '2px', color: '#F6F7F5FF' }}>Social Links</h5>
              <ul className="list-unstyled mb-0">
                {otherLinks.map(link => (
                  <li className="mb-1" key={link.id}>
                    <a href={link.url} style={{ color: '#FBF5F5FF' }}>
                      <img src={`${imageUrl}${link.icon}`} alt={link.platform} width="24" height="24" className="me-2" />
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex flex-column" style={{ color: '#FBF5F5FF' }}>
                <p className="mb-0 fw-bold" style={{ fontSize: "20px" }}>
                  Opening Hours
                </p>
                {isWinterSeason ? (
                  <span className="fw-bold d-block" style={{ fontSize: "15px" }}>
                    Sun: 9am - 4pm , 
                    Mon: 9am - 12pm <br />
                    Tue: 9am - 4pm ,
                    Wed: 9am - 4pm <br />
                    Thu: 9am - 4pm ,
                    Fri: 9am - 4pm <br />
                    Sat: 9am - 4pm
                  </span>
                ) : (
                  <span className="d-block" style={{ fontSize: "15px" }}>
                    Tue-Sun: 9am - 5pm <br /> Mon: 9am - 12pm
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: '#FBF5F5FF' }}>
          © {new Date().getFullYear()} Copyright:
          <a className="text-white" href="https://manakamanasaccos.coop.np/">Manakamanasaccos.coop.np</a>
        </div>
      </footer>
  );
}

export default Footer;