import { Col, Row, Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const LibraryScreen = () => {
  return (
    <Container fluid>
      <Row>
        <Col
          xs="auto"
          className="d-none d-lg-block text-bg-secondary"
          style={{
            width: "250px",
            height: "100vh",
          }}
        >
          <Sidebar />
        </Col>
        <Col
          style={{
            border: "5px solid green",
          }}
        >
          <h1>test</h1>
          <h2>Test 2</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default LibraryScreen;
