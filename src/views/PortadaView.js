import { Button, Card, Form, CardGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router'

import imgFondo from "../assets/pic1.jpg";
import imgEmpresa from "../assets/empresa.jpg";
import imgPlaya from "../assets/playa.jpg";
import imgFaqs from "../assets/faqs.jpg";

export default function PortadaView() {
  const {		
    register,
		handleSubmit		
	} = useForm();

  const history = useHistory()

  const recibirSubmit = (datos) => {
    
    history.push(`/VerPedidoRutaView/${datos.tokenBuscado}`)
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${imgFondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container my-auto d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-sm-10">
              <Card className="my-5 d-flex justify-content-center align-items-center">
                <Card.Header as="h2" className="py-3">Seguimiento de envíos</Card.Header>
                <Card.Body>
                  <Card.Title className="mb-5 text-center">Ingrese número de tracking</Card.Title>

                  <Form onSubmit={handleSubmit(recibirSubmit)}>
                    <Form.Group className="my-5" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Ej. 4fJ94S" {...register("tokenBuscado", { required: true })}/>                   
                    </Form.Group>
                    <Form.Text className="text-muted" >
                        No comparta su token con otras personas
                    </Form.Text>
                    <div className="mt-3">
                      <Button className="w-100" type="submit" variant="dark" size="lg" >
                        Ir al pedido
                      </Button>
                  </div>
                  </Form>  
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col m-4">
          <h2 style={{ textAlign: "center" }}>
            Con ClickPack los usuarios pueden rastrear la ubicación de sus
            pedidos.
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CardGroup>
            <Card className="p-3">
              <Card.Img variant="top" src={imgEmpresa} height="250px" />
              <Card.Body>
                <Card.Title>Servicios para pequeñas empresas</Card.Title>
                <Card.Text>
                  Envíe los pedidos de sus clientes en poco tiempo con los
                  servicios en línea a los que puede acceder desde el trabajo o
                  desde casa: imprima etiquetas, programe recolecciones, gane
                  puntos de fidelidad para ahorrar en envíos futuros y más.
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card className="p-3">
              <Card.Img variant="top" src={imgPlaya} height="250px" />
              <Card.Body>
                <Card.Title>Servicio de reenvío premium</Card.Title>
                <Card.Text>
                  ¿Lejos en costas más soleadas? Haga que su correo sea
                  empaquetado y reenviado en un envío semanal de Priority
                  ClickPack
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card className="p-3">
              <Card.Img variant="top" src={imgFaqs} height="250px" />
              <Card.Body>
                <Card.Title>Preguntas frecuentes sobre coronavirus</Card.Title>
                <Card.Text>
                  Visite nuestras Preguntas frecuentes para obtener más
                  información sobre cómo estamos manejando los efectos de esta
                  pandemia al tiempo que garantizamos un manejo y entrega
                  seguros del correo a todos los clientes residenciales y
                  comerciales.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </div>
      </div>
    </div>
  );
}
