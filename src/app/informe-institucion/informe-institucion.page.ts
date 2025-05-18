import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonIcon,IonLabel,IonTextarea,IonSearchbar,IonList,IonItem,IonAvatar,IonCard,IonCardHeader,IonCardTitle,IonCardContent } from '@ionic/angular/standalone';
import { chevronBackOutline, idCardOutline, mailOutline, personCircle, ribbonOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { loginInstitucionService } from '../services/InicioInstitucion';
import { getService } from '../services/GetEstudiantesService';
import { ModalEvaluacionComponent } from '../modal-evaluacion/modal-evaluacion.component';
import {ModalController,IonicModule} from '@ionic/angular'
@Component({
  selector: 'app-informe-institucion',
  templateUrl: './informe-institucion.page.html',
  styleUrls: ['./informe-institucion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonButton,IonBackButton,IonIcon,IonLabel,IonTextarea,IonSearchbar,IonList,IonItem,IonAvatar,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonicModule]
})
export class InformeInstitucionPage implements OnInit {

  constructor(private inicioInstitucion:loginInstitucionService,private getSv:getService,private modalCtrl:ModalController) {
    addIcons({chevronBackOutline,ribbonOutline,mailOutline,personCircle,idCardOutline})
   }
     Correo:string|null=''
    private institucion=this.inicioInstitucion.obtenerDatosLocalStorage()
    instituciones:any=null
    defaultImagen:string='assets/img/perfil-removebg-preview.png'//imagen por defecto
    perfilImg:string|null=null
    @ViewChild('inputArchivo') inputArchivo!:ElementRef<HTMLInputElement>
    //variables de mision y Vision
    mision:string=''
    vision:string=''
    yaRegistrado:boolean=false
    //variables para el filtrado de datos
    busqueda:string=''
    estudianteFiltrados:any[]=[]
    estudiantes:any[]=[]
  async ngOnInit() {
    this.cargarDatosInstitucion()
    this.cargarImagenPerfil()
    this.inicializarMisionVision();
    await this.inicializarFiltrado()
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

   //Inicializar Vision y Mision 
   inicializarMisionVision(){
    this.instituciones=this.institucion
    const clave=this.instituciones.Institucion.Nombres_Apellidos
    const datos=localStorage.getItem(`mv_${clave}`)
    if(datos){
      const {mision,vision}=JSON.parse(datos)
      this.mision=mision;
      this.vision=vision;
      this.yaRegistrado=true;
    }
   }

   //Guardar vision y mision
   guardarMisionVision(){
    this.instituciones=this.institucion
    const clave=this.instituciones.Institucion.Nombres_Apellidos
    const datos={mision:this.mision,vision:this.vision}
    localStorage.setItem(`mv_${clave}`,JSON.stringify(datos))
    this.yaRegistrado=true
   }

   //Funciones para realizar el filtrado de los estudiantes mediante el nombre
   async inicializarFiltrado(){
    this.estudiantes=await this.getSv.getEstudiantes()
     this.estudianteFiltrados=[...this.estudiantes];
   }
   

  filtrarEstudiantes(){
    const filtro=this.busqueda.toLowerCase().trim()
    this.estudianteFiltrados=this.estudiantes.filter((est:any)=>{
      const nombre=est.Estudiante?.Nombres_Apellidos ||est.Nombres_Apellidos ||''
      return nombre.toLowerCase().includes(filtro)
    })
  }

  //Funcion para obtener la imagen de los estudiantes
    obtenerImagen(est:any):string{
    const correo=est.Estudiante?.Correo|| est.Correo || ''
    const imagenGuardada=localStorage.getItem(`perfilImg_${correo}`)
    return imagenGuardada || this.defaultImagen;
   }

   //Funcion para crear y abrir el modal
   async abrirModalEvaluacion(estudiante:any){
        const modal= await this.modalCtrl.create({
          component:ModalEvaluacionComponent,
          componentProps:{estudiante}

        });
        await modal.present()
   }
}
