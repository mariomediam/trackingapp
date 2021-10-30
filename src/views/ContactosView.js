import React from 'react'
import imgPeru from '../assets/peru-letras.jpeg'
import imgDirec from '../assets/direccion.jpeg'
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
            <div style={{transition:"linear,"}} className="row d-flex justify-content-center align-items-center my-5">
                <div className="col-md-10 mt-5 ps-5">
                    <h2>Información de Contacto</h2>
                </div>
                <div className="col-md-4 my-5 me-4">
                    <h3 className="mb-4">ClickPack Perú S.A.</h3>
                    <p>Calle Coronel Andres Reyes No. 492,San Isidro</p>
                    <p>Lima</p>
                    <p>Perú</p>
                    <p>Tel.: 511-614-2500</p>
                    <p>Tel.: 511-614-2500</p>
                </div>
                <div className="col-md-3">
                    <Image src={imgDirec}  alt="Experiencia de envíos" height="350px" />
                </div>
            </div> 
        </div>
        
    )
}
