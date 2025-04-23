import { Component, OnInit,Input } from '@angular/core';
import { loginEstudianteService } from '../services/InicioEstudiante';
import{ ModalController,IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonButtons,IonItem,IonList,IonLabel,IonIcon } from '@ionic/angular/standalone';
import Swal from 'sweetalert2';
import * as EmailJS from 'emailjs-com'
import { loginCoordinadorService } from '../services/InicioCoordinador';
import { ModalCorreoComponent } from '../modal-correo/modal-correo.component';
import { verificarCorreo } from '../services/verificarCorreo';
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
   perfilImg:string|null=null
   defaultImg:string='assets/img/perfil-removebg-preview.png'
     private coordinador=this.loginCoordinador.obtenerDatosLocalStorage()
    @Input() coordinadores:any=null
  constructor(private loginEs:loginEstudianteService,private modalController:ModalController,private loginCoordinador:loginCoordinadorService,private vCorreo:verificarCorreo) { 
    //obtenemos los datos del estudiante desde el localStorage
    this.estudiante=this.loginEs.obtenerDatosLocalStorage()
    //obtenemos los datos del coordinador desde el localStorage
    //this.coordinadores=this.loginCoordinador.obtenerDatosLocalStorage()
     
   }

  ngOnInit() {}
  ionViewWillEnter(){
    this.mostrarArchivos();
    this.mostrarImagen();
  }
    //Mostrar los archivos en el modal
    mostrarArchivos(){
      const key=`Informes_${this.estudiante.Estudiante.Correo}`;
      this.informes=JSON.parse(localStorage.getItem(key) || '[]');
    }
    //mostrarImagen
    mostrarImagen(){
      const imagenGuardada=localStorage.getItem(`perfilImg_${this.estudiante.Estudiante.Correo}`)
      if(imagenGuardada){
        this.perfilImg=imagenGuardada;
      }else{
        this.perfilImg=null;
      }
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

    //Funcion para enviar informacion
    async enviarCorreo(informe:any){ 
       
       //obtener el correo desde el localStorage
       this.coordinadores=this.coordinador
       const modal=await this.modalController.create({
        component:ModalCorreoComponent,
        cssClass:'custom-alert',
       
       });
       await modal.present();
       const {data:correoCoordinador}= await modal.onDidDismiss();
       
          if(!correoCoordinador)return
          //verificamos si el Corrreo existe
          const correoGuardado= await this.vCorreo.getCorreo(correoCoordinador)
          if(!correoGuardado){
            Swal.fire({
              title:'Correo no encontrado',
              text:'El correo no se encuentra registrado',
              icon:'error',
              confirmButtonText:'De acuerdo',
              scrollbarPadding:false,
              heightAuto:false,
              customClass:{
               popup:'custom-alert',
              },
              backdrop:true
            })
            return
          }
       //Si el correo es valido, se procede a enviar el correo
       const templateParams={
        to_email:correoCoordinador,
        student_name:'Informe enviado desde la app',
        message:`Estimado Coordinador,
        \nSe ha enviado un informe del estudiante:${this.estudiante.Estudiante.Nombres_Apellidos}
        \nInforme:${informe.nombre}
        \n\nSaludos cordiales,`,
       }
       //Enviar el Correo atraves de EmaiJS
       EmailJS.send(
        'service_p1b0jci',
         'template_lqrat8f',
          templateParams,
          'FnZr__tdJQwu9hmoT'
       ).then((response)=>{
        Swal.fire({
          title:'¡Correo Enviado!',
          text:`El correo fue enviado correctamente`,
          icon:'success',
          confirmButtonText:'De acuerdo',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
           popup:'custom-alert',
          },
          backdrop:true
        })
       }).catch((error)=>{
        console.error('Error al enviar el correo:',error);
        Swal.fire({
          title:'Error',
          text:'No se pudo enviar el correo',
          icon:'error',
          confirmButtonText:'De acuerdo',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
           popup:'custom-alert',
          },
          backdrop:true
        })
       })
       //Guardamos informes en localStorage
       const informesGuardados=JSON.parse(localStorage.getItem('informesEnviados') || '[]');
        //creamos nuestra variable para acceder al estudiante
        const estudianteData={
          Nombres_Apellidos:this.estudiante?.Nombres_Apellidos || this.estudiante?.Estudiante?.Nombres_Apellidos || '',
          Correo:this.estudiante?.Correo || this.estudiante?.Estudiante?.Correo || '',
          Carnet:this.estudiante?.Carnet || this.estudiante?.Estudiante?.Carnet || ''
        }
       //Asegurarse que sea un Arrays
       const nuevosInformes=Array.isArray(informesGuardados) ? informesGuardados : [];
       console.log('Estudiante:',estudianteData);
       nuevosInformes.push({
         correoCoordinador: correoCoordinador,
          estudiante:estudianteData,
          informe:informe.nombre,
          tipo:informe.tipo,
          contenido:informe.contenido,//Es el contenido Base64
          fecha:new Date().toISOString(),
          leido:false,
       });
        localStorage.setItem('informesEnviados',JSON.stringify(nuevosInformes));
    }

   
}
