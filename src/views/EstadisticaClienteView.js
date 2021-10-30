import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip, AreaChart, Area, PieChart, Pie} from "recharts";
import { reporte_venta_cliente } from "../services/reporteService"; 
import { Table } from "react-bootstrap";


export default function EstadisticaClienteView() {
  const [compras, setCompras] = useState([]);

  const getCompras = async () => {
    const compras = await reporte_venta_cliente();
    compras.forEach(compra => {
        compra["name"] = compra["nombre_img"]
    })
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
         Compras por cliente
        </h1>
      </div>
      {/* <React.Fragment> 
        <h3 className="mx-5">Compras S/. por cliente</h3>       
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
      </React.Fragment> */}
       <React.Fragment>
      
       <h3 className="mx-5">Compras S/. por cliente</h3>       
      <ResponsiveContainer width="100%" aspect={2} >
       <AreaChart data= {compras} margin={{left:50, right:50, top:50, bottom:50}}>
         <CartesianGrid strokeDasharray="2 2"/>
         <Tooltip contentStyle={{backgroundColor:"lightgray"}}/>         
         <Area dataKey="monto" stroke="green" fill="green" activeDot={{r:10}} type="monotone" />
         <XAxis dataKey ="nombre_img"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
         <YAxis />
         <Legend />
       </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
     
      {/* <React.Fragment>
      <h3 className="mx-5">Número de compras por cliente</h3>
      <ResponsiveContainer width="100%" aspect={2} >
        <LineChart data= {compras} margin={{left:50, right:50, top:50, bottom:50}}>
            <CartesianGrid strokeDasharray="2 2"/>
            <Tooltip contentStyle={{backgroundColor:"lightgray"}}/>
            <Line dataKey="nro_compras" stroke="red" activeDot={{r:10}} type="monotone" />            
            <XAxis dataKey ="nombre_img"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
            <YAxis />
            <Legend />
        </LineChart>
       </ResponsiveContainer>
       </React.Fragment> */}

    <React.Fragment>
        <h3 className="mx-5">Número de compras por cliente</h3>
        <ResponsiveContainer width="100%" aspect={5} >
       <PieChart>
         <Tooltip/>
         <Pie  data= {compras} dataKey="nro_compras"  cx="50%" cy="50%" outerRadius={80} fill="red" label/>
       </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
      
      <div className="mx-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Monto S/.</th>              
              <th>Número de compras</th>
            </tr>
          </thead>
          <tbody>
          {compras.map((compra, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{compra.nombre}</td>
              <td>{compra.monto}</td>              
              <td>{compra.nro_compras}</td>
            </tr>           
          ))}           
          </tbody>
        </Table>
      </div>      
    </div>   
    );
}
