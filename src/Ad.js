import React, { useState, useEffect, useMemo } from "react";

function Ad() {
    const images = useMemo(() => [
        'specialoffbaner1.avif',
        'specialoffbaner3.avif',
        'specialoffbaner4.avif',
        'specialoffbaner7.avif',
        'specialoffbaner8.avif',
        'specialoffbaner9.avif'
    ], []);

    const [imagee, setImagee] = useState(images[0]);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            setImagee(images[currentIndex]);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);


    return (
        <div className="banner-container">
            <img id="bannerImage" src={`/Ad/${imagee}`} alt="Special Offer" />
        </div>
    );
}

export default Ad;

