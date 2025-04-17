import { Component, OnInit } from '@angular/core';
import {IonToolbar,IonTitle,IonHeader,IonContent,IonItem,IonLabel,IonInput,IonButton, IonButtons,IonIcon } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ModalController,IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modal-correo',
  templateUrl: './modal-correo.component.html',
  styleUrls: ['./modal-correo.component.scss'],
  standalone: true,
  imports:[IonToolbar,IonTitle,IonHeader,IonContent,IonItem,IonLabel,IonInput,IonButton,IonButtons,IonIcon,CommonModule,IonicModule,FormsModule]
})
export class ModalCorreoComponent  implements OnInit {
    correo:string=''
  constructor(private modalCtrl:ModalController) { 
    addIcons({closeOutline})
  }

  ngOnInit() {}
  //cerrar el modal
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  //enviar Correo
  enviarCorreo(){
    if(!this.correo || !/\S+@\S+\.\S+/.test(this.correo)){
      alert('Por favor ingrese un correo valido')
      return;
    }
    this.modalCtrl.dismiss(this.correo);
  }

}
