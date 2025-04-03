import { Component, OnInit } from '@angular/core';
import { carreraService } from '../services/CarreraService';
import {ModalController,IonicModule} from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon} from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
@Component({
  selector: 'app-modal-carrera-estudiantes',
  templateUrl: './modal-carrera-estudiantes.component.html',
  styleUrls: ['./modal-carrera-estudiantes.component.scss'],
  standalone: true,
  imports:[IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon,CommonModule]
})
export class ModalCarreraEstudiantesComponent  implements OnInit {
     estudiantes:any[]=[]
     carrera:string=''
  constructor(private caService:carreraService,private modalctrl:ModalController) {
    addIcons({close})
   }

  ngOnInit() {
    this.carrera=localStorage.getItem('selectedCarrera')|| '';
     if(this.carrera){
      this.caService.getEstudiantes(this.carrera).then((data:any[])=>{
        this.estudiantes=data
      }).catch(error=>{
        console.error('Error al cargar la pagina de estudiantes',error)
      })
     }
  }
    dismiss(){
      this.modalctrl.dismiss()
    }
}
