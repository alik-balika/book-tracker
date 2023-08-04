import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col md={6}>
            <h5>About Us</h5>
            <p>
              Welcome to SITE NAME, your go-to platform for effortlessly
              managing your reading progress and notes. Enhance your reading
              experience with us.
            </p>
          </Col>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
