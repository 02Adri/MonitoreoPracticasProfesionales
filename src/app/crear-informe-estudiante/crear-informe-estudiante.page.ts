import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonButton,IonApp,IonMenu,IonMenuButton,IonIcon,IonCard,IonCardHeader,IonCardContent,IonCardTitle} from '@ionic/angular/standalone';
import {AppLauncher} from '@capacitor/app-launcher'
import {Platform} from '@ionic/angular'
import { addIcons } from 'ionicons';
import { chevronBackOutline,addCircleOutline,eyeOutline, home,readerOutline } from 'ionicons/icons';
import {loginEstudianteService} from '../services/InicioEstudiante'
import { ModalMostrarInformesComponent } from '../modal-mostrar-informes/modal-mostrar-informes.component';
import { ModalSubirInformesComponent } from '../modal-subir-informes/modal-subir-informes.component';
import { ModalController,IonicModule} from '@ionic/angular';
import {NgChartsModule} from 'ng2-charts';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crear-informe-estudiante',
  templateUrl: './crear-informe-estudiante.page.html',
  styleUrls: ['./crear-informe-estudiante.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton,IonButton,IonApp,IonMenu,IonMenuButton,IonIcon,IonicModule,NgChartsModule,IonCard,IonCardHeader,IonCardContent,IonCardTitle],
})
export class CrearInformeEstudiantePage implements OnInit {
    
  
  private datosGuardados=this.loginEs.obtenerDatosLocalStorage()
    estudiante:any=this.datosGuardados;
    archivos:any[]=[];
    constructor(private platform:Platform,private loginEs:loginEstudianteService,private modalController:ModalController,private router:Router) { 
    addIcons({chevronBackOutline,addCircleOutline,eyeOutline,readerOutline})
  }

  ngOnInit() {
    this.graficoDatos()
  }
   //Funcion para redirigir a la pagina de test
        async redirigirTest(){
           Swal.fire({
            title:'Tests Profesionales',
            text:'¿Deseas realizar un test profesional?',
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Si, deseo realizarlo',
            cancelButtonText:'No, cancelar',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
              popup:'custom-alert',
            },
            backdrop:true
           }).then((result)=>{
            if(result.isConfirmed){
              this.router.navigate(['/test-carreras'])
            }
           })
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

//app a utilizar
apps=[
  {
    name:'Microsoft Word',
    icon:'assets/img/word.png',
    color:'primary',
    package:'com.microsoft.office.word',
    url:'https://www.office.com/launch/word',
    usage:0,
    showChart:false,
    chartData:{
     
      labels:['Usado','libre'],
    datasets:[{
      data:[0,0],
      backgroundColor:['#3880ff','#dfe6e9']
    }]
    }
  },
  {
    name: 'Microsoft Excel',
    icon: 'assets/img/excel.png',
    color: 'success',
    package: 'com.microsoft.office.excel',
    url: 'https://www.office.com/launch/excel',
    usage:0,
    showChart: false,
    chartData: {
      
      labels: ['Usado', 'Libre'],
      datasets: [{
        data: [0, 0],
        backgroundColor: ['#2dd36f', '#dfe6e9']
      }]
    }
  },
  {
    name: 'Microsoft PowerPoint',
    icon: 'assets/img/powerpoint.png',
    color: 'danger',
    package: 'com.microsoft.office.powerpoint',
    url: 'https://www.office.com/launch/powerpoint',
    usage:0,
    showChart: false,
    chartData: {
     
      labels: ['Usado', 'Libre'],
      datasets: [{
        data: [0,0],
        backgroundColor: ['#eb445a', '#dfe6e9']
      }]
    }
  }
];
 chartOptions={
  responsive:true,
  plugins:{
    legend:{display:false}
 },
 cutout:'70%'
}

//Mantener datos del grafico
  
  //creamos nuestra funcion para abrir nuestras aplicaciones
async openApp(app:any){
  //Mostrar gráfico primero
  app.showChart=true;
  if(app.usage <100){
    app.usage+=1;
}
const restante=100-app.usage;
  app.chartData={
    ...app.chartData,
    datasets:[{
      data:[app.usage,restante],
      backgroundColor:['#3880ff','#e0e0e0'],
      hoverBackgroundColor:['#3171e0','#dcdcdc'],
    }]
  }
  //guardar en localStorage
  localStorage.setItem(`usage-${this.estudiante.Estudiante.Nombres_Apellidos}-${app.name}`,JSON.stringify(app.usage));
  //abrir la app
  if(this.platform.is('android') || this.platform.is('ios')){
   const canOpen= await AppLauncher.canOpenUrl({url:app.package});
   if(canOpen.value){
     await AppLauncher.openUrl({url:app.package}); 
 }else{
  alert('No se encontró la aplicación instalada.Abriendo en el navegador')
  window.open(app.url,'_blank')
 }
}else{
  //abriendo para la web
  window.open(app.url,'_blank')
}
}
graficoDatos(){
  this.apps.forEach(app=>{
    const saveUsage=localStorage.getItem(`usage-${this.estudiante.Estudiante.Nombres_Apellidos}-${app.name}`);
    if(saveUsage){
      app.usage=JSON.parse(saveUsage);
      const restante=100-app.usage;

      app.chartData={
        ...app.chartData,
        datasets:[{
          data:[app.usage,restante],
          backgroundColor:['#3880ff','#e0e0e0'],
         // hoverBackgroundColor:['#3171e0','#dcdcdc'],
        }]
      }
    }
  })
}
}
