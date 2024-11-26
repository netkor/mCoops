import React from 'react';
import Slider from '../components/Slider'; // Adjust the path as necessary
import AboutInHome from '../components/AboutInHome'; // Adjust the path as necessary
import ServicesInHome from '../components/ServicesInHome';
import NoticesInHome from '../components/NoticesInHome';
import Message from '../components/Message';
import MobileBankingFeatured from '../components/MobileBankingFeatured';
import Profile from '../components/Profile';
import MarqueeNotice from '../components/MarqueeNotice';

function Home() {
  return (
    <div>
      <Slider />
      <MarqueeNotice />
      <Message />
      <ServicesInHome />
      <MobileBankingFeatured />
      <AboutInHome />
      <Profile />
      <ServicesInHome />
      <NoticesInHome />
    </div>
  );
}

export default Home;