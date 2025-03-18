import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonItem,IonLabel,IonInput,IonSelect,IonSelectOption,IonButton } from '@ionic/angular/standalone';
import {chevronBackOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import axios from 'axios'
import Swal from 'sweetalert2';
import { EstudianteService } from '../services/EstudianteService';
@Component({
  selector: 'app-registro-estudiantil',
  templateUrl: './registro-estudiantil.page.html',
  styleUrls: ['./registro-estudiantil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,ReactiveFormsModule ,FormsModule,IonButtons,IonBackButton,IonItem,IonLabel,IonInput,IonSelect,IonSelectOption,IonButton]
})
export class RegistroEstudiantilPage implements OnInit {
     registroForm!:FormGroup;
     Carreras:string[]=['Ingeniería en Sistemas de la Información','Contaduría Pública y Finanzas','Adminstración de Empresas','Enfermería','Psicología','Veterinaría','Agroecología','Trabajo Social','Inglés'];

  constructor(private fb:FormBuilder,private estudianteService:EstudianteService) {
     addIcons({chevronBackOutline})
    
   }
   ngOnInit() {
    this.registroForm=this.fb.group({
      Nombres_Apellidos:['',Validators.required],
      Carnet:['',Validators.required],
      Carrera:['',Validators.required],
      Telefono:['',Validators.required],
      Correo:['',[Validators.required,Validators.email]],
      Anio_Academico:['',Validators.required],
     })
  }
   //Funcion registro Estudiante
   async onSubmit(){
    if (this.registroForm.valid){
      try {
        const response= await this.estudianteService.registroEstudiante(this.registroForm.value)
          Swal.fire({
            title:'Registro Exitoso',
            text:'El estudiante se ha registrado correctamete...',
            icon:'success',
            confirmButtonText:'OK',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
              popup:'custom-alert'
            },
            backdrop:true
          })
          console.log('Repuesta de Api :',response)
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
        text:'Por favor completa todos los campos',
        icon:'error',
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert'
        },
        backdrop:true
      })
    }
   }
   get Nombres_Apellidos() {
    return this.registroForm?.get('Nombres_Apellidos');
  }
  get Carnet(){
    return this.registroForm?.get('Carnet')
  }

  get Carrera(){
    return this.registroForm?.get('Carrera')
  }
  get Telefono(){
    return this.registroForm?.get('Telefono')
  }
  get Correo(){
    return this.registroForm?.get('Correo')
  }
  get Anio_Academico(){
    return this.registroForm?.get('Anio_Academico')
  }
 

}
