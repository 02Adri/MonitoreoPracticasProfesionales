import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonIcon, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import{heart,happy,personAddOutline,personCircleOutline,peopleCircleOutline,logInOutline} from 'ionicons/icons'
import { Router } from '@angular/router';
import  Swal  from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonFooter, IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonIcon,CommonModule],
})
export class HomePage {
  constructor(private router:Router) {
    addIcons({heart,happy,personAddOutline,personCircleOutline,peopleCircleOutline,logInOutline})
  }

  //Muestra el desplegable de login
  showLogin=false;
  //Mostrar el desplegable de registro
  showRegister=false;
 
  //Funciones de navegación
  toggleDropdown(type:string){
    if(type ==='login'){
      this.showLogin=!this.showLogin;
      this.showRegister=false;
    }else if(type ==='register'){
      this.showRegister=!this.showRegister;
      this.showLogin=false;
    }
  }
 //Métodos de navegacion para iniciar sesión
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



   //Metodos de navegación para registrarse
     //funcion de alert registro coordinador
         async confirmarNavegacionCoordinador(){
        
          Swal.fire({
            title:'¿Deseas Registrarte?',
            text:'Serás dirigido a la página de Registro Coordinador',
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Si,Continuar',
            cancelButtonText:'No,cancelar',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
              popup:'custom-alert',
        
            },
            backdrop:true,
          }).then((result)=>{
            if(result.isConfirmed){
              this.router.navigate(['/registro-coordinador'])
            }
          })
         }
     //Creamos nuestra funcion de Alerta paraa registro estudiantes
         async confirmarNavegacionEstudiantil(){
            //Creamos nuestro alert para navegar a la siguiente pagina
            Swal.fire({
             title:'¿Deseas Registrarte?',
             text:'Serás dirigido a la página de registro estudiantil',
             icon:'question',
             showCancelButton:true,
             confirmButtonText:'Si,Continuar',
             cancelButtonText:'No,cancelar',
             scrollbarPadding:false,//evita los desplazamiento en moviles
             heightAuto:false,//Evita que el alert se deforme en pantallas pequeñas
             customClass:{
               popup:'custom-alert',//clases personalizadas para el diseño
             },
             backdrop:true,//hace que el fondo sea opaco
             
            }).then((result)=>{
             if(result.isConfirmed){
               this.router.navigate(['/registro-estudiantil'])
             }
            });
       
        }
         //funcion de alert de registro Institucion
          async confirmarNavegacionInstitucion(){
            Swal.fire({
              title:'¿Deseas Registrarte?',
              text:'Serás dirigido a la página de Registro de la Institución',
              icon:'question',
              showCancelButton:true,
              confirmButtonText:'Si,Continuar',
              cancelButtonText:'No,Cancelar',
              scrollbarPadding:false,
              heightAuto:false,
              customClass:{
                popup:'custom-alert',
              },
              backdrop:true
            }).then((result)=>{
              if(result.isConfirmed){
                this.router.navigate(['/registro-institucion'])
              }
            })
           }
           
        
}
