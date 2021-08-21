import axios from "axios"
import  { obtenerProductos  } from "./productosService"


const URL = `${process.env.REACT_APP_API}/Pedido_Producto`

const obtenerPedidoProducto = async () => {
    try {
        let { data } = await axios.get(URL)
        return data
    } catch (error) {
        throw error
    }
}

const crearPedidoProducto = async (nuevoPedido) => {
    try {
        const headers = {
            "Content-Type": "application/json"
        }
        //.post(URL, DATA, HEADERS)
        let { data } = await axios.post(URL, nuevoPedido, { headers })
        return data
    } catch (error) {
        throw error
    }
}

const obtenerProductosPorPedidoId = async(pedido_id) => {
    try {

        let productos = []
        productos = await obtenerProductos()
        let { data } = await axios.get(`${URL}?pedido_id=${pedido_id}`)

        for (let i = 0; i < data.length; i++){
            let productoNombre = productos.filter(item => item.prod_id === data[i].prod_id)
            if (productoNombre.length > 0) {
                data[i].prod_descripcion = productoNombre[0].prod_descripcion
                data[i].prod_imagen = productoNombre[0].prod_imagen
                data[i].prod_nombre = productoNombre[0].prod_nombre
            }
        }
        return data //ya tenemos los datos
    } catch (error) {
        throw error
    }
}

export{
    obtenerPedidoProducto,
    crearPedidoProducto ,
    obtenerProductosPorPedidoId
}