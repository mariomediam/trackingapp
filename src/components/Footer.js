import React from 'react'
import { Link } from 'react-router-dom'
import logo_empresa from "../assets/logo_empresa.png"


export default function Footer() {
    return (
        <div>
            <footer className="danger">
                <row>
                    <col>
                        <Link to="/" className="col-md-4">
                        <image src={logo_empresa}/>
                        </Link>
                    </col>
                    <col>Servicio al cliente</col>
                    <ul>
                        <li>Envíenos un correo electrónico</li>
                        <li>Llamenos</li>
                        <li>Ver todas las opciones de contacto</li>
                    </ul>
                </row>

            </footer>
        </div>
    );
}
