import { Component, OnInit,viewChild,ElementRef, ViewChild } from '@angular/core';
import {ModalController,IonicModule} from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  pdfMake from 'pdfmake/build/pdfmake'
import  pdfFonts from 'pdfmake/build/vfs_fonts'
import {IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonIcon,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonLabel,IonInput} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { closeOutline, documentAttachOutline,personCircleOutline,idCardOutline,schoolOutline,fileTrayFullOutline, saveOutline} from 'ionicons/icons';

(pdfMake as any).vfs=(pdfFonts as any).vfs
@Component({
  selector: 'app-modal-carta',
  templateUrl: './modal-carta.component.html',
  styleUrls: ['./modal-carta.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule,FormsModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonIcon,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonLabel,IonInput]
})
export class ModalCartaComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { 
    addIcons({closeOutline,documentAttachOutline,personCircleOutline,idCardOutline,schoolOutline,fileTrayFullOutline,saveOutline})
  }
    //generamos los datos 
    datos={
      nombre:'',
      carnet:'',
      carrera:'',
      universidad:'',
      tutor:'',
      logoBase64:'',
      firmaBase64:'',
    }
    @ViewChild('logoInput') logoInput!:ElementRef<HTMLInputElement>
    @ViewChild('firmaInput') firmaInput!:ElementRef<HTMLInputElement>
  ngOnInit() {}
   //funcion para buscar imagen desde el explorador de archivos
   onFileChange(event:any, tipo:'logo' |'firma'){
     const file=event.target.files[0]
     const reader=new FileReader()
     reader.onload=()=>{
       this.datos[`${tipo}Base64`]=reader.result as string
     }
     reader.readAsDataURL(file)
   }

   //Funcion para generar carta
   generarCarta(){
     const docDefinition={
      content:[
        {
          image:this.datos.logoBase64,
          width:100,
          alignment:'center',
          margin:[0,0,0,20]
        },
        {
          text:'CONSTANCIA DE FINALIZACIÓN DE PRÁCTICAS PROFESIONALES',
          style:'header',
          alignment:'center',
          margin:[0,0,0,20]
        },
        {
          text:
          `El estudiante ${this.datos.nombre}, identificado con número de carnet ${this.datos.carnet}, de la carrera ${this.datos.carrera},`+
          `perteneciente a la universidad ${this.datos.universidad},ha culminado exitosamente `+
          `sus prácticas profesionales bajo la tutoria del Lic.${this.datos.tutor},demostrando compromiso, ética y profesionalismo durante el proceso,`+
          `esperando que esta experiencia a nivel profesional lo acompañe en su desarrollo laboral.`,
          style:'body',
          alignment:'center',
          margin:[0,0,0,20]
        },
        {
          text:`Se extiende la presente constancia como reconocimento a su desempeño`,
          style:'body',
          alignment:'justify',
          margin:[0,0,0,20]
        },
        {
          columns:[
            {
              width:'*',
              text:''
            },
            {
              width:'auto',
              stack:[
                {text:'Firma del Coordinador:', bold:true,margin:[0,0,0,5]},
                {image:this.datos.firmaBase64,
                  width:100,
                alignment:'left'
                }
                
              ]
            }
          ]
        },
        {
          text:`Fecha:${new Date().toLocaleDateString()}`,
          alignment:'right',
          margin:[0,30,0,0]
        }
      ],
      styles:{
        header:{fontSize:16,bold:true,color:'#2c3e50'},
        body:{fontSize:12,lineHeight:1.5}
      }
     }
     pdfMake.createPdf(docDefinition).download(`Carta_${this.datos.nombre}.pdf`)
      this.limpiarInputs()
    }
   //funcion para cerrar modal
   
   onDismiss(){
    this.modalCtrl.dismiss()
   }
   //Funcion para limpiar Inputs
    limpiarInputs(){
      this.datos.nombre='';
      this.datos.carnet='';
      this.datos.carrera='';
      this.datos.universidad='';
      this.datos.tutor='';
      this.datos.logoBase64='';
      this.datos.firmaBase64='';

       if(this.logoInput){
      this.logoInput.nativeElement.value='';
    }
    if(this.firmaInput){
      this.firmaInput.nativeElement.value='';
    }

    }
   
}
