import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
const Book = ({ book }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div
      className="text-center"
      style={{
        width: "11rem",
        height: "15rem",
      }}
    >
      <Card
        className="shadow lift-card"
        style={{
          width: "11rem",
          height: "15rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Card.Body className="p-0">
          <Card.Img
            src="https://random.imagecdn.app/350/200"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Card.Body>
      </Card>
      <div className="mt-2">
        <h6 className="fw-bold mb-1">{truncateText(book.title, 40)}</h6>
        <p className="mb-0 text-muted">{truncateText(book.author, 40)}</p>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default Book;
