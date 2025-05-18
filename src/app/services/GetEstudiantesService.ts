import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
    providedIn:'root'
})

export class getService{
   private apiUrl='http://localhost:8085/ApiMostrarCarrera/estudiantes'

    constructor(){
       
    }
    getEstudiantes(){
        return axios.get(`${this.apiUrl}`)
        .then(response=>response.data)
        .catch(error=>{
            console.error('No se pueden encontrar los estudiantes',error)
            throw error;
        })
    }
}

