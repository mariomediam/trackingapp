import axios from "axios"
import { obtenerProductoPorId } from "./productosService"

const URL = `${process.env.REACT_APP_API}/Existencia`

const obtenerExistencia = async () => {
    try {
        let { data } = await axios.get(`${URL}?sortBy=almacen_id`)
        

        for (let i=0; i< data.length; i++){
            let producto = await obtenerProductoPorId(data[i].producto_id)
            data[i].prod_descripcion = producto.prod_descripcion
            data[i].prod_imagen = producto.prod_imagen
            data[i].prod_nombre = producto.prod_nombre
            data[i].prod_precio = producto.prod_precio
        }
        return data
    } catch (error) {
        throw error
    }
}

export{
    obtenerExistencia
}