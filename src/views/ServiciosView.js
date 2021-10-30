import React from 'react'
import { Link } from 'react-router-dom';
import imgFondo from "../assets/pic1.jpg";
import imgWorld from "../assets/world.png"
import { Image } from 'react-bootstrap';

export default function Servicios() {

    return (
        <div>
            <div
                style={{
                backgroundImage: `url(${imgFondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                height: "380px",
                position:"relative",
                
                }}
            >
                <div style={{display:"inline-block", position:"absolute", right:"80px", bottom:"40px", width:"350px", opacity:"75%"}} className="bg-dark text-light p-3">
                    <h2 className="font-weight-bold ">La tranquilidad está en los detalles</h2>
                    <p>Las soluciones del rastreo muestran el progreso de su envio en cada etapa del reparto. </p>
                    <Link to="./" className="btn btn-light text-center m-3">Revisa tu pedido</Link>
                </div>
            </div>
            <div className="mt-5 " >
                <h3>Implemente el poder de la experiencia en envíos</h3>
                <p>Sin importar si es un empresario o una empresa, las herramientas y la tecnología de UPS lo ayudarán a crear eficiencias, a centralizar el control, a recortar costos y a aumentar la productividad. Y con más flexibilidad y mejor información, tendrá la tranquilidad de saber que está haciendo sus envíos de la mejor manera para su empresa.</p>
                <Image src={imgWorld}  alt="Experiencia de envíos" height="250px" />
            </div>
        </div>
    )
}
