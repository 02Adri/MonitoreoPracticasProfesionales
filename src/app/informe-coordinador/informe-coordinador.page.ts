import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton } from '@ionic/angular/standalone';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { loginCoordinadorService } from '../services/InicioCoordinador';
@Component({
  selector: 'app-informe-coordinador',
  templateUrl: './informe-coordinador.page.html',
  styleUrls: ['./informe-coordinador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonButton]
})
export class InformeCoordinadorPage implements OnInit {

  constructor(private inicioCoordinador:loginCoordinadorService) {
    addIcons({chevronBackOutline})
   }
   private coordinador=this.inicioCoordinador.obtenerDatosLocalStorage()
    coordinadores:any=null
  ngOnInit() {
    this.obtenerDatosCoordinador()
  }
   //obtener datos del coordinador
   obtenerDatosCoordinador(){
      if(this.coordinador){
        this.coordinadores=this.coordinador
        console.log('Datos del Coordinador enviados correctamente',this.coordinadores)
      }
   }
}
