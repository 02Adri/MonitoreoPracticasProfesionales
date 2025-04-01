import { Component, OnInit,Input } from '@angular/core';
import { loginEstudianteService } from '../services/InicioEstudiante';
import{ ModalController,IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonButtons,IonItem,IonList,IonLabel,IonIcon } from '@ionic/angular/standalone';
import Swal from 'sweetalert2';
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
    //Se utilizara para cambiar el archivo dentro del modal
    guardarArchivos(){
     const key=`Informes_${this.estudiante.Estudiante.Correo}`;
     localStorage.setItem(key,JSON.stringify(this.informes));
    }
    //Función de cambiar archivos
    cambiarArchivos(index:number){
      Swal.fire({
        title:'Seleccionar nuevo Archivo',
        html:'<input type="file" id="archivoInput" class="swal2-input">',
        showCancelButton:true,
        confirmButtonText:'Guardar',
        cancelButtonText:'Cancelar',
         scrollbarPadding:false,
         heightAuto:false,
         customClass:{
          popup:'custom-alert',
         },
         backdrop:true,
         preConfirm:()=>{
          const inputElement=document.getElementById('archivoInput') as HTMLInputElement;
          if(!inputElement.files || inputElement.files.length===0){
            Swal.showValidationMessage('Por favor selecciona un archivo');
            return false;
          }
          const archivo=inputElement.files[0];//obtener el archivo seleccionado
          const extension=archivo.name.split('.').pop()//extrae la extension
          return {
            nombre:archivo.name,
            //tipo:`.${extension}`,//solo guarda la extension no el mime
          }
         }
      }).then((result)=>{
        if(result.isConfirmed && result.value ){
          this.informes[index]={nombre:result.value.nombre,tipo:result.value.tipo};
          this.informes=[...this.informes]//actualiza en tiempo real
          this.guardarArchivos();
          Swal.fire({
            title:'¡Archivo cambiado!',
            text:'Archivo cambiado correctamente',
            icon:'success',
            confirmButtonText:'De acuerdo',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
             popup:'custom-alert',
            },
            backdrop:true

          })
        } 
      })
    }
    //eliminar archivos
    eliminarArchivo(index:number){
       Swal.fire({
        title:'¿Eliminar Archivo?',
        text:'Esta acción no se puede deshacer',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar',
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert',
        },
        backdrop:true,
       }).then((result)=>{
        if(result.isConfirmed){
          this.informes.splice(index,1);
          this.informes=[...this.informes];//actualiza en tiempo real
          this.guardarArchivos();
          Swal.fire({
            title:'Eliminar',
            text:'Archivo eliminado correctamente',
            icon:'success',
            confirmButtonText:'De acuerdo',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
             popup:'custom-alert',
            },
            backdrop:true

          })
        }
       })
    }
    //Cerrar el modal
    cerrarModal(){
      this.modalController.dismiss();
    }
}
