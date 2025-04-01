import { Component, Input, OnInit } from '@angular/core';
import { loginEstudianteService } from '../services/InicioEstudiante'; 
import Swal from 'sweetalert2';
import {ModalController,IonicModule} from '@ionic/angular'
import {IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonButtons} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-subir-informes',
  templateUrl: './modal-subir-informes.component.html',
  styleUrls: ['./modal-subir-informes.component.scss'],
  standalone: true,
  imports:[IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonButtons,CommonModule,IonicModule]
})
export class ModalSubirInformesComponent  implements OnInit {
   //variables para el modal
  private datosGuardados=this.loginEs.obtenerDatosLocalStorage()
   @Input() estudiante:any=this.datosGuardados;
   archivos:{nombre:string; archivo:File}[]=[];
  constructor(private loginEs:loginEstudianteService, private modalController:ModalController ) { }

  ngOnInit() {}
    //Manejar el evento de subida de archivos
    seleccionarArchivos(event:any) {
      const files=event.target.files;
      if (files.length>0)
      {
        for(let i=0; i<files.length; i++){
              this.archivos.push({
                nombre:files[i].name,
                archivo:files[i]
              })
        }
      }
     
    }

    //Guardar los archivos en el localStorage
    subirArchivos(){
      const key=`Informes_${this.estudiante.Estudiante.Correo}`;
      let informesGuardados=JSON.parse(localStorage.getItem(key) || '[]');
      informesGuardados=[...informesGuardados,...this.archivos];
      localStorage.setItem(key,JSON.stringify(informesGuardados));

      Swal.fire({
        title:'¡Subir Archivos!',
        text:'Archivos subidos correctamente',
        icon:'success',
        confirmButtonText:'Aceptar',
        confirmButtonColor:'#3085d6',
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert',
        },
        backdrop:true,
      })
      this.modalController.dismiss();
    }
    cerrarModal(){
      this.modalController.dismiss();
    }
}
