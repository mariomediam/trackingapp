import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip, BarChart, Bar, LineChart, Line} from "recharts";
import { reporte_venta_distrito } from "../services/reporteService"; 
import { Table } from "react-bootstrap";


export default function EstadisticaDistritosView() {
  const [compras, setCompras] = useState([]);

  const getCompras = async () => {
    const compras = await reporte_venta_distrito();
    setCompras(compras);
  };

  useEffect(() => {
    getCompras();
  }, []);

  

  return (
    <div>
      <div className="my-4 text-center">
        <h1 className="fw-bold">
          <i className="fas fa-globe-americas me-3" />
         Compras por distrito
        </h1>
      </div>
      {/* <React.Fragment>        
        <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data= {compras} margin={{left:50, right:50, top:100, bottom:100}}>
          <CartesianGrid strokeDasharray="2 2"/>
          <Tooltip />
          <Bar dataKey="total" fill="red" />
          
          <XAxis dataKey ="distr_nombre"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
          <YAxis />
          <Legend />
        </BarChart>
        </ResponsiveContainer>
      </React.Fragment> */}
      <React.Fragment>
        
        <ResponsiveContainer width="100%" aspect={3} >
        <LineChart data= {compras}>
          <XAxis dataKey ="distr_nombre" />
          <Line dataKey="total" />
          <YAxis />
        </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
      
      <div className="m-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Departamento</th>
              <th>Provincia</th>
              <th>Distrito</th>
              <th>Número de compras</th>
            </tr>
          </thead>
          <tbody>
          {compras.map((compra, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{compra.dpto_nombre}</td>
              <td>{compra.prov_nombre}</td>
              <td>{compra.distr_nombre}</td>
              <td>{compra.total}</td>
            </tr>           
          ))}           
          </tbody>
        </Table>
      </div>     
    </div>   
    );
}
