import { Component, OnInit,Input } from '@angular/core';
import { carreraService } from '../services/CarreraService';
import {ModalController,IonicModule} from '@ionic/angular'
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon,IonSearchbar,IonBadge} from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close,alertCircleOutline } from 'ionicons/icons';
import{loginEstudianteService} from '../services/InicioEstudiante'
import {DomSanitizer,SafeHtml} from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import {loginCoordinadorService} from '../services/InicioCoordinador'
import { ModalArchivosEnviadosComponent } from '../modal-archivos-enviados/modal-archivos-enviados.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-carrera-estudiantes',
  templateUrl: './modal-carrera-estudiantes.component.html',
  styleUrls: ['./modal-carrera-estudiantes.component.scss'],
  standalone: true,
  imports:[IonicModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonItem,IonList,IonLabel,IonIcon,CommonModule,IonSearchbar,FormsModule,IonBadge]
})
export class ModalCarreraEstudiantesComponent  implements OnInit {
     estudiantes:any[]=[]
     carrera:string=''
      perfilImg:string|null=null
      defaultImg:string='assets/img/perfil-removebg-preview.png'
      searchTerm:string=''
      estudiantesFiltrados:any[]=[]
      informesRecibidos:any[]=[]
  constructor(private caService:carreraService,private modalctrl:ModalController,private loginEs:loginEstudianteService,private sanitizer:DomSanitizer, private loginCo:loginCoordinadorService) {
    addIcons({close,alertCircleOutline})
   }

  ngOnInit() {
     this.mostrarCarrera()
     this.cargarInformesRecibidos()
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
        const carnet= est.Estudiante?.Carnet || est.Carnet
          
        //verificar si el estudiante tiene informe nuevo no leído
        const tieneInformeNuevo=this.informesRecibidos.filter((info:any)=>
             info.estudiante?.Carnet === carnet && !info.leido 
        ).length;
        return{
          ...est,
          imagen:imagenGuardada || this.defaultImg,
          tieneNotificacion:tieneInformeNuevo>0,
          totalInformesNuevos:tieneInformeNuevo,
          
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

    //Funcion para cargar los informes recibidos por los estudiantes
    cargarInformesRecibidos(){
      const coordinador=this.loginCo.obtenerDatosLocalStorage()
      console.log('coordinador:', coordinador?.Coordinador?.Correo);
      const informesRaw=JSON.parse(localStorage.getItem('informesEnviados')|| '[]')
      const informes=Array.isArray(informesRaw) ? informesRaw.filter((i:any)=>i !==null) : [informesRaw]
      //Filtrar los informes dirigidos a este coordinador
      this.informesRecibidos=informes.filter((info:any)=>
      
      info?.correoCoordinador===coordinador.Coordinador?.Correo
      )

      //Buscar Informes no leidos
      const informesNoLeidos=this.informesRecibidos.filter((info:any)=> !info.leido)
        //obtener estudiantes ya notificados para evitar repetir
        const notificados=JSON.parse(localStorage.getItem('notificadosPorAudio') || '[]')
      informesNoLeidos.forEach(info=>{
        const carnet=info?.estudiante?.Estudiante?.Carnet || info?.estudiante?.Carnet
        const nombreEstudiante=info?.estudiante?.Estudiante?.Nombres_Apellidos || info?.estudiante?.Nombres_Apellidos

        if(!notificados.includes(carnet)){
           //reproducir el mensaje personalizado
            const mensaje=`Tienes un nuevo informe enviado por  ${nombreEstudiante}`
            this.reproducirMensaje(mensaje)
            //marcar como ya notificados
            notificados.push(carnet)

        }
      })
      //Guardar estudiantes notificados para evitar repetir
      localStorage.setItem('notificadosPorAudio',JSON.stringify(notificados))
      
    }
    //funcion para marcar como leido el informe
    async verInforme(estudiante:any){
      const coordinador=this.loginCo.obtenerDatosLocalStorage()
      let informesRaw=JSON.parse(localStorage.getItem('informesEnviados')|| '[]')
      let informes=Array.isArray(informesRaw) ? informesRaw:[informesRaw]
      console.log('Informes cargados por enviar 3:', informes);
    
      const carnet = estudiante.Estudiante?.Carnet || estudiante.Carnet;
      const correoCoordinador = coordinador?.Coordinador?.Correo;
       const nombreEstudiante=estudiante?.Estudiante?.Nombres_Apellidos ||estudiante?.Nombres_Apellidos

         //Actualizar la lista de informes recibidos porque su estado es no leídos a leidos
     const informeMostrado=informes
     .slice()
     .reverse()
    .find((info:any)=>
    info?.correoCoordinador?.trim()?.toLowerCase() === correoCoordinador?.trim()?.toLowerCase()&&
    info?.estudiante?.Carnet?.trim() ===carnet?.trim() &&
    !info.leido
  );
  if(informeMostrado){
   
    Swal.fire({
      title:'Informe Recibido de' + estudiante.Nombres_Apellidos,
      text:`El informe fue recibido correctamente ${informeMostrado.informe}`,
      icon:'success',
      confirmButtonText:'De acuerdo',
      scrollbarPadding:false,
      heightAuto:false,
      customClass:{
        popup:'custom-alert',
      },
      backdrop:true
    })
  }
        
       //marcar como leido el informe
      informes=informes.map((info:any)=>{
        if(
          info?.correoCoordinador?.trim()?.toLowerCase() ===correoCoordinador?.trim()?.toLowerCase() &&
          info?.estudiante?.Carnet?.trim() === carnet?.trim()
        ){
          return{
            ...info,
            leido:true
          }
         
          
        }
        return info
      })
      localStorage.setItem('informesEnviados',JSON.stringify(informes))
       //remover del Local Storage cuando se lee
       const notificados=JSON.parse(localStorage.getItem('notificadosPorAudio')||'[]')
       const nuevoNotificados=notificados.filter((c:string)=>c !==carnet)
       localStorage.setItem('notificadosPorAudio',JSON.stringify(nuevoNotificados))
      //mostrar Siempre el modal con todos los informes del estudiante
      const informesEstudiante=informes.filter(
        (info:any)=>
          info?.estudiante?.Carnet?.trim()===carnet.trim() &&
          info?.correoCoordinador?.trim()?.toLowerCase() === correoCoordinador?.trim()?.toLowerCase()


      );
      const modal=await this.modalctrl.create({
        component:ModalArchivosEnviadosComponent,
        componentProps:{
          informes:informesEstudiante,
          estudiante:nombreEstudiante
        }
      })
      await modal.present()
      //Actualiza icono de notificacion 
      estudiante.tieneNotificacion=false
      this.cargarInformesRecibidos()
      this.mostrarImagen()//refrescar iconos de notificacion
    }

    //Funcion para reproducir el mensaje
    reproducirMensaje(mensaje:string){
      const synth=window.speechSynthesis
        //permite eliminar cualquier audio que se encuentra en cola
        synth.cancel()
      const utterance=new SpeechSynthesisUtterance(mensaje)
      utterance.lang='es-ES'//español
      utterance.rate=1//velocidad de la voz
      utterance.pitch=1//tono de la voz

      //Personalizar la voz
      const voces=synth.getVoices()
      const vozFemenina=voces.find(v=>v.lang==='es-ES' && v.name.toLowerCase().includes('female'))
      if(vozFemenina){
        utterance.voice=vozFemenina
      }
      synth.speak(utterance)
    }
}
