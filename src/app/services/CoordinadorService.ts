import axios from 'axios'
import {Injectable} from '@angular/core'

@Injectable({
    providedIn:'root'
})

export class CoordinadorService{
    private Api_Url='http://localhost:8083/Coordinador'

    constructor(){}

    async registroCoordinador(datos:any){
      try {
        const response=await axios.post(this.Api_Url,datos,{
            headers:{'Content-Type':'application/json'}
        })
        return response.data
      } catch (error) {
         console.error('Error en la solicitud',error)
         throw error;
      }
    }
}