import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonIcon,IonLabel } from '@ionic/angular/standalone';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { loginInstitucionService } from '../services/InicioInstitucion';
@Component({
  selector: 'app-informe-institucion',
  templateUrl: './informe-institucion.page.html',
  styleUrls: ['./informe-institucion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonButton,IonBackButton,IonIcon,IonLabel]
})
export class InformeInstitucionPage implements OnInit {

  constructor(private inicioInstitucion:loginInstitucionService) {
    addIcons({chevronBackOutline})
   }
     Correo:string|null=''
    private institucion=this.inicioInstitucion.obtenerDatosLocalStorage()
    instituciones:any=null
  ngOnInit() {
    this.cargarDatosInstitucion()
  }
  //Obtenemos datos de la API que consumimos 
   cargarDatosInstitucion(){
    
    if(this.institucion){
      this.instituciones=this.institucion
      console.log('Se obtuvieron Correctamente los datos de la institucion',this.instituciones)
    }
   }
}
