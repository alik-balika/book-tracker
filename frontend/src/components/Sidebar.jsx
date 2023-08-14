import { Container, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { Link } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Nav className="flex-column text-center">
            <Nav.Link
              as={Link}
              to="/library"
              className={`sidebar-link ${
                location.pathname === "/library" ? "active" : ""
              }`}
            >
              Library
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/categories"
              className={`sidebar-link ${
                location.pathname === "/categories" ? "active" : ""
              }`}
            >
              Categories
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add-item"
              className={`sidebar-link ${
                location.pathname === "/add-item" ? "active" : ""
              }`}
            >
              Add Items
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              className={`sidebar-link ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              className="sidebar-link"
              onClick={logoutHandler}
            >
              Logout
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="text-white" disabled>
              {userInfo.name}
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
