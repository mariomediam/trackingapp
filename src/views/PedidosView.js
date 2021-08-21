import { useState, useEffect } from "react";
import { obtenerPedidos } from "../services/pedidoService";
import { obtenerProductosPorPedidoId } from "../services/pedidoProductoService";
import Loading from "../components/Loading";
import { Accordion } from "react-bootstrap";

export default function PedidosView() {
  const [pedidoProductos, setPedidoProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const getPedidoProductos = async () => {
    let pedidosProductosTmp = [];
    let pedidos = [];
    pedidos = await obtenerPedidos();
    console.log("pedidos", pedidos);
    for (let i = 0; i < pedidos.length; i++) {
      let productos = [];
      productos = await obtenerProductosPorPedidoId(pedidos[i].pedido_id);
      pedidosProductosTmp.push([pedidos[i], productos]);
    }
    setPedidoProductos(pedidosProductosTmp);
    console.log("pedidosProductosTmp aaaaa", pedidosProductosTmp);
    setCargando(false);
  };

  useEffect(() => {
    getPedidoProductos();
  }, []);

  return (
    <div>
      {cargando ? (
        <Loading />
      ) : (
        <div>
          <div className="my-4 text-center">
            <h1 className="fw-bold">
              <i className="fas fa-box-open me-3" />
              Pedidos
            </h1>
          </div>
          <div className="row">
            <div className="col">
              <Accordion defaultActiveKey="0">
                {pedidoProductos.map((item, i) => (
                  <div className="m-3">
                    <Accordion.Item eventKey={i} key={item[0].pedido_id}>
                      <Accordion.Header>
                        <h4>
                          Pedido: {item[0].pedido_id} Token:{" "}
                          {item[0].pedido_token} <br />
                        </h4>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-lg-2 sol-sm-12">
                            <small>Cliente:</small>
                          </div>
                          <div className="col">{item[0].pedido_cliente}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-lg-2 sol-sm-12">
                            <small>Productos:</small>
                          </div>
                          <div className="col">
                            {item[1].map((prod, iProd) => <div>
                            {prod.prod_nombre} - Cantidad: {prod.prod_cantidad} </div>
                            )}
                          </div>
                        </div>
                        <hr />
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
