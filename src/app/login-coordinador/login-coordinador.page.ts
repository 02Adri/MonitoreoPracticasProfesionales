import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonBackButton,IonButtons,IonLabel,IonItem,IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, peopleCircleOutline,personAddOutline,personCircleOutline } from 'ionicons/icons';
import Swal from 'sweetalert2';
import { loginCoordinadorService } from '../services/InicioCoordinador';
@Component({
  selector: 'app-login-coordinador',
  templateUrl: './login-coordinador.page.html',
  styleUrls: ['./login-coordinador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,IonBackButton,IonButtons,ReactiveFormsModule,IonLabel,IonInput,IonItem]
})
export class LoginCoordinadorPage implements OnInit {
    registroForm!:FormGroup
  constructor(private router:Router, private fb:FormBuilder,private loginCS:loginCoordinadorService){ 
    addIcons({personAddOutline,personCircleOutline,peopleCircleOutline,chevronBackOutline})
  }

  ngOnInit() {
    this.registroForm=this.fb.group({
      Nombres_Apellidos:['',Validators.required],
      Correo:['',[Validators.required,Validators.email]]
    })
  }
   

    //Enviar Repuesta
    async onSubmit(){
        if(this.registroForm.valid){
          try {
            console.log("📤 Enviando datos al servicio",this.registroForm.value)
            const response=await this.loginCS.loginCoordinador(this.registroForm.value)
             console.log("✅ Usuario autenticado:",response)
            Swal.fire({
              title:'Iniciar Sesión Exitoso',
              text:`El Coordinador ha iniciado sesión correctamente,Bienvenido o Bienvenida ${response.Coordinador.Nombres_Apellidos}!`,
              icon:"success",
              confirmButtonText:'OK',
              scrollbarPadding:false,
              heightAuto:false,
              customClass:{
                popup:'custom-alert',
              },
              backdrop:true
            }).then((result)=>{
                if(result.isConfirmed){
                  this.router.navigate(['/informe-coordinador'])
                }
            })
           
            this.registroForm.reset()
          } catch (error) {
             Swal.fire({
              title:'Error',
              text:'No se pudo iniciar sesión con el coordinador!',
              icon:'error',
              cancelButtonText:'Intentar de Nuevo',
              scrollbarPadding:false,
              heightAuto:false,
              customClass:{
                popup:'custom-alert',

              },
              backdrop:true
             })
          }
        }else{
          Swal.fire({
            title:'Error',
            text:'Complete los Campos son obligatorios',
            icon:'error',
            cancelButtonText:'intentar de nuevo',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
              popup:'custom-alert',
            },
            backdrop:true
          })
         }
    }

    get Nombres_Apellidos(){
      return this.registroForm?.get('Nombres_Apellidos');
    }
    get Correo(){
      return this.registroForm?.get('Correo')
    }
}
