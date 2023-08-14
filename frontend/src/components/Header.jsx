import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Sidebar from "./Sidebar";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
      <Navbar expand="lg">
        <Container>
          <Nav>
            <LinkContainer to="/">
              <Navbar.Brand>BookNest</Navbar.Brand>
            </LinkContainer>
          </Nav>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavbarClick}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`ms-auto ${
                showVerticalButtons ? "flex-column center-vertical" : ""
              }`}
            >
              {userInfo ? (
                <>
                  {!navbarCollapsed && (
                    <div
                      className="d-lg-none text-bg-secondary mt-4"
                      style={{ width: "100%" }}
                    >
                      {/* Show only on mobile screens */}
                      <Sidebar />
                    </div>
                  )}
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
