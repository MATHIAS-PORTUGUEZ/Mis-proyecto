import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageCarousel.css';

// Carousel images (use the images you added to public/images/carousel)
const images = [
  { url: '/images/carousel/AL-FRESCO-BLOG-1.jpg', title: 'Mariscos y entradas' },
  { url: '/images/carousel/G7Z6USMWTJGKJDPCYRPXJVV7AE.avif', title: 'Interior y ambiente' },
  { url: '/images/carousel/el-equipo-alfresco-siempre.jpg', title: 'Nuestro equipo' }
];

export function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image.url} alt={image.title} />
            <div className="slide-overlay">
              <h3>{image.title}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;