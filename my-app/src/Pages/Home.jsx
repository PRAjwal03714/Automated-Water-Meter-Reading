import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import "./Home.css"; 
import image from './WhatsApp Image 2024-05-28 at 21.33.43_d6705105.jpg'

function PhotoGallery() {
  return (
    <div className="photo-gallery">
      <Container fluid className="p-0">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://cms.bwssb.gov.in/assets/images/2.jpg" // Replace with actual high-res image path
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={image} // Replace with actual high-res image path
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://th.bing.com/th/id/OIP.KyWO-QWizB0N6MNgXjl92wHaEo?w=231&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" // Replace with actual high-res image path
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}

export default PhotoGallery;
