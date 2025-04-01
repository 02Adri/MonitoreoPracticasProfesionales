import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton,IonApp,IonMenu,IonMenuButton,IonIcon} from '@ionic/angular/standalone';
import {AppLauncher} from '@capacitor/app-launcher'
import {Platform} from '@ionic/angular'
import { addIcons } from 'ionicons';
import { chevronBackOutline,addCircleOutline,eyeOutline } from 'ionicons/icons';
import {loginEstudianteService} from '../services/InicioEstudiante'
import { ModalMostrarInformesComponent } from '../modal-mostrar-informes/modal-mostrar-informes.component';
import { ModalSubirInformesComponent } from '../modal-subir-informes/modal-subir-informes.component';
import { ModalController,IonicModule} from '@ionic/angular';
@Component({
  selector: 'app-crear-informe-estudiante',
  templateUrl: './crear-informe-estudiante.page.html',
  styleUrls: ['./crear-informe-estudiante.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonButton,IonApp,IonMenu,IonMenuButton,IonIcon,IonicModule]
})
export class CrearInformeEstudiantePage implements OnInit {
    private datosGuardados=this.loginEs.obtenerDatosLocalStorage()
    estudiante:any=this.datosGuardados;
    archivos:any[]=[];
    constructor(private platform:Platform,private loginEs:loginEstudianteService,private modalController:ModalController) { 
    addIcons({chevronBackOutline,addCircleOutline,eyeOutline})
  }

  ngOnInit() {
  }
   //creamos nuestra funcion para abrir nuestras aplicaciones
   async openApp(appId:string, webUrl:string){
    if(this.platform.is('android') || this.platform.is('ios')){
     const canOpen= await AppLauncher.canOpenUrl({url:appId});
     if(canOpen.value){
       await AppLauncher.openUrl({url:appId}); 
   }else{
    alert('No se encontró la aplicación instalada.Abriendo en el navegador')
    window.open(webUrl,'_blank')
   }
  }else{
    //abriendo para la web
    window.open(webUrl,'_blank')
  }
}

 //Abril modal para carga de archivos
 async abrirModalSubirArchivos(){
  const modal = await this.modalController.create({
    component: ModalSubirInformesComponent,
    componentProps: {
      estudiante: this.estudiante
    },
   
  });
   await modal.present();
}
//Abrir modal para mostrar archivos
async abrirModalMostrarArchivos(){
  const modal = await this.modalController.create({
    component: ModalMostrarInformesComponent,
    componentProps: {
      estudiante: this.estudiante
    },
    
  });
   await modal.present();
}
}
