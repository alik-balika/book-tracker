import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Header = () => {
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
            <Nav.Link href="/">
              <Navbar.Brand
                style={{
                  fontSize: "1.8rem",
                }}
              >
                SITE NAME
              </Navbar.Brand>
            </Nav.Link>
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
              <Nav.Link href="/register">
                <Button
                  variant="dark"
                  className="rounded-pill rounded-button"
                  style={{ paddingRight: 20, paddingLeft: 20 }}
                >
                  Sign Up
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
