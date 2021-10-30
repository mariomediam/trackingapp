import React from 'react'
import { Image } from 'react-bootstrap'

import imgLogo from '../assets/logo_empresa.png'

export default function Footer() {
    return (
        <div className="row d-flex justify-content-center align-items-center bg-dark text-warning">
            <div className="col-md-3 my-5 mx-3">
                <Image src={imgLogo}/>
            </div>
            <div className="col-md-3 my-5 mx-3">
                <div className="col">
                    <div className="mb-3">
                    <span style={{fontSize:"30px"}}>Síguenos</span>
                    </div>
                    <ul className="row" style={{listStyle:"none", fontSize:"20px"}}>
                        <li className="mb-2"><a href="https://www.facebook.com/Tramigo/" _blank><i className="fa-brands fa-facebook text-warning">/ClickPAck</i></a></li>
                        <li className="mb-2"><a href="https://www.instagram.com/tramigo.official/"><i className="fa-brands fa-instagram text-warning">/ClickPAck</i></a></li>
                        <li className="mb-2"><a href="https://www.youtube.com/c/tramigo"><i className="fa-brands fa-youtube text-warning">/ClickPAck</i></a></li>
                        <li className="mb-2"><a href="https://trackingapp.vercel.app/"><i className="fa-brands fa-twitter text-warning">/ClickPAck</i></a></li>
                    </ul>
                </div>
            </div>
            <div className="col-md-3 my-5 mx-3">
               <p>Copyright ©1994-2021 United Parcel Service of America, Inc. Todos los derechos reservados.</p>
            </div>
        </div>
    )
}
