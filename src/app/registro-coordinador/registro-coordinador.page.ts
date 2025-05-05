import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup, FormBuilder, Validators,ReactiveFormsModule} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonItem,IonLabel,IonInput,IonButton,IonIcon} from '@ionic/angular/standalone';
 import {callOutline, cardOutline, chevronBackOutline, mailOutline, personOutline, schoolOutline}from 'ionicons/icons'
 import { addIcons } from 'ionicons';
 import Swal from 'sweetalert2';
import { CoordinadorService } from '../services/CoordinadorService';
@Component({
  selector: 'app-registro-coordinador',
  templateUrl: './registro-coordinador.page.html',
  styleUrls: ['./registro-coordinador.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReactiveFormsModule,IonButtons,IonBackButton,IonItem,IonLabel,IonInput,IonButton,IonIcon]
})
export class RegistroCoordinadorPage implements OnInit {
    registroForm!:FormGroup
  constructor(private fb:FormBuilder, private coordinadorService:CoordinadorService) { 
    addIcons({chevronBackOutline,personOutline,mailOutline,callOutline,cardOutline,schoolOutline})
  }

  ngOnInit() {
    this.registroForm=this.fb.group({
      Nombres_Apellidos:['',Validators.required],
      Profesion:['',Validators.required],
      Telefono:['',Validators.required],
      Correo:['',[Validators.required,Validators.email]],
      Carnet:['',Validators.required],
      
    })
  }
 // Funcion para registro Coordinador
 async onSubmit(){
    if (this.registroForm.valid){
      try {
        const response=await this.coordinadorService.registroCoordinador(this.registroForm.value)
        Swal.fire({
          title:'Registro Exitoso',
          text:'El Coordinador se ha registrado Correctamente',
          icon:'success',
          confirmButtonText:'OK',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
            popup:'custom-alert',
          },
          backdrop:true
        })
        console.log('Repuesta de Api :',response)
        this.registroForm.reset()
      } catch (error) {
        Swal.fire({
                  title:'Error',
                  text:'No se pudo registrar al Coordinador',
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
get Profesion(){
  return this.registroForm?.get('Profesion')
}

get Telefono(){
  return this.registroForm?.get('Telefono')
}
get Correo(){
  return this.registroForm?.get('Correo')
}
get Carnet(){
  return this.registroForm?.get('Carnet')
}
}
