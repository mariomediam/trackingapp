import axios from "axios"

const URL = `${process.env.REACT_APP_API_TRACKING}`

const reporte_venta_distrito = async(busqueda = "") => {
    try {
        
        let { status, data: {content : filas} } = await axios.get(`${URL}/reporte_venta_distrito`)        
        //let data = []   
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                fila["nombre_completo"] = `${fila["dpto_nombre"]} - ${fila["prov_nombre"]} - ${fila["distr_nombre"]}`
                
            })
            
            
        }
        return filas 
    } catch (error) {
        throw error
    }
}

const reporte_venta_producto = async(busqueda = "") => {
    try {
        
        let { status, data: {content : filas} } = await axios.get(`${URL}/reporte_venta_producto`)        
        //let data = []   
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                fila["nombre_img"] = `${fila["nombre"]}`.substring(0, 10)                
            })
            
            
        }
        return filas 
    } catch (error) {
        throw error
    }
}

const reporte_venta_cliente = async(busqueda = "") => {
    try {
        
        let { status, data: {content : filas} } = await axios.get(`${URL}/reporte_venta_cliente`)        
        //let data = []   
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                fila["nombre_img"] = `${fila["nombre"]}`.substring(0, 10)                
            })
            
            
        }
        return filas 
    } catch (error) {
        throw error
    }
}


export{
    reporte_venta_distrito,
    reporte_venta_producto,
    reporte_venta_cliente
}