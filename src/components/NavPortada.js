import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo_empresa from "../assets/logo_empresa.png";
import { AuthContext } from "../context/authContext";

export default function NavTop() {
  const { signIn, userState, signOut } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo_empresa}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          ClickPack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Collapse className="justify-content-end">
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/">Nosotros</Nav.Link>
                <Nav.Link href="/">Servicios</Nav.Link>                
                {userState ? (
                  <Nav.Link href="/BuscarPedido">Buscar pedido</Nav.Link>
                ) : (
                  <div></div>
                )}
              </Nav>
            </Container>

            <Navbar.Brand>
              {userState ? (
                <Container>
                  <Nav className="me-auto">
                    <NavDropdown
                      title={
                        <div className="d-inline">
                          <img
                            src={userState.photoURL}
                            className="me-2"
                            style={{ borderRadius: "50%", width: "30px" }}
                            alt="avatar"
                          />
                          <small className="text-white font-weight-light">
                            {userState.displayName}
                          </small>
                        </div>
                      }
                    >
                      <NavDropdown.Item onClick={signOut}>
                        Salir
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Container>
              ) : (
                <button className="btn btn-dark" onClick={signIn}>
                  <i className="fas fa-sign-in-alt me-2" />
                  Intranet
                </button>
              )}
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
