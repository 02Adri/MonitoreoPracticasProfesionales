import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton,IonMenu,IonApp,IonMenuButton,IonIcon } from '@ionic/angular/standalone';
import { chevronBackOutline, eyeOutline, globeOutline, idCardOutline, mailOutline, ribbonOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { loginCoordinadorService } from '../services/InicioCoordinador';
import { ModalCarreraComponent } from '../modal-carrera/modal-carrera.component';
import {ModalController,IonicModule} from '@ionic/angular'
import { ReunionVirtualComponent } from '../reunion-virtual/reunion-virtual.component';
import { AgendarVisitasComponent } from '../agendar-visitas/agendar-visitas.component';

@Component({
  selector: 'app-informe-coordinador',
  templateUrl: './informe-coordinador.page.html',
  styleUrls: ['./informe-coordinador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonButton,IonMenu,IonApp,IonicModule,IonMenuButton,IonIcon,AgendarVisitasComponent],
})
export class InformeCoordinadorPage implements OnInit {
    
  constructor(private inicioCoordinador:loginCoordinadorService,private modalctrl:ModalController) {
    addIcons({chevronBackOutline,eyeOutline,globeOutline,idCardOutline,mailOutline,ribbonOutline})
   }
   private coordinador=this.inicioCoordinador.obtenerDatosLocalStorage()
    coordinadores:any=null
    defaultImagen:string='assets/img/perfil-removebg-preview.png'//imagen por defecto
    perfilImg:string|null=null//imagen de perfil
    @ViewChild('inputArchivo') inputArchivo!:ElementRef<HTMLInputElement>
  async ngOnInit() {
    this.obtenerDatosCoordinador()
    this.cargarImagenPerfil()
  }
   //obtener datos del coordinador
   obtenerDatosCoordinador(){
      if(this.coordinador){
        this.coordinadores=this.coordinador
        console.log('Datos del Coordinador enviados correctamente',this.coordinadores)
      }
   }
   //mostrar modal de carreras
   async openModalCarreras(){
      const modal= await this.modalctrl.create({
        component:ModalCarreraComponent
      })
      return await modal.present()
   }
   //modal para crear la reunion
   async openModalReunion(){
     const modal= await this.modalctrl.create({
      component:ReunionVirtualComponent,
      cssClass:'modal-reunion',
      backdropDismiss:false,
    })
    await modal.present()
   }

   //Funcion para cargar imagen
   cargarImagenPerfil(){
    const imagenGuardada=localStorage.getItem(`perfilMaestro_${this.coordinadores.Coordinador.Nombres_Apellidos}`)
    if(imagenGuardada){
      this.perfilImg=imagenGuardada
    }else{
      this.perfilImg=''//Asi verificamos que el elemento no sea undefined
    }
   }
   //Seleccionar la imagen desde el explorador de archivo
   seleccionarImagen(event:any){
    const archivo=event.target.files[0]
    if(archivo){
      const lector=new FileReader()
      lector.onload=()=>{
        this.perfilImg=lector.result as string
        localStorage.setItem(`perfilMaestro_${this.coordinadores.Coordinador.Nombres_Apellidos}`,this.perfilImg)
        console.log('imagen guardada en el localStorage', this.perfilImg)

      }
      lector.readAsDataURL(archivo)
    }
   }
   //funcion para abrir el explorador
   abrirExplorador(){
    this.inputArchivo.nativeElement.click()
   }
}
