import axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class loginEstudianteService{
    private Api_Url='http://localhost:8085/ApiLoginEstudiante/login'
    private Usuario:{Nombres_Apellidos:string,Correo:string}|null=null
    
    constructor(){}
    
  async loginEstudiante(datos:any ){
    try {
      const response= await axios.post(this.Api_Url,datos,{
         headers:{'Content-Type':'application/json'}
      })
      if (response.data) {
        // Guardar los datos en localStorage
        localStorage.setItem('estudiante', JSON.stringify(response.data));
      }
      return response.data
   } catch (error) {
     console.error('Error en la Solicitud',error)
     throw error
   }
}
  

  //funcion para obtener los datos del Estudiante
  async obtenerDatosUsuario(Correo:string){
    try {
      // ✅ Validación antes de enviar la petición
      if (!Correo || Correo.trim() === '') {
          throw new Error('❌ El correo es inválido. No se puede hacer la consulta.');
      }

      const response = await axios.get(`${this.Api_Url}?Correo=${Correo}`);
     
      return response.data;
  } catch (error) {
      console.error('❌ Error al obtener los datos del estudiante:', error);
      throw error;
  }

  }
  obtenerDatosLocalStorage(){
    const datos=localStorage.getItem('estudiante')
    return datos ? JSON.parse(datos):null
  }
}