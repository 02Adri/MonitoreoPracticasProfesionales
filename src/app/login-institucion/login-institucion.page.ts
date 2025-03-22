import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,Validator,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonBackButton,IonButtons,IonItem,IonLabel,IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, peopleCircleOutline, personAddOutline, personCircleOutline } from 'ionicons/icons';
import Swal from 'sweetalert2';
import { loginInstitucionService } from '../services/InicioInstitucion'; 
@Component({
  selector: 'app-login-institucion',
  templateUrl: './login-institucion.page.html',
  styleUrls: ['./login-institucion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReactiveFormsModule,IonButton,IonBackButton,IonButtons,IonItem,IonLabel,IonInput]
})
export class LoginInstitucionPage implements OnInit {
     registroForm!:FormGroup
  constructor(private router:Router,private fb:FormBuilder, private loginIS:loginInstitucionService) {
    addIcons({personAddOutline,personCircleOutline,peopleCircleOutline,chevronBackOutline})
   }

  ngOnInit() {
    this.registroForm=this.fb.group({
      Nombres_Apellidos:["",Validators.required],
      Correo:["",[Validators.required,Validators.email]]
    })
  }
   async onSubmit(){
       
           try {
            if(this.registroForm.valid){
              console.log("📤 Enviando datos al servicio",this.registroForm.value)
              const response=await this.loginIS.loginInstitucion(this.registroForm.value)
              console.log("✅ Usuario autenticado:",response)
               Swal.fire({
                title:'¡Registro Exitoso!',
                text:`Te has registrado Correctamente en la Institución ${response.Institucion.Nombres_Apellidos}`,
                icon:'success',
                confirmButtonText:'OK',
                scrollbarPadding:false,
                heightAuto:false,
                customClass:{
                  popup:'custom-alert',
                },
                backdrop:true
               }).then((result)=>{
                if (result.isConfirmed){
                  this.router.navigate(['/informe-institucion'])
                }
               })
               console.log('Repuesta de la Api:', response) 
               this.registroForm.reset()

            }else{
               Swal.fire({
                title:'Error',
                text:'Es necesario completar todos los campos',
                icon:'error',
                cancelButtonText:'Intentar de nuevo',
                scrollbarPadding:false,
                heightAuto:false,
                customClass:{
                  popup:'custom-alert',
                },
                backdrop:true
               })
            }
              
           } catch (error) {
              Swal.fire({
                title:'Error',
                text:'El usuario de la institución no se encuentra registrado',
                icon:'error',
                cancelButtonText:'Intentar de nuevo',
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
    return this.registroForm?.get('Nombres_Apellidos')
  }

  get Correo(){
    return this.registroForm?.get('Correo')
  }
}

