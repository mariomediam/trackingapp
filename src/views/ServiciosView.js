import React from 'react'
import { Link } from 'react-router-dom';
import imgFondo from "../assets/pic1.jpg";
import imgWorld from "../assets/world.png"
import imgTransp from "../assets/transport.png"
import imgCourrier from "../assets/courrier.png"
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
            <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-md-6 my-3 me-4">
                    <h3 className="mb-4">Implemente el poder de la experiencia en envíos</h3>
                    <p>Sin importar si es un empresario o una empresa, las herramientas y la tecnología de UPS lo ayudarán a crear eficiencias, a centralizar el control, a recortar costos y a aumentar la productividad. Y con más flexibilidad y mejor información, tendrá la tranquilidad de saber que está haciendo sus envíos de la mejor manera para su empresa.</p>
                </div>
                <div className="col-md-3">
                    <Image src={imgWorld}  alt="Experiencia de envíos" height="250px" />
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-md-3">
                    <Image src={imgCourrier}  alt="Experiencia de envíos" height="250px" />
                </div>
                <div className="col-md-6 my-3 ms-4">
                    <h3>Las nuevas mejoras simplificaron los envíos</h3>
                    <ul className="mt-4">
                        <li className="mt-3">Una interfaz más intuitiva que simplifica el proceso de envío.</li>
                        <li className="mt-3">Estimación de precios en directo que se actualiza automáticamente a medida que realiza envíos.</li>
                        <li className="mt-3">Realice envíos a varias personas a la vez con una lista de distribución mejorada y capacidades de importación por lotes.</li>
                    </ul>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-md-6 my-3 me-4">
                    <h3 className="mb-4">Soluciones de rastreo a medida</h3>
                    <p>No importa si son 10 violines para una tienda local de música ó 1 000 vacunas para una clínica: ambos envíos son igual de importantes. Sin embargo, la información que usted necesitaría sobre el estado para gestionar estos dos envíos es completamente diferente.</p>
                    <p>Es por eso que hemos desarrollado un rango de herramientas de rastreo que ofrecen precisamente la información que necesita, cuando y donde la necesita. De esta forma, puede cambiar la ruta de los violines para que lleguen a la escuela para el primer día de clases.</p>
                </div>
                <div className="col-md-3">
                    <Image src={imgTransp}  alt="Experiencia de envíos" height="250px" />
                </div>
            </div>
        </div>
    )
}
