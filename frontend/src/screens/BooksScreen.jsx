import { useParams } from "react-router-dom";
import Book from "../components/Book";

const BooksScreen = () => {
  const book = {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description:
      "Join Harry Potter as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry. Follow him on an epic adventure to uncover the mystery of the Sorcerer's Stone.",
  };

  const { category } = useParams();
  return (
    <div>
      <Book book={book}/>
    </div>
  );
};

export default BooksScreen;
