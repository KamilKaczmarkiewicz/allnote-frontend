import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import "./Footer.css"

const MainFooter = () => {
    return (
        <footer className="footer-container">
          <Container>
            <Row>
              <Col md={4}>
                <h5>Contact Us</h5>
                <p>Email: info@example.com</p>
                <p>Phone: +1 (123) 456-7890</p>
              </Col>
              <Col md={4}>
                <h5>Follow Us</h5>
                <p>Github</p>
              </Col>
            </Row>
          </Container>
          <div className="footer-bottom">
            <Container>
              <p>&copy; 2024 All Note</p>
            </Container>
          </div>
        </footer>
      );
    };

export default MainFooter;
