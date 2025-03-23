import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonLabel,IonItem,IonInput,IonBackButton,IonButtons, IonButton,IonIcon,IonCard,IonCardHeader,IonCardContent,IonCardTitle} from '@ionic/angular/standalone';
import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import { Router } from '@angular/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { loginEstudianteService } from '../services/InicioEstudiante';
import { addIcons } from 'ionicons';
import { chevronBackOutline,eyeOutline,enterOutline,exitOutline,timeOutline } from 'ionicons/icons';
import { ModalExcelComponent } from '../modal-excel/modal-excel.component';
import {ModalController,IonicModule} from '@ionic/angular'
@Component({
  selector: 'app-hora-entrada-salida-estudiante',
  templateUrl: './hora-entrada-salida-estudiante.page.html',
  styleUrls: ['./hora-entrada-salida-estudiante.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonLabel,IonItem,IonInput,IonBackButton,IonButtons,IonButton,IonIcon,IonicModule,IonCard,IonCardHeader,IonCardContent,IonCardTitle]
})
export class HoraEntradaSalidaEstudiantePage implements OnInit {
      Nombres_Apellidos:string|null='';
      Correo:string|null='';
      horaEntrada:string|null=null;
      horaSalida:string|null=null;
      fechaHoy:string=new Date().toISOString().split('T')[0]
      horasTrabajadas:number|null=null
      totalHoras:number=0
      fileName:string='RegistroHoras.xlsx'
       registros:any[]=[]//guarda registros acumulativos
       constructor(private router:Router,private loginES:loginEstudianteService,private modalCtrl:ModalController) { 
        addIcons({chevronBackOutline,eyeOutline,enterOutline,exitOutline,timeOutline})
          //cargar horas almacenadas previamente al iniciar la aplicacion
          const horasGuardadas=localStorage.getItem('totalHoras')
          if(horasGuardadas){
            this.totalHoras=parseFloat(horasGuardadas)//convertimos a un número
          }
       }
       estudiante:any=null
       private datosGuardados=this.loginES.obtenerDatosLocalStorage()

  async ngOnInit() {
      this.obtenerDatosEstudiante()
     
    }
    
    //Obtenemos los datos que consumimos desde la API
    async obtenerDatosEstudiante(){
    
      if(this.datosGuardados){
        this.estudiante=this.datosGuardados
        //Generamos un nombre Unico para el archivo en excel
        this.fileName=`Registro_${this.estudiante.Estudiante.Nombres_Apellidos.replace(/\s+/g,'_')}.xlsx`
        //Verificamos si hay una hora de entrada guardada
        const entradaGuardada=localStorage.getItem(`horaEntrada_${this.estudiante.Estudiante.Correo}`)
        if(entradaGuardada){
          this.horaEntrada=entradaGuardada
        }
        console.log('se obtuvieron los datos correctamente',this.estudiante)
      }else{
        try {
          const correo=this.datosGuardados?.Correo ||""
          if(correo){
             this.estudiante=await this.loginES.obtenerDatosUsuario(correo)
             localStorage.setItem('estudiante',JSON.stringify(this.estudiante))
            
          }
        } catch (error) {
          
               Swal.fire({
                 title:'Error',
                 text:'No se puede iniciar sesión.Redirigiendo a la página de iniciar sesión',
                 icon:'error',
                 cancelButtonText:'Ok',
                 scrollbarPadding:false,
                 heightAuto:false,
                 customClass:{
                   popup:'custom-alert',
               
                 },
                 backdrop:true
               }).then((result)=>{
                  if(result.isConfirmed){
                   this.router.navigate(['/login-estudiante'])
                  }
               })
               console.error('❌ Error al obtener los datos del estudiante:',error)
              
             
        }
      }
    }
  
// Registrar la hora de Entrada del Estudiante
 registrarEntrada(){
  const now=new Date()
  this.estudiante=this.datosGuardados
this.horaEntrada=now.toLocaleTimeString()
  //Guardamos la hora de Entrada en el localStorage
  localStorage.setItem(`horaEntrada_${this.estudiante.Estudiante.Correo}`,this.horaEntrada)
  //creamos una constante donde resguarde la hora limite
  const horaLimite=new Date()
  horaLimite.setHours(24,0,0)

  if(now > horaLimite){
     this.reproducirSonidoTardanza()
     Swal.fire({
      title:`¡LLegaste tarde ${this.estudiante.Estudiante.Nombres_Apellidos}!`,
      text:`Hora de entrada registrada a las ${this.horaEntrada}`,
       icon:'warning',
       confirmButtonText:'OK',
       scrollbarPadding:false,
       heightAuto:false,
       customClass:{
        popup:'custom-alert',
       },
       backdrop:true
    
    })
  }else{
    Swal.fire({
      title: `Entrada Registrada de ${this.estudiante.Estudiante.Nombres_Apellidos}`,
      text:`Hora de Entrada:${this.horaEntrada}`,
      icon:'success',
      confirmButtonText:'OK',
      scrollbarPadding:false,
      heightAuto:false,
      customClass:{
        popup:'custom-alert',
      },
      backdrop:true
    })
    
  }
 }
  //Funcion para registrar la hora de salida
  registrarSalida(){
    this.estudiante=this.datosGuardados
    if(!this.horaEntrada){
      Swal.fire({
        title:'Error al registrar',
        text:'Debes registrar la hora de entrada primero',
        icon:'error',
        confirmButtonText:'Ok',
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert',
        },
        backdrop:true
      })
      return
    }
    const now=new Date()
    this.horaSalida=now.toLocaleTimeString()
    //modelo de vista de la hora de entrada
    const entrada=new Date()
    const [h,m,s]=this.horaEntrada.split(':').map(Number)
      entrada.setHours(h,m,s)
    
      //modelo de vista de la hora de Salida
      const salida=new Date()
      const [hs,ms,ss]=this.horaSalida.split(':').map(Number)
      salida.setHours(hs,ms,ss)

      //calculamos la diferencia entre la hora de entrada y salida para defenir las horas trabajadas
      const diferencia=(salida.getTime()-entrada.getTime())/1000/3600
       this.horasTrabajadas=parseFloat(diferencia.toFixed(2)) 
       //Elimina la hora del localStorage
        localStorage.removeItem(`horaEntrada_${this.estudiante.Estudiante.Correo}`)
       Swal.fire({
        title:'Salida Registrada',
        text:`Hora de Salida: ${this.horaSalida}\nTotal de Horas trabajadas:${this.horasTrabajadas}hrs`,
        icon:'success',
        confirmButtonText:'OK',
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert',

        },
        backdrop:true
       })
    
  }
 //funcion de resguarda sonido de tardanza
 reproducirSonidoTardanza(){
  const audio=new Audio('../music/alert-nextel-ringtones.mp3')
  audio.play()
 }

 //funcion para guardar el excel
 async guardarEnExcel(){
 
  Swal.fire({
     title:'Vista Previa del control de Registro de Entrada y Salida',
     text:'¿Deseas ver el Proceso de tus registros de entrada y salida?',
     icon:'question',
     showCancelButton:true,
    confirmButtonText:'OK',
    cancelButtonText:'No',
    scrollbarPadding:false,
    heightAuto:false,
    customClass:{
      popup:'custom-alert',
    },
    backdrop:true
  }).then((resultado)=>{
    if (resultado.isConfirmed){
       this.editarExcel()
    }
  })
 
}

