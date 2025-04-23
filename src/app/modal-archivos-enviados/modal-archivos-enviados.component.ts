import { Component, OnInit,Input } from '@angular/core';
import {IonicModule,ModalController}from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonList,IonItem,IonLabel,IonIcon} from '@ionic/angular/standalone'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { closeOutline,downloadOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-archivos-enviados',
  templateUrl: './modal-archivos-enviados.component.html',
  styleUrls: ['./modal-archivos-enviados.component.scss'],
  standalone: true,
  imports:[CommonModule,IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonList,IonItem,IonLabel,IonIcon,FormsModule],
})
export class ModalArchivosEnviadosComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { 
    addIcons({closeOutline,downloadOutline})
  }
  @Input() informes:any[]=[]
  @Input() estudiante:string=''
  ngOnInit() {}
  //Funcion para cerrar el modal 
  dismiss(){
    this.modalCtrl.dismiss()
  }

  //descargar el archivo en formato pdf
  descargarInforme(informe:any){
    let contenido=informe?.contenido
       if(contenido && contenido.startsWith("data:")){
             contenido=contenido.split(',')[1]
       }
       try {
        const byteCaracteres=atob(contenido)
        const byteNumeros= new Array(byteCaracteres.length).fill(0).map((_,i)=>byteCaracteres.charCodeAt(i))
         const byteArray=new Uint8Array(byteNumeros)
         const blob= new Blob([byteArray],{type:informe.tipo})
         const url=URL.createObjectURL(blob)
      
         const a=document.createElement('a')
         a.href=url
         a.download=informe.informe;
         a.click()
      
         Swal.fire({
          text:'¡Descarga Exitosa...!',
          title:`El informe ${informe.informe} se ha descargado correctamente`,
          icon:'success',
          confirmButtonText:'De acuerdo',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
            popup:'custom-alert',
          },
          backdrop:true
        })
        
       } catch (error) {
         console.error('Error al decodificarlo en base64',error)
       }
   
    
  }
}
