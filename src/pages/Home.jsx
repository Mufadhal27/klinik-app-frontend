import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ServicePreview from '../components/ServicePreview';
import WhyUs from '../components/WhyUs';
import Testimoni from '../components/Testimoni';
import BookingCTA from '../components/BookingCTA';
import Contact from '../components/Contact';

function Home () {
    return (
        <>
        <Hero />
        <About />
        <ServicePreview />
        <WhyUs />
        <Testimoni />
        <BookingCTA />
        <Contact />
        </>
    );
}

export default Home;