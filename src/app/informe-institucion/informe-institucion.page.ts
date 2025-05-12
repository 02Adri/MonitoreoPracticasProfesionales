import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonIcon,IonLabel } from '@ionic/angular/standalone';
import { chevronBackOutline, idCardOutline, mailOutline, personCircle, ribbonOutline } from 'ionicons/icons';
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
    addIcons({chevronBackOutline,ribbonOutline,mailOutline,personCircle,idCardOutline})
   }
     Correo:string|null=''
    private institucion=this.inicioInstitucion.obtenerDatosLocalStorage()
    instituciones:any=null
    defaultImagen:string='assets/img/perfil-removebg-preview.png'//imagen por defecto
    perfilImg:string|null=null
    @ViewChild('inputArchivo') inputArchivo!:ElementRef<HTMLInputElement>
  ngOnInit() {
    this.cargarDatosInstitucion()
    this.cargarImagenPerfil()
  }
  //Obtenemos datos de la API que consumimos 
   cargarDatosInstitucion(){
    
    if(this.institucion){
      this.instituciones=this.institucion
      console.log('Se obtuvieron Correctamente los datos de la institucion',this.instituciones)
    }
   }

   //Funcion para cargar Imagen
   cargarImagenPerfil(){
     this.instituciones=this.institucion
     const imagenGuardada=localStorage.getItem(`perfilInstitucion_${this.instituciones.Institucion.Nombres_Apellidos}`)
     if(imagenGuardada){
        this.perfilImg=imagenGuardada
     }else{
        this.perfilImg=''//evitar que no sea elementos undefined
     }
   }
   //Seleccionar imagen desde el explorador de archivos
   seleccionarImagen(event:any){
      this.instituciones=this.institucion
      const archivo=event.target.files[0]
      if(archivo){
        const lector=new FileReader()
        lector.onload=()=>{
          this.perfilImg=lector.result as string
          localStorage.setItem(`perfilInstitucion_${this.instituciones.Institucion.Nombres_Apellidos}`,this.perfilImg)
          console.log('Imagen guardada en el localStorage',this.perfilImg)
        }
        lector.readAsDataURL(archivo)
      }
   }
   //Funcion para abrir el explorador
   abrirExplorador(){
    this.inputArchivo.nativeElement.click()
   }
}
