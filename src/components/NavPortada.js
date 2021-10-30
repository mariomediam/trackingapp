import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo_empresa from "../assets/logo_empresa.png";
import { AuthContext } from "../context/authContext";

export default function NavTop() {
  const { signIn, userState, signOut } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" className="p-3">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo_empresa}
            width="40"
            height="40"
            className="d-inline-block align-center color-dark me-3"
          />{" "}
          ClickPack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto d-flex justify-content-between align-items-center">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/Nosotros">Nosotros</Nav.Link>
              <Nav.Link href="/Servicios">Servicios</Nav.Link>
            </Nav>  
              {userState ? (
                  <Nav className="">
                    <Nav.Link href="/BuscarPedido" className="me-3">Buscar pedido</Nav.Link>
                    <NavDropdown className="me-3" title="Maestros" id="basic-nav-dropdown">
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
                    <NavDropdown
                      title={
                        <div className="d-inline">
                          <img
                            src={userState.photoURL}
                            className="me-3"
                            style={{ borderRadius: "50%", width: "35px" }}
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
