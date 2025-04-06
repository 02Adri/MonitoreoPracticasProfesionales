import { Component, OnInit,Input } from '@angular/core';
import { carreraService } from '../services/CarreraService';
import {ModalController,IonicModule} from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon} from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import{loginEstudianteService} from '../services/InicioEstudiante'
@Component({
  selector: 'app-modal-carrera-estudiantes',
  templateUrl: './modal-carrera-estudiantes.component.html',
  styleUrls: ['./modal-carrera-estudiantes.component.scss'],
  standalone: true,
  imports:[IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon,CommonModule]
})
export class ModalCarreraEstudiantesComponent  implements OnInit {
     estudiantes:any[]=[]
     carrera:string=''
      perfilImg:string|null=null
      defaultImg:string='assets/img/perfil-removebg-preview.png'
  constructor(private caService:carreraService,private modalctrl:ModalController,private loginEs:loginEstudianteService) {
    addIcons({close})
   }

  ngOnInit() {
     this.mostrarCarrera()
    this.mostrarImagen()
  }
  //Mostrar los estudiantes de la carrera seleccionada
   mostrarCarrera(){
    this.carrera=localStorage.getItem('selectedCarrera')|| '';
    if(this.carrera){
     this.caService.getEstudiantes(this.carrera).then((data:any[])=>{
       this.estudiantes=data
     }).catch(error=>{
       console.error('Error al cargar la pagina de estudiantes',error)
     })
    }
   }
   //mostrar imagen de estudiante
    async mostrarImagen(){
      try {
        this.carrera=localStorage.getItem('selectedCarrera')|| '';
       const estudianteData= await this.caService.getEstudiantes(this.carrera)
       
       this.estudiantes=estudianteData.map((est:any)=>{
        const correo=est.Estudiante?.Correo || est.Correo
        const imagenGuardada=localStorage.getItem(`perfilImg_${correo}`)
        return{
          ...est,
          imagen:imagenGuardada || this.defaultImg
        }
       })
        
      } catch (error) {
        console.error('Error al cargar la imagen',error)
      }
      
     }
    dismiss(){
      this.modalctrl.dismiss()
    }
}
