
import {Injectable} from '@angular/core'
import axios from 'axios'

@Injectable({
	providedIn:'root'
})

export class verificarCorreo{
	private apiUrl='http://localhost:8085/ApiCorreoCoordinador'

	constructor(){}

	getCorreo(correo:string){
		return axios.get(`${this.apiUrl}/${correo}`)
	    .then(response=>response.data)
		.catch(error=>{
			console.error('No se encuentran el correo del coordinador',error)
			throw error;
		})
	}
}