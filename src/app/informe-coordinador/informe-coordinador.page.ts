import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton,IonMenu,IonApp,IonMenuButton } from '@ionic/angular/standalone';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { loginCoordinadorService } from '../services/InicioCoordinador';
import { ModalCarreraComponent } from '../modal-carrera/modal-carrera.component';
import {ModalController,IonicModule} from '@ionic/angular'
@Component({
  selector: 'app-informe-coordinador',
  templateUrl: './informe-coordinador.page.html',
  styleUrls: ['./informe-coordinador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonButton,IonMenu,IonApp,IonicModule,IonMenuButton]
})
export class InformeCoordinadorPage implements OnInit {

  constructor(private inicioCoordinador:loginCoordinadorService,private modalctrl:ModalController) {
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
   //mostrar modal de carreras
   async openModalCarreras(){
      const modal= await this.modalctrl.create({
        component:ModalCarreraComponent
      })
      return await modal.present()
   }
}
