import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function Footer() {
  // const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  // const settingsUrl = `${baseUrl}/settings`;
  const socialLinksUrl = `${baseUrl}/social-links`;

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

  return (
    <footer className="text-center text-white" style={{ backgroundColor: '#3C923AFF' }}>
      <div className="container">
        {/* Section: Links */}
        <section className="mt-5">
          <div className="row text-center d-flex justify-content-center pt-5">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/introduction" className="text-white">About Us</a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/branches" className="text-white">Branches</a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/deposit" className="text-white">Deposits</a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/loan" className="text-white">Loans</a>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/contact" className="text-white">Contact</a>
              </h6>
            </div>
          </div>
        </section>
        {/* Section: Links */}

        <hr className="my-5" />

        {/* Section: Text */}
        {/* <section className="mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                distinctio earum repellat quaerat voluptatibus placeat nam,
                commodi optio pariatur est quia magnam eum harum corrupti
                dicta, aliquam sequi voluptate quas.
              </p>
            </div>
          </div>
        </section> */}
        {/* Section: Text */}

        {/* Section: Social */}
        <section className="text-center mb-5">
          {socialLinks.map(link => (
            <a key={link.id} href={link.url} className="text-white me-4">
              <img src={`${imageUrl}${link.icon}`} alt={link.platform} width="32" height="32" />
            </a>
          ))}
        </section>
        {/* Section: Social */}
      </div>

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className="text-white" href="https://manakamanasaccos.coop.np">
          Manakamana Saving & Credit Co-operative Ltd.
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
}

export default Footer;