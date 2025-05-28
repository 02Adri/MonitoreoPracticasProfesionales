import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ModalController,IonicModule} from '@ionic/angular'
import { addIcons } from 'ionicons';
import {IonIcon,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent} from '@ionic/angular/standalone'
import { addCircleOutline, closeCircleOutline, documentOutline, downloadOutline, eyeOutline, globeOutline, peopleCircleOutline, personOutline, timeOutline } from 'ionicons/icons';
import {trigger,transition,style,query,group,animate} from '@angular/animations'

@Component({
  selector: 'app-modal-instructivo',
  templateUrl: './modal-instructivo.component.html',
  styleUrls: ['./modal-instructivo.component.scss'],
  standalone: true,
  imports:[CommonModule,FormsModule,IonicModule,IonIcon,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent],
  animations:[
    trigger('cambioPso',[
      transition(':increment',[
        group([
          query(':enter',[
            style({opacity:0,transform:'translateX(100px)'}),
            animate('500ms ease-in',style({opacity:1,transform:'translateX(0)'}))
          ]),
          query(':leave',[
            animate('500ms ease-out',style({opacity:0,transform:'translateX(-100px)'}))
          ])
        ])
      ]),
      transition(':decrement',[
        group([
          query(':enter',[
            style({opacity:0,transform:'translateX(-100px)'}),
            animate('500ms ease-in',style({opacity:1,transform:'translateX(0)'}))
          ]),
          query(':leave',[
            animate('500ms ease-out',style({opacity:0,transform:'translateX(100px)'}))
          ])
        ])
      ])
    ])
  ]
  
})
export class ModalInstructivoComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { 
    addIcons({peopleCircleOutline,personOutline,timeOutline,downloadOutline,eyeOutline,addCircleOutline,documentOutline,globeOutline,closeCircleOutline})
  }

  ngOnInit() {}
   pasoActual=0
  //Realizar la lista de los instructivo
  instructivos=[
    {
      icono:'person-outline',
      titulo:'Instructivo para Iniciar Sesión',
      descripcion:'En este Espacio haz click en el botón de iniciar Sesión en el cual se desplegará tres opciones para iniciar sesión como es Estudiante, Coordinador e Institución. Elige tu roll e inicia con tus Nombres, Apellidos y Correo Electrónico'
    },
    {
      icono:'people-circle-outline',
      titulo:'Instructivo para Registrarse',
      descripcion:'Para iniciar sesión, primeramente deben registrarse, el cual al darle click a botón de registrarse muestra el mismo despegable de iniciar Sesión, eligen su roll, les mostrará una serie de requirimientos que son obligatorios para poder registrarse con nosotros'
    },
    {
      icono: 'time-outline',
      titulo:'Instructivo de hora Entradas y Salida del Estudiante',
      descripcion:'Si eres estudiantes y ya has iniciado sesión  entras al espacio del estudiante donde primeramente tendras las opciones de hora de entrada y salida, donde registras la hora de entrada y salida donde realizas tus prácticas profesionales y asi tener un mejor control de tus registros'

    },
    {
      icono:'eye-outline',
      titulo:'Instructivo de Vista Previa',
      descripcion:'En este espacio te muestra una ventana emergente de toda la información previa como tu nombre, correo, hora de entrada y salida. Para que luego tú la puedas descargar en un formato de excel.'
    },
    {
      icono:'eye-outline',
      titulo:'Instructivo ver Informes',
      descripcion:'Ver informes es un espacio que primeramente debes registrarse con tu carnet, para que luego puedas trabajar tus informes, tiene el paquete office online, por si no lo tienes instalado, tiene las opciones de subir informes , mostrarlos y puedas realizar test para que mejores y refuerces tus conocimientos en tu área de estudio'
    },
    {
      icono:'add-circle-outline',
      titulo:'Instructivo de Subir Informes',
      descripcion:'En esta opción subes todos aquellos archivos que has trabajado para poder enviarlos al área correspondiente.'
    },
    {
      icono:'document-outline',
      titulo:'Instructivo para mostrar informes',
      descripcion:'Esta opción permite mostrar los informes que has subido, tienes las opciones de cambiar archivos, eliminar y enviar.'
    }
  ]
  //funcion para cerrar modal 
  dismiss(){
    this.modalCtrl.dismiss()
  }
  //funcion para avanzar al siguiente paso del instructivo
  siguiente(){
    if(this.pasoActual < this.instructivos.length - 1) {
      this.pasoActual++;

    }
  }
  //funcion para retroceder al paso anterior del instructivo
  anterior() {
    if(this.pasoActual > 0) {
      this.pasoActual--;
    }
  }
}
