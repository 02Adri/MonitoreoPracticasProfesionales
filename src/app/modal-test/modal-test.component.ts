import { Component, OnInit,Input } from '@angular/core';
import {ModalController,IonicModule} from '@ionic/angular'
import { CommonModule } from '@angular/common';
import {IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonProgressBar,IonList,IonItem,IonIcon} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonProgressBar,IonList,IonItem,IonIcon]
})
export class ModalTestComponent  implements OnInit {
     @Input()  preguntas:any[]=[];
      @Input()  carrera:any ;

      indicePregunta=0;
      correctas=0;
      seleccion='';
  constructor(private modalCtrl:ModalController) {
    addIcons({closeCircleOutline})
   }
   ngOnInit() {}
    //funcion para seleccionar la posible respuesta
    seleccionar(opcion:string){
      this.seleccion=opcion;
    }
    //funcion para verificar si la respuesta es correcta o incorrecta
    siguiente(){
      if(this.seleccion===this.preguntas[this.indicePregunta].correcta){
        this.correctas++;
      }
      this.seleccion='';
      if(this.indicePregunta<this.preguntas.length-1){
        this.indicePregunta++;
      }else{
        this.cerrarModal()
      }
    }

    //Funcion para cerrar el modal
    cerrarModal(){
      this.modalCtrl.dismiss({
        correctas:this.correctas,
      })
    }
    porcentajeProgreso(){
      return (this.indicePregunta/this.preguntas.length)*100;
    }
  

}
