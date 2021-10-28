import axios from "axios"

//const URL = `${process.env.REACT_APP_API_TRACKING}/Pedido_Ruta`
const URL = `${process.env.REACT_APP_API_TRACKING}`

const obtenerPedidoRuta = async(busqueda = "") => {
    try {
        let { data } = await axios.get(`${URL}?search=${busqueda}`)
        return data //ya tenemos los datos
    } catch (error) {
        throw error
    }
}

const obtenerPedidoRutaPorId = async(id) => {
    try {
        let { data } = await axios.get(`${URL}/${id}`)
        return data //ya tenemos los datos
    } catch (error) {
        throw error
    } 
}

const obtenerPedidoRutaPorPedidoId = async(pedido_id) => {
    try {
        //console.log("pedido_id", pedido_id)
        //let { data } = await axios.get(`${URL}?pedido_id=${pedido_id}`)
        let { status, data: {content : filas} } = await axios.get(`${URL}/buscar_pedido_ruta?pedidoId=${pedido_id}`)        
        let data = []        
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                data.push(
                    {                        
                        "pedido_id": fila["pedido"],
                        "almacen_id_origen": 1,
                        "ruta_paso_id": fila["pedRutPasoNro"],
                        "ruta_paso_desc": fila["pedRutPasoTipo"],
                        "pedidoRuta_tiemEst": fila["pedRutTiempoEst"],
                        "pedidoRuta_fecEst": fila["pedRutFechaEst"],
                        "pedidoRuta_Recib": fila["pedRutRecibido"],
                        "pedidoRuta_fecReal": fila["pedRutFechaReal"],
                        "pedidoRuta_coment": fila["pedRutaComent"],
                        "ruta_pasoTipo": fila["pedRutPasoTipo"],
                        "pedidoRuta_id": fila["pedRutaId"],
                    }
                )
            })
            
            
        }
        return data //ya tenemos los datos
    } catch (error) {
        throw error
    }
}

const crearPedidoRuta = async (nuevoPedidoRuta) => {
   
    try {        
        const headers = {
            "Content-Type": "application/json"
        }
        let { data } = await axios.post(URL, nuevoPedidoRuta, { headers })              
        
        return data
    } catch (error) {
        throw error
    }
}

const editarPedidoRuta = async (pedidoRutaEditado, id) => {
    try {
        console.log("pedidoRutaEditado", pedidoRutaEditado)
        const headers = {
            "Content-Type": "application/json"
        }
        const { data } = await axios.put(`${URL}/pedido_ruta/${id}`, pedidoRutaEditado, {headers})
        return data
    } catch (error) {
        throw error
    }
}

export{
    obtenerPedidoRuta,
    obtenerPedidoRutaPorId,
    crearPedidoRuta,
    obtenerPedidoRutaPorPedidoId,
    editarPedidoRuta    
}