import { Component, OnInit,Input } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Chart from 'chart.js/auto'
import {ModalController,IonicModule} from '@ionic/angular'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { text } from 'body-parser';
import {IonHeader,IonToolbar,IonButtons,IonButton,IonContent,IonItem,IonLabel,IonTextarea,IonRange,IonIcon} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { chevronBackOutline, statsChartOutline } from 'ionicons/icons';
(pdfMake as any).vfs=(pdfFonts as any).vfs
import { getService } from '../services/GetEstudiantesService';
@Component({
  selector: 'app-modal-evaluacion',
  templateUrl: './modal-evaluacion.component.html',
  styleUrls: ['./modal-evaluacion.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule,FormsModule,IonHeader,IonToolbar,IonButtons,IonButton,IonContent,IonItem,IonLabel,IonTextarea,IonRange,IonIcon]
})
export class ModalEvaluacionComponent  implements OnInit {
   @Input() estudiante:any;
   //variable para realizar preguntas de evaluacion
   preguntas=[
    {texto:'Puntualidad del Estudiante'},
    {texto:'Calidad del trabajo'},
    {texto:'Desempeño del trabajo en equipo'},
    {texto:'Responsabilidad'},
    {texto:'Comunicación'}
   ]
   respuestas:number[]=[]
   observaciones:string=''
   chart:any
  constructor(private modalCtrl:ModalController,private getSv:getService) { 
    addIcons({chevronBackOutline,statsChartOutline})
  }

  ngOnInit() {
    this.inicializarEvaluacion()
  }
    
   //Funcion para inicializar Repuestas
   inicializarEvaluacion(){
    //inicializar repuestas en 5 es un valor medio
    this.respuestas=Array(this.preguntas.length).fill(5)

    //cargar evaluacion previa si existe
    const key=`evaluacion_${this.estudiante.Estudiante?.Correo || this.estudiante.Correo}`
    const data=localStorage.getItem(key)
    if (data){
      const evaluacion=JSON.parse(data)
      this.respuestas=evaluacion.respuestas || this.respuestas
      this.observaciones=evaluacion.observaciones || ''
       if (evaluacion.repuestas){
        setTimeout(()=>this.generarGrafico(),300)//mostrar Gráfico si hay repuestas guardadas
       }
    }
   }
   //Funcion para generar grafico de evaluacion
   generarGrafico(){
     if(this.chart) this.chart.destroy()

      const ctx=(document.getElementById('graficoEvaluacion') as HTMLCanvasElement).getContext('2d')
       this.chart=new Chart(ctx!,{
        type:'bar',
        data:{
          labels:this.preguntas.map(p=>p.texto),
          datasets:[{
            label:'Evaluacion',
            data:this.respuestas,
            backgroundColor:'#4caf50'
          }]
        },
        options:{
          scales:{
            y:{min:0,max:10,ticks:{stepSize:1}}
          }
        }
       })
   }

   //Funcion para generar el PDF
    generarPDF(){
      const canvas= document.getElementById('graficoEvaluacion') as HTMLCanvasElement
      const imgData=canvas.toDataURL()

      //contenido de las preguntas
      const contenidoPreguntas=this.preguntas.map((p,i)=>{
        return {text:`${p.texto}:${this.respuestas[i]}`, margin:[0,2,0,2] }
      })
      //Contenido del documento generado en PDF 
      const docDefinition:any={
      content:[
        {text:'Informe de Evaluación de Desempeño Laboral', style:'header'},
        {text:`Este informe evalúa el desempeño profesional del Estudiante :${this.estudiante.Estudiante?.Nombres_Apellidos || this.estudiante.Nombres_Apellidos}`, margin:[0,10,0,5]},
        {text:`El cual se identifica con el número de carnet:${this.estudiante.Estudiante?.Carnet || this.estudiante.Carnet} `,margin:[0,0,0,15]},
        {text:'Calificaciones', bold:true},
        ...contenidoPreguntas,
        {text:'Gráfico de Desempeño',bold:true, margin:[0,10,0,15]},
        {image:imgData,width:400},
        {text:'De la evaluación obtenida, también se reflejan algunas observaciones:', bold:true, margin:[0,15,0,5]},
        {text:this.observaciones || 'Sin observaciones', italics:true}
      ],
      styles:{
         header:{fontSize:22, bold:true, aligment:'center',margin:[0,0,0,20]}
      }
    }
    //Crear pdf y descargarlo
    pdfMake.createPdf(docDefinition).download(`Evaluacion_${this.estudiante.Estudiante?.Correo || this.estudiante.Correo}.pdf`)
    
     //Guardar contenido en localStorage
     const data={
        respuestas:this.respuestas,
        observaciones:this.observaciones
     }
     localStorage.setItem(`evaluacion_${this.estudiante.Estudiante?.Correo}`, JSON.stringify(data))
  }
  //funcion para cerrar modal
  dismiss(){
    this.modalCtrl.dismiss()
  }
}
