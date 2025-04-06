import { Component, OnInit,Input } from '@angular/core';
import { carreraService } from '../services/CarreraService';
import {ModalController,IonicModule} from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon,IonSearchbar} from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close,alertCircleOutline } from 'ionicons/icons';
import{loginEstudianteService} from '../services/InicioEstudiante'
import {DomSanitizer,SafeHtml} from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-modal-carrera-estudiantes',
  templateUrl: './modal-carrera-estudiantes.component.html',
  styleUrls: ['./modal-carrera-estudiantes.component.scss'],
  standalone: true,
  imports:[IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon,CommonModule,IonSearchbar,FormsModule]
})
export class ModalCarreraEstudiantesComponent  implements OnInit {
     estudiantes:any[]=[]
     carrera:string=''
      perfilImg:string|null=null
      defaultImg:string='assets/img/perfil-removebg-preview.png'
      searchTerm:string=''
      estudiantesFiltrados:any[]=[]
  constructor(private caService:carreraService,private modalctrl:ModalController,private loginEs:loginEstudianteService,private sanitizer:DomSanitizer) {
    addIcons({close,alertCircleOutline})
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
       this.estudiantesFiltrados=this.estudiantes.map(est=>({
        ...est,
        nombreResaltado:this.getHighligtedName(est.Nombres_Apellidos,'')
       }))
        
      } catch (error) {
        console.error('Error al cargar la imagen',error)
      }
      
     }
    dismiss(){
      this.modalctrl.dismiss()
    }
    //permite filtrar los estudiantes
    filtrarEstudiantes(){
      const termino=this.searchTerm.toLowerCase()

      this.estudiantesFiltrados=this.estudiantes
      .filter(est=> est.Nombres_Apellidos.toLowerCase().includes(termino))
      .map(est=>({
        ...est,
        nombreResaltado:this.getHighligtedName(est.Nombres_Apellidos,termino)
      }))
    }

    //Esta funcion permite resaltar la busqueda cuando se este buscando el elemento
    getHighligtedName(nombre:string,search:string):SafeHtml{
      if(!search) return this.sanitizer.bypassSecurityTrustHtml(nombre)
      const regex=new RegExp(`(${search})`,'gi')
       const nuevoNombre=nombre.replace(
        regex,
        `<span class="resaltado">$1</span>`

       )
       return this.sanitizer.bypassSecurityTrustHtml(nuevoNombre)
    }
}
