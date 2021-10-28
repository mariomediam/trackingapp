import axios from "axios"
import { crearPedidoProducto } from "./pedidoProductoService"
import { obtenerPlantillaRutaPorAlmDist } from "./plantillaRutasService"
import { crearPedidoRuta } from "./pedidoRutaService"



//const URL = `${process.env.REACT_APP_API}/Pedido`
const URL = `${process.env.REACT_APP_API}`

const obtenerPedidos = async () => {
    try {
        
        //let { data } = await axios.get(URL)
        let { status, data: {content : filas} } = await axios.get(`${URL}/pedidos`)
        let data = []  
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                data.push(
                    {                        
                        
                        "pedido_token":  fila["pedidoToken"],
                        "pedido_fecha": fila["pedidoFecha"],
                        "pedido_cliente": fila["clienteNombre"],
                        "distr_id_destino": fila["pedidoDistrDestino"],
                        "pedido_direccion": fila["pedidoDireccion"],
                        "pedido_dirgeo": fila["pedidoGeo"],
                        "pedido_email": fila["clienteCorreo"],
                        "pedido_telefono": fila["clienteTelefono"],
                        "pedido_id": fila["pedidoId"]
                       
                    }
                )
            })
            
            
        }
        
        return data
    } catch (error) {
        throw error
    }
}

const obtenerPedidoPorToken = async(token) => {
    let status = 0
    try {
        
        //let { data } = await axios.get(`${URL}?pedido_token=${token}`)
        let { status, data: {content : filas} } = await axios.get(`${URL}/buscar_pedido?token=${token}`)
        let data = []
        if (status===200 && filas.length > 0){
            data.push(
                {
                    "pedido_token":  filas[0]["pedidoToken"],
                    "pedido_fecha": filas[0]["pedidoFecha"],
                    "pedido_cliente": filas[0]["clienteNombre"],
                    "distr_id_destino": filas[0]["pedidoDistrDestino"],
                    "pedido_direccion": filas[0]["pedidoDireccion"],
                    "pedido_dirgeo": filas[0]["pedidoGeo"],
                    "pedido_email": filas[0]["clienteCorreo"],
                    "pedido_telefono": filas[0]["clienteTelefono"],
                    "pedido_id": filas[0]["pedidoId"]
                }
            )
            
        }
        return data //ya tenemos los datos
    } catch (error) {
        console.log("eeror", status)
        throw error
    }
}

const crearPedido = async (nuevoPedido, carrito) => {
    let pedidoProducto = {
        pedido_id:0,
        prod_id:0,
        prod_precio:0,
        prod_cantidad:0,
        almacen_id_origen:0
    }
    let pedidoRuta = {
        pedido_id:0,
        almacen_id_origen:0,
        ruta_paso_id:0,
        ruta_paso_desc:"",
        pedidoRuta_tiemEst:0,
        pedidoRuta_fecEst:new Date(),
        pedidoRuta_Recib:false,
        pedidoRuta_fecReal:new Date(),
        pedidoRuta_coment:"",
        ruta_pasoTipo:""
    }

    let almacenes_origen = []

    try {        
        const headers = {
            "Content-Type": "application/json"
        }
        let { data } = await axios.post(URL, nuevoPedido, { headers })
        for (let i=0; i<carrito.length; i++){        
            pedidoProducto = {
                pedido_id:data.pedido_id,
                prod_id:carrito[i].prod_id,
                prod_precio:carrito[i].prod_precio,
                prod_cantidad:carrito[i].cantidad,
                almacen_id_origen:carrito[i].almacen_id_origen
            }
            await crearPedidoProducto(pedidoProducto)

            if (!almacenes_origen.includes(carrito[i].almacen_id_origen)){
                almacenes_origen.push(carrito[i].almacen_id_origen)
            }
        
        };
        
        for (let i = 0; i < almacenes_origen.length; i++) {
            let misRutas = await obtenerPlantillaRutaPorAlmDist(almacenes_origen[i], nuevoPedido.distr_id_destino)
            let fecEstimada = nuevoPedido.pedido_fecha;                        

            for (let y=0; y < misRutas.length; y++){
                
                fecEstimada = new Date(fecEstimada.setDate(fecEstimada.getDate() + misRutas[y].ruta_TiempoEst));

                pedidoRuta = {
                    pedido_id:data.pedido_id,
                    almacen_id_origen:almacenes_origen[i],
                    ruta_paso_id:misRutas[y].ruta_paso_id,
                    ruta_paso_desc:misRutas[y].ruta_pasoDesc,
                    pedidoRuta_tiemEst:misRutas[y].ruta_TiempoEst,
                    pedidoRuta_fecEst:fecEstimada,
                    pedidoRuta_Recib:false,
                    pedidoRuta_fecReal:undefined,
                    pedidoRuta_coment:"",
                    ruta_pasoTipo:""
                }

                await crearPedidoRuta(pedidoRuta)
            }           
            
        }

        
        
        

        
        return data
    } catch (error) {
        throw error
    }
}

export{
    obtenerPedidos,
    crearPedido,
    obtenerPedidoPorToken 
}