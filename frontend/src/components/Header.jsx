import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
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

  const [showVerticalButtons, setShowVerticalButtons] = useState(false);
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavbarClick = () => {
    // needed so buttons don't prematurely move
    // left before navbar fully collapses
    if (showVerticalButtons) {
      setTimeout(() => {
        setShowVerticalButtons(false);
      }, 250);
    } else {
      setShowVerticalButtons(true);
    }
    setNavbarCollapsed(!navbarCollapsed);
  };

  return (
    <header style={{ fontWeight: "bold" }}>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <Nav>
            <LinkContainer to="/">
              <Navbar.Brand
                style={{
                  fontSize: "1.8rem",
                }}
              >
                SITE NAME
              </Navbar.Brand>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavbarClick}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            onToggle={() => {
              console.log("Pressed");
            }}
          >
            <Nav
              className={`ms-auto ${
                showVerticalButtons ? "flex-column center-vertical" : ""
              }`}
            >
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link href="/login">
                      <Button
                        variant="dark"
                        className="rounded-pill rounded-button"
                        style={{
                          paddingRight: 20,
                          paddingLeft: 20,
                          marginRight: showVerticalButtons ? 0 : 20,
                          marginBottom: showVerticalButtons ? "10px" : "0",
                        }}
                      >
                        Sign In
                      </Button>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link href="/register">
                      <Button
                        variant="dark"
                        className="rounded-pill rounded-button"
                        style={{ paddingRight: 20, paddingLeft: 20 }}
                      >
                        Sign Up
                      </Button>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
