import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Alert, FloatingLabel, Form, Button } from "react-bootstrap";


import Loading from "../components/Loading";
import VerticalLinearStepper from "../components/Stepper";
import { obtenerPedidoPorToken } from "../services/pedidoService";
import { obtenerPedidoRutaPorPedidoId } from "../services/pedidoRutaService";
import { useHistory } from 'react-router'

export default function VerPedidoRutaView() {
  const { token } = useParams();
  

  const [cargando, setCargando] = useState(true);
  const [pedido, setPedido] = useState([]);
  const [existePedido, setExistePedido] = useState(false);
  const [rutas, setRutas] = useState([]);
  const [almacen_origen, setAlmacen_origen] = useState([]);
  const controlAlmacenOrigen = useRef();
  const [almacen_selecc_id, setAlmacen_selecc_id] = useState(0);
  const [rutaSeleccionada, setRutaSeleccionada] = useState([]);
  const history = useHistory()

  const obtenerRutas = async () => {
    let pedidoTmp = [];
    let rutasTmp = [];
    let almacenTmp = [];
    pedidoTmp = await obtenerPedidoPorToken(token);
    if (pedidoTmp.length > 0) {
      setExistePedido(true);
      rutasTmp = await obtenerPedidoRutaPorPedidoId(pedidoTmp[0].pedido_id);
      setPedido(pedidoTmp[0]);
      if (rutasTmp.length > 0) {
        rutasTmp.forEach((item) => {
          if (!almacenTmp.includes(item.almacen_id_origen)) {
            almacenTmp.push(item.almacen_id_origen);
          }
        });

        setAlmacen_origen(almacenTmp);
      }
    }

    setRutas(rutasTmp);
    
    setCargando(false);
  };

  const changeControlAlmacenOrigen = () => {
    setAlmacen_selecc_id(parseInt(controlAlmacenOrigen.current.value));
  };

  const irA = () => {
      history.push("/")
  }

  useEffect(() => {
    obtenerRutas();
  }, []);

  useEffect(() => {
    if (almacen_origen.length > 0) {
      setAlmacen_selecc_id(almacen_origen[0]);
    }
  }, [almacen_origen]);

  useEffect(() => {
    let rutasSeleccionadasTmp = [];

    if (rutas.length > 0) {
      rutasSeleccionadasTmp = rutas.filter(
        (item) => item.almacen_id_origen === almacen_selecc_id
      );
    }
    setRutaSeleccionada(rutasSeleccionadasTmp);
  }, [almacen_selecc_id]);

  return (
    <div>
      {cargando ? (
        <Loading />
      ) : !existePedido ? (
        <div className="mt-2 mx-5">
          <Alert variant="danger">Token {token} no encontrado</Alert>
        </div>
      ) : (
        <div className="mx-5">
          <div className="row">
            <div className="col mt-3">
              <div>
                <div className="row">
                  <Alert variant="dark">
                    <div className="col">
                      Pedido: <b> {pedido.pedido_id}</b>
                    </div>
                    <div className="col">
                      token: <b>{pedido.pedido_token}</b>
                    </div>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
            </div>
            <div className="row">
              <div className="col">
                <VerticalLinearStepper
                  rutaSeleccionada={rutaSeleccionada}
                  editable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-grid gap-2 mx-5">
        <Button variant="dark" size="lg" onClick={irA}>
          Volver a buscar
        </Button>
      </div>
     
    </div>
  );
}
