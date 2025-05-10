import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule,ToastController} from '@ionic/angular';
import { loginCoordinadorService } from '../services/InicioCoordinador';
import{IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonItem,IonLabel,IonInput,IonDatetime,IonTextarea,IonButton,IonList,IonListHeader,IonItemSliding,IonItemOptions,IonItemOption}from '@ionic/angular/standalone'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agendar-visitas',
  templateUrl: './agendar-visitas.component.html',
  styleUrls: ['./agendar-visitas.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonItem,IonLabel,IonInput,IonDatetime,IonTextarea,IonButton,IonList,IonListHeader,IonItemSliding,IonItemOptions,IonItemOption],
})
export class AgendarVisitasComponent  implements OnInit {
    //creamos nuestra visita
    visita={
      empresa:'',
      fecha:'',
      hora:'',
      notas:'',
      editando:false,
      index:-1
    }
    //creamos un array para almacenar las visitas
    visitas:any[]=[]
  constructor(private toastController:ToastController,private loginCtrl:loginCoordinadorService) { }
  private coordinador=this.loginCtrl.obtenerDatosLocalStorage()
  coordinadores:any=this.coordinador
   
  ngOnInit() {
    //cargar visitas al iniciar el componente
    this.guardarVisita()
  }
   //funcion para guardar visita
   guardarVisita(){
    const storedVisitas=localStorage.getItem(`visitas-${this.coordinadores.Coordinador.Nombres_Apellidos}`);
    this.visitas=storedVisitas ? JSON.parse(storedVisitas) : [];

    //programar recordatorios automáticos al cargar
    this.visitas.forEach(visita=>{
      this.programarRecordatorio(visita)
    })
   }

   //funcion para cargar visita
   cargarVisitas(){
    localStorage.setItem(`visitas-${this.coordinadores.Coordinador.Nombres_Apellidos}`,JSON.stringify(this.visitas))
   }
   //funcion para agendar visita
   agendarVisita(){
    if(this.visita.empresa && this.visita.fecha && this.visita.hora){
      if(this.visita.editando){
        this.visitas[this.visita.index]={...this.visita,editando:false,index:-1}
         Swal.fire({
          title:'Editar Cita',
          text:'¡Cita editada Correctamente!',
          icon:'success',
          confirmButtonText:'OK',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
            popup:'custom-alert'
          },
          backdrop:true
        })
      }else{
        const nuevaVisita={...this.visita}
        this.visitas.push(nuevaVisita)
        Swal.fire({
          title:'Agendar Cita',
          text:'¡Cita agendada Correctamente!',
          icon:'success',
          confirmButtonText:'OK',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
            popup:'custom-alert'
          },
          backdrop:true
        })
        this.programarRecordatorio(nuevaVisita)

      }
      this.cargarVisitas()
      this.visita = { empresa: '', fecha: '', hora: '', notas: '', editando: false, index: -1 };
  
    }else{
      this.presenToast('❌ Por favor completa todos los campos')
    }
   }
    
   //funcion para programar recordatorio
   programarRecordatorio(visita:any){
    const fechaHora=new Date (`${visita.fecha}T${visita.hora}`);
    const ahora =new Date();
    const tiempo=fechaHora.getTime()- ahora.getTime()
    if (tiempo>0){
      setTimeout(()=>{
        this.presenToast(`🔔 Recordatorio: visita a ${visita.empresa} ahora`)
      },tiempo)
    }
   }
   //funcion para mostrar mensaje del recordatorio mediante un toast
   async presenToast(message:string){
     const toast=await this.toastController.create({
      message,
      duration:3000,
      color:'primary',
      position:'top'
     })
     toast.present()
   }

   //Funcion para editar Vsita
   editarVisita(index:number){
    const v=this.visitas[index]
    this.visita={...v,editando:true,index}
   }
   eliminarVisita(index:number){
    this.visitas.splice(index,1)
    this.cargarVisitas()
    Swal.fire({
      title:'Eliminar Visita',
      text:'¡🗑️ Visita eliminada Correctamente!',
      icon:'success',
      confirmButtonText:'OK',
      scrollbarPadding:false,
      heightAuto:false,
      customClass:{
        popup:'custom-alert'
      },
      backdrop:true
    })
    
   }
   //Funcion para borrar Visitas
   borrarVisitas(){
     this.visitas=[]
     localStorage.removeItem(`visitas-${this.coordinadores.Coordinador.Nombres_Apellidos}`)
     Swal.fire({
      title:'Eliminar Todas las Visitas',
      text:'¡🗑️ Todas las Visitas eliminadas Correctamente!',
      icon:'success',
      confirmButtonText:'OK',
      scrollbarPadding:false,
      heightAuto:false,
      customClass:{
        popup:'custom-alert'
      },
      backdrop:true
    })
   }
}
