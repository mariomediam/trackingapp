import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo_empresa from "../assets/logo_empresa.png";
import { AuthContext } from "../context/authContext";

export default function NavTop() {
  const { signIn, userState, signOut } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
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
        
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/Nosotros">Nosotros</Nav.Link>
              <Nav.Link href="/Servicios">Servicios</Nav.Link>

            
            </Nav>
          </Navbar.Collapse>
          

          <Navbar.Collapse className="justify-content-end">
            
              {userState ? (
                <Container>
                  <Nav className="me-auto">
                    <Nav.Link href="/BuscarPedido">Buscar pedido</Nav.Link>
                    <NavDropdown title="Maestros" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/Pedidos">
                        Pedidos
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/Distritos">
                        Zonas de reparto
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/Stock">
                        Inventario de productos
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/EstadisticaDistritos">
                        Compras por distrito
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/EstadisticaProductos">
                        Compras por producto
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/EstadisticaClientes">
                        Compras por cliente
                      </NavDropdown.Item>
                     
                    </NavDropdown>
              }
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
            
          </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}
