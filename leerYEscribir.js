import fs from "fs"


export const traerArchivo = (file) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, "utf-8", (error, contenido)=>{
            if(error){
                reject(error)
            }else{
                resolve(JSON.parse(contenido))
            }
        })
    })
}

export const guardarArchivo = (file, newData) =>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, JSON.stringify(newData), (error)=>{
            if(error){
                reject(error)
            }else{
                resolve("se escribió el archivo correctamente")
            }
        })
    })
}

export const obtenerDatosDelArchivo = async (gastoDescripcion)=>{
    const gastos = await traerArchivo("./gastos.json")
    const gastoADevolver = gastos.filter(gasto => gasto.descripcion.toLowerCase() === gastoDescripcion.buscar_gasto.toLowerCase())
    return gastoADevolver[0]
}