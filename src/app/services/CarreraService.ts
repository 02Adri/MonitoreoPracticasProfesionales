import {Injectable} from '@angular/core'
import axios from 'axios'
import { response } from 'express'

@Injectable({
    providedIn:'root'
})

export class carreraService{
    private apiUrl='http://localhost:8085/ApiMostrarCarrera'

    constructor(){}
    //obtener las carreras unicas
    getCarreras(){
        return axios.get(`${this.apiUrl}/carreras`)
        .then(response=>response.data)
        .catch(error=>{
            console.error('Error al obtener las carreras', error)
            throw error;
        })

    }
    getEstudiantes(carrera:string){
        return axios.get(`${this.apiUrl}/estudiantes/${carrera}`)
        .then(response=>response.data)
        .catch(error=>{
            console.error('No se puede encontrar los estudiantes', error)
            throw error
        })
    }
}
