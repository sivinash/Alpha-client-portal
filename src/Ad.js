import React, { useState, useEffect } from "react";

function Ad() {
    const images = [
        'specialoffbaner1.avif',
        'specialoffbaner3.avif',
        'specialoffbaner4.avif',
        'specialoffbaner7.avif',
        'specialoffbaner8.avif',
        'specialoffbaner9.avif'
    ];
    
    const [imagee, setImagee] = useState(images[0]);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setCurrentImage(prevImage => {
                const nextImage = (prevImage + 1) % images.length;
                setImagee(images[nextImage]);
                return nextImage;
            });
        }, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="banner-container">
            <img id="bannerImage" src={`/Ad/${imagee}`} alt="Special Offer" />
        </div>
    );
}

export default Ad;
