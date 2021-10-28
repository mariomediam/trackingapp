import axios from "axios"

//const URL = `${process.env.REACT_APP_API_TRACKING}/Distrito`
const URL = `${process.env.REACT_APP_API_TRACKING}`

const obtenerDistritos = async(busqueda = "") => {
    try {
        //let { data } = await axios.get(`${URL}`)        
        let { status, data: {content : filas} } = await axios.get(`${URL}/distritos`)        
        let data = []   
        if (status===200 && filas.length > 0){
            filas.forEach((fila) => {
                data.push(
                    {                        
                        "dpto_nombre":  fila["dptoNombre"],
                        "prov_nombre": fila["provNombre"],
                        "distr_nombre": fila["distrNombre"],
                        "distri_geo": fila["distrGeo"],
                        "distr_id": fila["distritoId"],                       
                    }
                )
            })
            
            
        }
        return data //ya tenemos los datos
    } catch (error) {
        throw error
    }
}

const obtenerDistritoPorId = async(id) => {
    try {
        //let { data } = await axios.get(`${URL}/distrito/${id}`)
        let { status, data: {content : filas} } = await axios.get(`${URL}/distrito/${id}`)
        let data = []        
        if (status===200 && filas){
            data.push(
                {
                    "dpto_nombre":  filas["dptoNombre"],
                    "prov_nombre": filas["provNombre"],
                    "distr_nombre": filas["distrNombre"],
                    "distri_geo": filas["distrGeo"],
                    "distr_id": filas["distritoId"],
                }
            )
            return data[0]
            
        }
        return {} //ya tenemos los datos
    } catch (error) {
        throw error
    } 
}

export{
    obtenerDistritoPorId,
    obtenerDistritos
}