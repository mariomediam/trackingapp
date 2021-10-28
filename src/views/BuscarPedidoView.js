import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  InputGroup,
  FormControl,
  Accordion,
  Alert,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { obtenerPedidoPorToken } from "../services/pedidoService";
import { obtenerPedidoRutaPorPedidoId } from "../services/pedidoRutaService";
import { obtenerDistritoPorId } from "../services/distritoService";
import { obtenerProductosPorPedidoId } from "../services/pedidoProductoService";
import {    
  useMapEvents,
} from "react-leaflet";
import Loading from "../components/Loading";
import VerticalLinearStepper from "../components/Stepper";


export default function BuscarPedidoView() {
  const [productosEnPedido, setProductosEnPedido] = useState([]);
  const [almacen_origen, setAlmacen_origen] = useState([]);
  const [rutas, setRutas] = useState([]);
  
  const [marcador, setMarcador] = useState([-12.0433, -77.0283]);
  /*
  const [geoDistrito, setGeoDistrito] = useState([-16.4040105, -71.556521]);
  */
  const [cargando, setCargando] = useState(false);
  const [existePedido, setExistePedido] = useState(false);
  const [textoExistePedido, setTextoExistePedido] = useState("");
  const [almacen_selecc_id, setAlmacen_selecc_id] = useState(0);
  const [productosEnRuta, setProductosEnRuta] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState([]);
  const controlAlmacenOrigen = useRef();

  const {
    register,
    handleSubmit,    
  } = useForm();

  const recibirSubmit = async (datos) => {
    obtenerRutas(datos.token);
  };

  const AgregarMarcador = () => {
    const map = useMapEvents({
      click: (e) => {
        //console.log(e)
        const { lat, lng } = e.latlng;
        setMarcador([lat, lng]);
      },
    });
    return null;
  };

  const obtenerRutas = async (token) => {
    setCargando(true);
    let existePedidoTmp = false;
    
    let textoExisteTmp = `No se encontro el token ${token}`;
    let rutasTmp = [];
    let productosEnPedidoTmp = [];

    
    let pedidoTmp = await obtenerPedidoPorToken(token);
    if (pedidoTmp.length > 0) {
      textoExisteTmp = "";
      existePedidoTmp = true;
      
    
      const distritto_origen = await obtenerDistritoPorId(
        pedidoTmp[0].distr_id_destino
      );
      
      pedidoTmp[0].dpto_nombre = distritto_origen.dpto_nombre;
      pedidoTmp[0].prov_nombre = distritto_origen.prov_nombre;
      pedidoTmp[0].distr_nombre = distritto_origen.distr_nombre;
      // console.log("pedido[0]", pedidoTmp[0])
      // console.log("distritto_origen", distritto_origen)

      setPedido(pedidoTmp[0]);
      //console.log(pedido)

      rutasTmp = await obtenerPedidoRutaPorPedidoId(pedidoTmp[0].pedido_id);
      productosEnPedidoTmp = await obtenerProductosPorPedidoId(
        pedidoTmp[0].pedido_id
      );

      
      setCargando(false);
    }
    setRutas(rutasTmp);
    setProductosEnPedido(productosEnPedidoTmp);
    setTextoExistePedido(textoExisteTmp);
    setExistePedido(existePedidoTmp);
    setCargando(false);
  };

  const changeControlAlmacenOrigen = () => {
    setAlmacen_selecc_id(parseInt(controlAlmacenOrigen.current.value));
  };

  useEffect(() => {
    let almacenTmp = [];
    rutas.forEach((item) => {
      if (!almacenTmp.includes(item.almacen_id_origen)) {
        almacenTmp.push(item.almacen_id_origen);
      }
    });

    setAlmacen_origen(almacenTmp);
  }, [rutas]);

  useEffect(() => {
    if (almacen_origen.length > 0) {
      setAlmacen_selecc_id(almacen_origen[0]);
    }
  }, [almacen_origen]);

  useEffect(() => {
    let productosEnRutaTmp = [];
    let rutasSeleccionadasTmp = [];
    if (productosEnPedido.length > 0) {
      productosEnRutaTmp = productosEnPedido.filter(
        (item) => item.almacen_id_origen === almacen_selecc_id
      );
    }
    if (rutas.length > 0) {
      rutasSeleccionadasTmp = rutas.filter(
        (item) => item.almacen_id_origen === almacen_selecc_id
      );
    }
    setRutaSeleccionada(rutasSeleccionadasTmp)
    setProductosEnRuta(productosEnRutaTmp);
    
  }, [almacen_selecc_id]);

  return (
    <div>
      <div className="container mt-4">
        <h1>Buscar pedido</h1>
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <form onSubmit={handleSubmit(recibirSubmit)}>
              <InputGroup>
                <FormControl
                  type="text"
                  maxLength="10"
                  placeholder="Ej. 4f7B8m"
                  aria-label="Input Token"
                  aria-describedby="btnGroupToken"
                  {...register("token", { require: true })}
                />
                <button type="submit" className="btb btn-dark">
                  Buscar
                </button>
              </InputGroup>
            </form>
          </div>
          {textoExistePedido.length > 0 ? (
            <div className="mt-2">
              <Alert variant="danger">{textoExistePedido}</Alert>
            </div>
          ) : (
            <div></div>
          )}

          <hr className="mt-4" />
          {cargando ? (
            <Loading />
          ) : existePedido ? (
            <div className="row">
              <div className="col">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h4>Pedido Nº: {pedido.pedido_id}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-lg-2 sol-sm-12">
                          <small>Cliente:</small>
                        </div>
                        <div className="col">{pedido.pedido_cliente}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-2 sol-sm-12">
                          <small>Correo:</small>
                        </div>
                        <div className="col">{pedido.pedido_email}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-2 sol-sm-12">
                          <small>Teléfono:</small>
                        </div>
                        <div className="col">{pedido.pedido_telefono}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-lg-2 sol-sm-12">
                          <small>Dirección:</small>
                        </div>
                        <div className="col">
                          {pedido.dpto_nombre} / {pedido.prov_nombre} /{" "}
                          {pedido.distr_nombre} / {pedido.pedido_direccion}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Seleccione paquete"
                >
                  <Form.Select
                    aria-label="Seleccionar paquete"
                    ref={controlAlmacenOrigen}
                    onChange={changeControlAlmacenOrigen}
                  >
                    {almacen_origen.map((item, id) => (
                      <option key={id} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <div>
                  <ul className="list-group">
                    {productosEnRuta.map((prod, i) => (
                      <li
                        className="list-group-item d-flex justify-content-between"
                        key={i}
                      >
                        <div>
                          <span className="fw-bold">{prod.prod_nombre}</span>
                          <br />
                          <small>Descripción: {prod.prod_descripcion}</small>
                          <br />
                          <small>Cantidad: {prod.prod_cantidad}</small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <VerticalLinearStepper  rutaSeleccionada={rutaSeleccionada} editable={true}/>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
