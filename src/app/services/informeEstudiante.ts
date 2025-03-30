import axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class informeEstudianteService{
    private Api_Url='http://localhost:8085/informeEstudiante/informe'


    constructor(){

    }

   async informeEstudiante(datos:any){
      try {
         const response= await axios.post(this.Api_Url,datos,{
            headers:{'Content-Type':'application/json'}
         })
          if(response.data){
            //guardamos en el localStorage
            localStorage.setItem('estudiante',JSON.stringify(response.data))
          }
         return response.data
      } catch (error) {
        console.error('Error en la Solicitud',error)
        throw error
      }
   }
    obtenerDatosLocalStorage(){
      const datos=localStorage.getItem('estudiante')
      return datos ? JSON.parse(datos):null
    }
}