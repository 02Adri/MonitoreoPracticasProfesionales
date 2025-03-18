import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,FormBuilder,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonIcon,IonBackButton,IonButtons,IonItem,IonLabel,IonInput} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, peopleCircleOutline, personAddOutline, personCircleOutline } from 'ionicons/icons';
import Swal from 'sweetalert2';
import {loginEstudianteService} from '../services/InicioEstudiante'
@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.page.html',
  styleUrls: ['./login-estudiante.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReactiveFormsModule,IonButton,IonIcon,IonBackButton,IonButtons,IonItem,IonInput,IonLabel]
})
export class LoginEstudiantePage implements OnInit {
   registroForm!:FormGroup
  constructor(private router:Router,private fb:FormBuilder,private loginES:loginEstudianteService) {
    addIcons({personAddOutline,personCircleOutline,peopleCircleOutline,chevronBackOutline})
   }

  ngOnInit() {
    this.registroForm=this.fb.group({
        Nombres_Apellidos:["",Validators.required],
        Correo:["",[Validators.required,Validators.email]]
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
     async onSubmit(){
      if (this.registroForm.valid) {
      try {
      console.log("📤 Enviando datos al servicio:", this.registroForm.value);
    
        const usuario = await this.loginES.loginEstudiante(this.registroForm.value);
        
        console.log("✅ Usuario autenticado:",usuario);
       
        // Mostrar alerta de éxito
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: `¡El estudiante ha iniciado sesión correctamente,Bienvenida o Bienvenido, ${usuario.Estudiante.Nombres_Apellidos}!`,
          icon: "success",
          confirmButtonText: "Ok",
          scrollbarPadding: false,
          heightAuto: false,
          customClass: {
            popup: "custom-alert"
          },
          backdrop: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/hora-entrada-salida-estudiante']);
          }
        });
      
        
        this.registroForm.reset();
      }catch (error) {
        console.error("❌ Error en el inicio de sesión:", error);
    
        Swal.fire({
          title: "Error",
          text: "Error al iniciar sesion con el estudiante",
          icon: "error",
          cancelButtonText: "Intentar de nuevo",
          scrollbarPadding: false,
          heightAuto: false,
          customClass: {
            popup: "custom-alert"
          },
          backdrop: true
        });
      }
    
      }else{
        Swal.fire({
          title: "Error",
          text: "Error al iniciar sesion con el estudiante campos invalidos",
          icon: "error",
          cancelButtonText: "Intentar de nuevo",
          scrollbarPadding: false,
          heightAuto: false,
          customClass: {
            popup: "custom-alert"
          },
          backdrop: true
        });
      }
        
     }


     get Nombres_Apellidos(){
      return this.registroForm?.get('Nombres_Apellidos')
     }
     get Correo(){
      return this.registroForm?.get('Correo')
     }
}
