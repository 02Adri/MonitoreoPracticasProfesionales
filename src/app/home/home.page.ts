import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonIcon} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import{heart,happy,personAddOutline,personCircleOutline,peopleCircleOutline} from 'ionicons/icons'
import { Router } from '@angular/router';
import  Swal  from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonIcon],
})
export class HomePage {
  constructor(private router:Router) {
    addIcons({heart,happy,personAddOutline,personCircleOutline,peopleCircleOutline})
  }

  
 

 
 async  loginNavegacionCoordinador(){
  Swal.fire({
    title:'¿Deseas Iniciar Sesión en la sección de Coordinador?',
    text:'Serás enviado a la página de Iniciar Sesión del Coordinador',
    icon:'question',
    showCancelButton:true,
    confirmButtonText:'Si deseo Continuar',
    cancelButtonText:'No, Cancelar',
    scrollbarPadding:false,
    heightAuto:false,
    customClass:{
      popup:'custom-alert',
    },
    backdrop:true
  }).then((result)=>{
    if(result.isConfirmed){
      this.router.navigate(['/login-coordinador'])
    }
  })
 }
   async loginNavegacionEstudiante(){
    Swal.fire({
      title:'¿Deseas Iniciar Sesión en la sección de Estudiante ?',
      text:'Serás dirigido a la página de Iniciar Sección de Estudiante',
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Si, deseo continuar',
      cancelButtonText:'No, Cancelar',
      scrollbarPadding:false,
      heightAuto:false,
      customClass:{
        popup:'custom-alert',
      },
      backdrop:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/login-estudiante'])
      }
    })
   }
   async loginNavegacionInstitucion(){
    Swal.fire({
      title:'¿Deseas Iniciar Sesión en la sección de Institución?',
      text:'Serás dirigido a la página de iniciar sesión de institución',
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Si,deseo Continuar',
      cancelButtonText:'No, cancelar',
      scrollbarPadding:false,
      heightAuto:false,
      customClass:{
        popup:'custom-alert',
      },
      backdrop:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/login-institucion'])
      }
    })
   }
}
