import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <Col>
          <h1 className="mt-3 ms-5">
            <strong>Library</strong>
          </h1>

          <div className="d-flex flex-column ms-5 mb-5">
            <Link to="/library/all" className="library-link">
              All
            </Link>
            <Link to="/library/to-read" className="library-link">
              To Read
            </Link>
            <Link to="/library/reading" className="library-link">
              Reading
            </Link>
            <Link to="/library/Finished" className="library-link">
              Finished
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LibraryScreen;
