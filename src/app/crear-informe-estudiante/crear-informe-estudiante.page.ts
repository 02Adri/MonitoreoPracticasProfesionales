import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton } from '@ionic/angular/standalone';
import {AppLauncher} from '@capacitor/app-launcher'
import {Platform} from '@ionic/angular'
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
@Component({
  selector: 'app-crear-informe-estudiante',
  templateUrl: './crear-informe-estudiante.page.html',
  styleUrls: ['./crear-informe-estudiante.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonButton]
})
export class CrearInformeEstudiantePage implements OnInit {

  constructor(private platform:Platform) { 
    addIcons({chevronBackOutline})
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
}
