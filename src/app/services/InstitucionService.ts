import axios from 'axios'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn:'root'
})

export class InstitucionService{
     private Api_Url='http://localhost:8084/Institucion' 
     constructor(){}
    
     async registroInstitucion(datos:any){
        try {
            const response=await axios.post(this.Api_Url,datos,{
                headers:{'Content-Type':'application/json'}
            })
            return response.data
        } catch (error) {
             console.error('Error en la Solicitud',error)
             throw error;
        }
    }
}