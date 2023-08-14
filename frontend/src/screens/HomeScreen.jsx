import { useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBook, FaPen, FaSearch } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "../components/Footer";

const HomeScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/library");
    }
  }, [navigate, userInfo]);

  // Sample data for featured books (Replace this with real data from your backend)
  const featuredBooks = [
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      description:
        "Join Harry Potter as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry. Follow him on an epic adventure to uncover the mystery of the Sorcerer's Stone.",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "Set in the American South during the 1930s, this classic novel explores themes of racial injustice and moral growth through the eyes of young Scout Finch.",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "Immerse yourself in the dazzling and decadent world of 1920s America, where Jay Gatsby's lavish parties mask a story of unrequited love and obsession.",
    },
  ];

  return (
    <div>
      <div style={{ backgroundColor: "#f1f1f1" }}>
        <Container>
          <Row className="text-center text-md-start">
            <Col md={6}>
              <h1 style={{ paddingTop: 100 }}>Welcome to BookNest</h1>
              <p>
                Keep track of your favorite books and notes. Never lose your
                reading progress again!
              </p>
              <LinkContainer to="/register">
                <Button variant="dark" className="rounded-pill">
                  Get Started
                </Button>
              </LinkContainer>
            </Col>
            <Col md={6}>
              <img src="/logo.png" alt="logo" />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container
          style={{
            paddingTop: "3rem",
            marginTop: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div style={{ marginBottom: "2rem" }} className="move-right">
            <div className="d-flex align-items-center">
              <FaBook style={{ fontSize: "2rem", marginRight: "1rem" }} />
              <h5 style={{ fontWeight: "bold" }}>
                Track Your reading progress for each book
              </h5>
            </div>
            <p style={{ marginLeft: "4rem" }}>Never lose your place again</p>
          </div>
          <div
            style={{ marginBottom: "2rem", textAlign: "right" }}
            className="move-left"
          >
            <div className="d-flex align-items-center justify-content-end">
              <h5 style={{ fontWeight: "bold" }}>
                Add and organize your notes for better learning
              </h5>
              <FaPen style={{ fontSize: "2rem", marginLeft: "1rem" }} />
            </div>
            <p style={{ marginRight: "4rem" }}>
              Keep your thoughts organized as you read
            </p>
          </div>
          <div style={{ marginBottom: "2rem" }} className="move-right">
            <div className="d-flex align-items-center">
              <FaSearch style={{ fontSize: "2rem", marginRight: "1rem" }} />
              <h5 style={{ fontWeight: "bold" }}>
                Explore a vast collection of books
              </h5>
            </div>
            <p style={{ marginLeft: "4rem" }}>Discover new titles and genres</p>
          </div>
          {/* Potentially add categories later */}
          {/* <li>Personalize your book list with custom categories</li> */}
        </Container>
      </div>
      <div style={{ backgroundColor: "#f1f1f1" }}>
        <Container style={{ paddingTop: "3rem" }}>
          <Row>
            {featuredBooks.map((book, index) => (
              <Col key={index} md={4} style={{ marginBottom: "1.5rem" }}>
                <Card className="shadow lift-card">
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "bold" }}>
                      {book.title}
                    </Card.Title>
                    <Card.Subtitle>
                      <small className="text-muted">{book.author}</small>
                    </Card.Subtitle>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
