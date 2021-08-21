import { useEffect, useState } from "react";
import { obtenerExistencia } from "../services/existenciaService";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function ExistenciaView() {
  const [existencias, setExistencias] = useState([]);

  const getExistencias = async () => {
    const existenciasTmp = await obtenerExistencia();
    console.log("existenciasTmp", existenciasTmp);
    setExistencias(existenciasTmp);
  };

  useEffect(() => {
    getExistencias();
  }, []);
  return (
    <div>
        <div className="my-4 text-center">
        <h1 className="fw-bold">
          <i className="fas fa-calculator me-3" />
        Inventario de productos
        </h1>
      </div>
      <div className="container">
        <div className="row mt-3">
          {existencias.map((item, i) => (
            <div className="m-3 col-6 col-lg-3" key={i}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.prod_imagen} />
                <Card.Body>
                  <Card.Title>Almacen: {item.almacen_id} <br/> {item.prod_descripcion}</Card.Title>
                  <Card.Text>
                    {item.prod_descripcion} <br/>
                    Stock: {item.existencia_stock}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
