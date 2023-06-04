import inquirer from 'inquirer';

const preguntasAlUsuario = [
  {
    type: 'input',
    name: 'descripcion',
    message: "Ingrese la descripción de su gasto",
  },
  {
    type: 'input',
    name: 'monto',
    message: "Ingrese el monto de su gasto",
  }
];

const gastoDescripcion = [
    {
      type: 'input',
      name: 'buscar_gasto',
      message: "Ingrese descripcion que desea buscar",
    },
  ];

export const promtGastos = ()=>{
    return new Promise((resolve, reject)=>{
      try{
        inquirer.prompt(preguntasAlUsuario)
        .then(res=>{
          resolve(res)
        })
      }catch(error){
        reject(error)
      }
    }) 
}

export const promtObtenerDescripcion= ()=>{
    return new Promise((resolve, reject)=>{
      try{
        inquirer.prompt(gastoDescripcion)
        .then(res=>{
          resolve(res)
        })
      }catch(error){
        reject(error)
      }
    }) 
  }