import React from 'react';
import { Button } from 'react-bootstrap';
import homePageHeroSectionImage from '../../assets/HomePageHeroSectionImage.jpg'
import './HomePage.css'


const HeroSection = () => {
  return (
    <div className="hero-section-container  bg-light-blueish">
      <div className="row">
        <div className="col-md-6">
          <div className="hero-text">
            <h1>Your Header</h1>
            <p>
              Your short text goes here. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
            <p>
              More details in another paragraph. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <Button variant="primary">Call to Action</Button>
          </div>
        </div>

        <div className="col-md-6 justify-content-center">
          <div className="text-center">
            <img
                src={homePageHeroSectionImage}
                alt="hero"
                className="img-fluid rounded-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
