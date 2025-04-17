import { Component, OnInit,Input } from '@angular/core';
import {IonicModule,ModalController}from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonList,IonItem,IonLabel,IonIcon} from '@ionic/angular/standalone'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-modal-archivos-enviados',
  templateUrl: './modal-archivos-enviados.component.html',
  styleUrls: ['./modal-archivos-enviados.component.scss'],
  standalone: true,
  imports:[CommonModule,IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonList,IonItem,IonLabel,IonIcon,FormsModule],
})
export class ModalArchivosEnviadosComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { 
    addIcons({closeOutline})
  }
  @Input() informes:any[]=[]
  @Input() estudiante:string=''
  ngOnInit() {}
  //Funcion para cerrar el modal 
  dismiss(){
    this.modalCtrl.dismiss()
  }
}
