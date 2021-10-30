import React from 'react'
import imgPeru from '../assets/peru-letras.jpeg'
import imgDirec from '../assets/direccion.jpeg'
import imgTecnic from '../assets/tecnico.png'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

export default function Contactos() {

    return (
        <div>
            <div
                style={{
                backgroundImage: `url(${imgPeru})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                height: "480px",
                position:"relative",
                
                }}
            >
                <div style={{display:"inline-block", position:"absolute", right:"80px", bottom:"40px", width:"350px", opacity:"75%"}} className="bg-dark text-light p-3">
                    <h2 className="font-weight-bold ">La tranquilidad está en los detalles</h2>
                    <p>Las soluciones del rastreo muestran el progreso de su envio en cada etapa del reparto. </p>
                    <Link to="./" className="btn btn-light text-center m-3">Revisa tu pedido</Link>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center my-5 border-bottom mx-5">
                <div className="col-md-10 d-flex justify-content-center align-items-center my-5">
                    <div className="row">
                <div className="col-md-8 my-4 ps-5">
                    <h2 style={{fontWeight:"800"}}>Información de Contacto</h2>
                </div>
                <div className="col-md-5 my-4 me-4">
                    <h3 className="mb-4">ClickPack Perú S.A.</h3>
                    <p>Calle Coronel Andres Reyes No. 492,San Isidro</p>
                    <p>Lima</p>
                    <p>Perú</p>
                    <p>Tel.: 511-614-2500</p>
                    <p>Tel.: 511-614-2500</p>
                    <p><a href="./" className="text-danger">Enviar un mensaje a ClickPack</a></p>
                </div>
                <div className="col-md-4">
                    <Image src={imgDirec}  alt="Experiencia de envíos" height="330px" />
                </div>
            </div> 
            </div>
            </div>
            <div className="row d-flex justify-content-end align-items-start">
                <div className="col-md-3 me-2">
                    <Image  height="200px"  src={imgTecnic} />
                </div>
                <div className="col-md-6 pe-5 me-5 my-3">
                    <h3 className="mb-3">Soporte Técnico</h3>
                    <p style={{lineHeight:"2"}}>Para obtener ayuda con la instalación, actualización o el uso de la tecnología móvil, póngase en contacto con ClickPack en el 080000919.</p>
                </div>

            </div>
        </div>
        
    )
}
