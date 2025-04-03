import { Component, OnInit, } from '@angular/core';
import { carreraService } from '../services/CarreraService';
import { ModalCarreraEstudiantesComponent } from '../modal-carrera-estudiantes/modal-carrera-estudiantes.component';
import {ModalController,IonicModule} from '@ionic/angular'
import {IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonIcon,IonContent,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-carrera',
  templateUrl: './modal-carrera.component.html',
  styleUrls: ['./modal-carrera.component.scss'],
  standalone: true,
  imports:[IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonIcon,IonContent,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,CommonModule]
})
export class ModalCarreraComponent  implements OnInit {
  carreras:string[]=[]

  constructor(private modalctrl:ModalController,private caService:carreraService) { 
    addIcons({close})
  }

  ngOnInit() {
    this.caService.getCarreras().then((data:string[])=>{
      this.carreras=data
    }).catch(error=>{
      console.error('Error al cargar las carreras',error)
    })
  }
   //abrir modal de Estudiante Carreras
    async openEstudiantesModal(carrera:string){
      //Almacenar las carreras seleccionada en localStorage para el modal de estudiantes
      localStorage.setItem('selectedCarrera',carrera)
      const modal=await this.modalctrl.create({
        component:ModalCarreraEstudiantesComponent,
        componentProps:{carrera}
      })
      return await modal.present()
    }
    dismiss(){
      this.modalctrl.dismiss()
    }
}
