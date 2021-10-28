import axios from "axios"
import { obtenerProductoPorId } from "./productosService"

//const URL = `${process.env.REACT_APP_API}/Existencia`
const URL = `${process.env.REACT_APP_API}`

// const obtenerExistencia = async () => {
//     try {
//         let { data } = await axios.get(`${URL}?sortBy=almacen_id`)
        

//         for (let i=0; i< data.length; i++){
//             let producto = await obtenerProductoPorId(data[i].producto_id)
//             data[i].prod_descripcion = producto.prod_descripcion
//             data[i].prod_imagen = producto.prod_imagen
//             data[i].prod_nombre = producto.prod_nombre
//             data[i].prod_precio = producto.prod_precio
//         }
//         return data
//     } catch (error) {
//         throw error
//     }
// }

const obtenerExistencia = async () => {
    try {
        let { status, data: {content : filas} } = await axios.get(`${URL}/productos`)
        let data = []  
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                data.push(
                    {                        
                        
                        "almacen_id":  1,
                        "producto_id": fila["productoId"],
                        "existencia_stock": fila["productoStock"],
                        "existencia_id": fila["productoId"],
                        "prod_descripcion": fila["productoDescripcion"],
                        "prod_imagen": fila["productoImagen"],
                        "prod_nombre": fila["productoNombre"],
                        "prod_precio": fila["productoPrecio"],                                               
                    }
                )
            })
            
            
        }
 
        return data
    } catch (error) {
        throw error
    }
}

export{
    obtenerExistencia
}