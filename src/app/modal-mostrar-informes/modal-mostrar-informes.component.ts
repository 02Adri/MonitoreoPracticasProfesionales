import { Component, OnInit,Input } from '@angular/core';
import { loginEstudianteService } from '../services/InicioEstudiante';
import{ ModalController,IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonButtons,IonItem,IonList,IonLabel,IonIcon } from '@ionic/angular/standalone';
@Component({
  selector: 'app-modal-mostrar-informes',
  templateUrl: './modal-mostrar-informes.component.html',
  styleUrls: ['./modal-mostrar-informes.component.scss'],
  standalone: true,
  imports:[CommonModule,IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonButtons,IonicModule,IonItem,IonList,IonLabel,IonIcon]
})
export class ModalMostrarInformesComponent  implements OnInit {
  //variables para el modal
  private datosGuardados=this.loginEs.obtenerDatosLocalStorage()
  @Input() estudiante:any=this.datosGuardados;
   informes:any[]=[];
  constructor(private loginEs:loginEstudianteService,private modalController:ModalController) { }

  ngOnInit() {}
  ionViewWillEnter(){
    this.mostrarArchivos();
  }
    //Mostrar los archivos en el modal
    mostrarArchivos(){
      const key=`Informes_${this.estudiante.Estudiante.Correo}`;
      this.informes=JSON.parse(localStorage.getItem(key) || '[]');
    }
    //Cerrar el modal
    cerrarModal(){
      this.modalController.dismiss();
    }
}
