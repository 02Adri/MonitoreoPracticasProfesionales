import axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class loginInstitucionService{
    private Api_Url='http://localhost:8085/ApiLoginInstitucion/login'

    constructor(){}

    async loginInstitucion(datos:any){
         try {
            const response=await axios.post(this.Api_Url,datos,{
                headers:{'Content-Type':'application/json'}
            })
             if(response.data){
                //guardamos en el localStorage 
                localStorage.setItem('institucion',JSON.stringify(response.data))
             }
            return response.data
         } catch (error) {
             console.error('Error en la solicitud',error)
             throw error
         } 
    }
    async obtenerDatosLocalStorage(){
        const datos=localStorage.getItem('institucion')
        return datos ? JSON.parse(datos):null
    }
}