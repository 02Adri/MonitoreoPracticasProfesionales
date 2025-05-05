import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonItem,IonLabel,IonInput,IonButton,IonIcon } from '@ionic/angular/standalone';
import {callOutline, cardOutline, chevronBackOutline, mailOutline, personOutline, ribbonOutline, schoolOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { InstitucionService } from '../services/InstitucionService';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-institucion',
  templateUrl: './registro-institucion.page.html',
  styleUrls: ['./registro-institucion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReactiveFormsModule,IonButtons,IonBackButton,IonItem,IonLabel,IonInput,IonButton,IonIcon]
})
export class RegistroInstitucionPage implements OnInit {
   registroForm!:FormGroup
  constructor(private fb:FormBuilder,private institucionService:InstitucionService) {
    addIcons({chevronBackOutline,personOutline,callOutline,cardOutline,mailOutline,ribbonOutline,schoolOutline})
   }

  ngOnInit() {
   this.registroForm=this.fb.group({
     Nombres_Apellidos:['',Validators.required],
     Nombre_Institucion:['',Validators.required],
     Profesion:['',Validators.required],
     Cedula:['',Validators.required],
     Telefono:['', Validators.required],
     Correo:['',[Validators.required,Validators.email]]
   })
  }
   async onSubmit(){
    if(this.registroForm.valid){
         try {
             const response=await this.institucionService.registroInstitucion(this.registroForm.value)
             Swal.fire({
              title:'Registro Exitoso',
              text:'La Institucion se ha registrado Correctamente',
              icon:'success',
              confirmButtonText:'OK',
              scrollbarPadding:false,
              heightAuto:false,
              customClass:{
                popup:'custom-alert',
              },
              backdrop:true
             })
             console.log('Repuesta Api:', response)
             this.registroForm.reset()
         } catch (error) {
             Swal.fire({
                       title:'Error',
                       text:'No se pudo registrar al Estudiante',
                       icon:'error',
                       confirmButtonText:'Intentar de nuevo',
                       scrollbarPadding:false,
                       heightAuto:false,
                       customClass:{
                         popup:'custom-alert'
                       },
                       backdrop:true
                      })
         }
    }else{
      Swal.fire({
                title:'Error',
                text:'Complete todos los campos',
                icon:'error',
                confirmButtonText:'Intentar de nuevo',
                scrollbarPadding:false,
                heightAuto:false,
                customClass:{
                  popup:'custom-alert'
                },
                backdrop:true
               })
    }
   }
   get Nombres_Apellidos(){
     return this.registroForm?.get('Nombres_Apellidos')
   }
   get Nombre_Institucion(){
    return this.registroForm?.get('Nombre_Institucion')
  }
  get Profesion(){
    return this.registroForm?.get('Profesion')
  }
  get Cedula(){
    return this.registroForm?.get('Cedula')
  }
  get Telefono(){
    return this.registroForm?.get('Telefono')
  } 
  get Correo(){
    return this.registroForm?.get('Correo')
  }
}