//Editar Excel
async editarExcel(){
  try {
    //cremos los datos del usuario
    // Intentar recuperar datos previos desde localStorage
    let datosPrevios: any[] = JSON.parse(localStorage.getItem(`registro_${this.fileName}`) || '[]');
     
    //Intentar cargar el archivo existente para no perder los datos
    try {
     const response=await fetch(this.fileName)
     const arrayBuffer=await response.arrayBuffer()
     const workbook=XLSX.read(arrayBuffer,{type:'array'})
     const sheet=workbook.Sheets[workbook.SheetNames[0]]
     datosPrevios=XLSX.utils.sheet_to_json(sheet,{header:1})
    } catch (error) {
     console.log('No se encontro archivo previo, se creara uno nuevo')
    }
    //Si el archivo no tiene encabezados agregarselos
    this.estudiante=this.datosGuardados
    if(datosPrevios.length===0){
        datosPrevios.push(['Nombres_Apellidos','Correo','Fecha','Hora Entrada','Hora Salida','Horas Trabajadas','Total'])
    }else{
      //Eliminamos la fila del total antes de agregar un nuevo elemento
      if(datosPrevios[datosPrevios.length-1][0]==='Total'){
        datosPrevios.pop()
      }
    }
    //Agragamos el archivo
    datosPrevios.push([
     this.estudiante.Estudiante.Nombres_Apellidos,
     this.estudiante.Estudiante.Correo,
     this.fechaHoy,
     this.horaEntrada,
     this.horaSalida,
     this.horasTrabajadas,
    
    ])
      //Calculamos la suma de la columna de horas trabajadas
      let sumaHoras=datosPrevios
           .slice(1)//omite los encabezados
           .reduce((total,fila)=>total +(parseFloat(fila[5])||0),0 )
        this.totalHoras=sumaHoras
        //Guardamos en 'totalHoras' y lo almacenamos en el localStorage
        localStorage.setItem('totalHoras',this.totalHoras.toString())
      //Agregamos fila de total al final
      datosPrevios.push(['','','','','Total',sumaHoras])
     // Guardar los datos actualizados en localStorage
   localStorage.setItem(`registro_${this.fileName}`, JSON.stringify(datosPrevios));
   
      //Abrir el modal en lugar de descargar el excel
      const modal=await this.modalCtrl.create({
        component:ModalExcelComponent,
        componentProps:{
          datosPrevios
        }
      })
    await modal.present()
   //Crear la hoja de excel y el libro
   /* const ws:XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(datosPrevios)
     
       //Aplicar estilos de tablas en Excel
           const range=XLSX.utils.decode_range(ws['!ref']!)
          ws['!autofilter']={ref:XLSX.utils.encode_range(range)}//filtro de tabla
             //ajustar automaticamente el ancho de las columnas
             ws['!cols']=datosPrevios[0].map(()=>({wch:20}))
             //crear el libro y añadir ls hoja
    const wb:XLSX.WorkBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,'Registro')

    //Generar archivo y guardar
    const excelBuffer:any=XLSX.write(wb,{bookType:'xlsx',type:'array'})
    const dataBlob:Blob=new Blob([excelBuffer],{type:'application/octet-stream'})
    saveAs(dataBlob,this.fileName)*/
 } catch (error) {
   console.error('Error al guardar el archivo excel 2019, intentar de nuevo',error)
 }
}
}
