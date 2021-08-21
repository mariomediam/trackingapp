import { Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import { obtenerDistritos } from "../services/distritoService";

export default function DistritosView() {
  const [distritos, setDistritos] = useState([]);

  const getDistritos = async () => {
    const distritosTmp = await obtenerDistritos();
    setDistritos(distritosTmp);
  };

  useEffect(() => {
    getDistritos();
  }, []);

  return (
    <div>
      <div className="my-4 text-center">
        <h1 className="fw-bold">
          <i className="fas fa-globe-americas me-3" />
         Zonas de reparto
        </h1>
      </div>
      <div className="row">
        <div className="col">
          <Accordion defaultActiveKey="0">
            {distritos.map((item, i) => (
              <div className="m-3">
                <Accordion.Item eventKey={i}>
                  <Accordion.Header>
                    <h4>Distrito: {item.distr_nombre}</h4>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <div className="col-lg-2 sol-sm-12">
                        <small>Departamento:</small>
                      </div>
                      <div className="col">{item.dpto_nombre}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-2 sol-sm-12">
                        <small>Provincia:</small>
                      </div>
                      <div className="col">{item.prov_nombre}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-2 sol-sm-12">
                        <small>Coordenadas:</small>
                      </div>
                      <div className="col">{item.distri_geo}</div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
