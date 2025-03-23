import { Component, OnInit,Input } from '@angular/core';
import {ModalController,IonicModule} from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonIcon,IonContent,IonCard,IonCardContent, IonCardHeader, IonCardTitle }from '@ionic/angular/standalone'
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-excel',
  templateUrl: './modal-excel.component.html',
  styleUrls: ['./modal-excel.component.scss'],
  standalone: true,
  imports:[IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonIcon,IonContent,IonCard,IonCardContent,IonCardHeader,IonCardTitle,CommonModule,IonicModule]
})
export class ModalExcelComponent  implements OnInit {
   
  @Input() datosPrevios:any[]=[]
  constructor(private modalCtrl:ModalController) { 
    addIcons({closeOutline})
  }

  ngOnInit() {}
  cerrarModal(){  
    this.modalCtrl.dismiss()
  }

}
