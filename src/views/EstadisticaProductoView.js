import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip, BarChart, Bar, LineChart, Line} from "recharts";
import { reporte_venta_producto } from "../services/reporteService"; 
import { Table } from "react-bootstrap";


export default function EstadisticaProductosView() {
  const [compras, setCompras] = useState([]);

  const getCompras = async () => {
    const compras = await reporte_venta_producto();
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
         Compras por producto
        </h1>
      </div>
      <React.Fragment> 
        <h3 className="mx-5">Compras S/. por producto</h3>       
        <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data= {compras} margin={{left:50, right:50, top:50, bottom:50}}>
          <CartesianGrid strokeDasharray="2 2"/>
          <Tooltip />
            <Bar dataKey="monto" fill="green" />
          <XAxis dataKey ="nombre_img"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
          <YAxis />
          <Legend />
        </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
      {/* <React.Fragment>        
        <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data= {compras} margin={{left:50, right:50, top:100, bottom:100}}>
          <CartesianGrid strokeDasharray="2 2"/>
          <Tooltip />
           <Bar dataKey="cantidad" fill="red" />          
          <XAxis dataKey ="nombre_img"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
          <YAxis />
          <Legend />
        </BarChart>
        </ResponsiveContainer>
      </React.Fragment> */}
      <React.Fragment>
      <h3 className="mx-5">Unidades entregadas por producto</h3>
      <ResponsiveContainer width="100%" aspect={2} >
        <LineChart data= {compras} margin={{left:50, right:50, top:50, bottom:50}}>
            <CartesianGrid strokeDasharray="2 2"/>
            <Tooltip contentStyle={{backgroundColor:"lightgray"}}/>
            <Line dataKey="cantidad" stroke="red" activeDot={{r:10}} type="monotone" />            
            <XAxis dataKey ="nombre_img"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
            <YAxis />
            <Legend />
        </LineChart>
       </ResponsiveContainer>
       </React.Fragment>
      
      <div className="mx-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Monto S/.</th>              
              <th>Unidades</th>
            </tr>
          </thead>
          <tbody>
          {compras.map((compra, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{compra.nombre}</td>
              <td>{compra.monto}</td>              
              <td>{compra.cantidad}</td>
            </tr>           
          ))}           
          </tbody>
        </Table>
      </div>      
    </div>   
    );
}
