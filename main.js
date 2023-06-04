import inquirer from 'inquirer';
import { traerArchivo, guardarArchivo, obtenerDatosDelArchivo  } from './leerYEscribir.js';
import {promtGastos, promtObtenerDescripcion} from "./promtGastos.js"



const main = async()=>{
    let promptCorriendo = true
    while(promptCorriendo){
        const opciones = await inquirer.prompt([
            {
              type: 'list',
              name: 'choices',
              message: "Selecciona una opcion",
              choices:[
                {value: 1, name: "Agregar un nuevo gasto"},
                {value: 2, name: "Ver el total de gastos"},
                {value: 3, name: "Buscar gasto especifico"},
                {value: 99, name: "Exit"}
              ]
            },
          ])
    
        switch(opciones.choices){
            case 1:
                await crearNuevoGasto();
                break
            case 2:
                await traerTotalGastos()
                break
            case 3:
                await obtenerGastoPorDescripcion()
            case 99:
                promptCorriendo = false
                break
            default:
                promptCorriendo= false
                break
        }
    }
}

main()

const crearNuevoGasto = async () =>{

    const gasto = await promtGastos()
    const gastosJson = await traerArchivo("./gastos.json")
    for(let i = 0 ;i < gastosJson.length; i++){
        if(gastosJson[i].descripcion === gasto.descripcion.toLowerCase()){
            console.log("El gasto está repetido")
            return
        }
    }
    

    const datosNuevoGasto = [...gastosJson, gasto]
    guardarArchivo("./gastos.json", datosNuevoGasto)
    console.log("Se agregó el gasto")


}

const traerTotalGastos = async()=>{
    const gastos = await traerArchivo("./gastos.json")
    let sumador = 0
    for ( let i = 0 ;i < gastos.length; i++){
        sumador = sumador + parseFloat(gastos[i].monto)
    }

    console.log("El total de gastos es: $"+sumador)
}

const obtenerGastoPorDescripcion = async()=>{
    const gasto = await promtObtenerDescripcion()
    const datosGasto = await obtenerDatosDelArchivo(gasto)
    console.log("Gasto: "+datosGasto.descripcion+"\nMonto: $"+datosGasto.monto)
}