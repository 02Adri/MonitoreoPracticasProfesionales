import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton,IonButtons,IonBackButton} from '@ionic/angular/standalone';
import {ModalController,IonicModule}from '@ionic/angular'
import { ModalTestComponent} from '../modal-test/modal-test.component';
import axios from 'axios';
import Swal from 'sweetalert2'
import { loginEstudianteService } from '../services/InicioEstudiante';
@Component({
  selector: 'app-test-carreras',
  templateUrl: './test-carreras.page.html',
  styleUrls: ['./test-carreras.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonicModule,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton,IonButtons,IonBackButton],
})
export class TestCarrerasPage implements OnInit {
  //utilizamos los datos del estudiante para guardar el progreso
  private datosGuardados=this.loginEs.obtenerDatosLocalStorage()
  estudiante:any=this.datosGuardados
     //resaltamos las carreras que se utilizaran para los test
         carreras = [
           { nombre: 'Medicina', imagen: 'assets/img/medicina.jpg', testsRealizados: 0, categoriaApi: 17 },
           { nombre: 'Ingeniería', imagen: 'assets/img/ingenieria.jpg', testsRealizados: 0, categoriaApi: 18 },
           { nombre: 'Psicología', imagen: 'assets/img/psicologia.jpg', testsRealizados: 0, categoriaApi: 20 },
           { nombre: 'Arquitectura', imagen: 'assets/img/arquitectura.jpg', testsRealizados: 0, categoriaApi: 23 },
           { nombre:'Animales',      imagen:'assets/img/animales.jpg', testsRealizados:0, categoriaApi:27},
           { nombre:'Matematicas',   imagen:'assets/img/matematicas.jpg',testsRealizados:0,categoriaApi:19}
         ];
  constructor(private modalController:ModalController,private loginEs:loginEstudianteService) { }

  ngOnInit() {
    this.cargarProgreso()
  }

  //Funcion para cargar el progreso de los test de acuerdo a los estudiantes
  cargarProgreso(){
    const datos=localStorage.getItem(`progreso_${this.estudiante.Estudiante.Nombres_Apellidos}`)
    if(datos){
      const progresoGuardado=JSON.parse(datos)
      console.log('📦 Progreso guardado cargado:', progresoGuardado);
      this.carreras.forEach(carrera=>{
        const encontrado=progresoGuardado.find((p:any)=>p.nombre===carrera.nombre)
        if(encontrado && encontrado.testsRealizados !== undefined){
          carrera.testsRealizados=encontrado.testsRealizados
        }
      })
    }else{
      console.log('📦 Progreso no cargado');
    }
  }
  //funcion para guardar Progreso
  guardarProgreso(){
    localStorage.setItem(`progreso_${this.estudiante.Estudiante.Nombres_Apellidos}`,
      JSON.stringify(this.carreras.map(c=>({
        nombre:c.nombre,
        testsRealizados:c.testsRealizados
      })))
    )
  }
  //modal para cargar los test 
    async iniciarTest(carrera:any){
      console.log('iniciarTest ejecutado para:', carrera)
      const apiUrl = `https://opentdb.com/api.php?amount=5&category=${carrera.categoriaApi}&type=multiple`;
      console.log('Url generada:',apiUrl)

     const loadingAlert=Swal.fire({
        title:'Cargando test...',
        allowOutsideClick:false,
        didOpen:()=>{
          Swal.showLoading()
        },
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert'
        },
        backdrop:true,
     })
       
      try {
        const response=await axios.get(apiUrl)
        console.log('Respuesta de la API:', response);
        if(!response.data|| !response.data.results||!response.data.results.length){
          Swal.close()
          console.warn('No hay resultados en la respuesta de la API');
          Swal.fire({
            title:'Error',
            text:'No se encontraron preguntas para esta carrera. Por favor, inténtelo de nuevo más tarde.',
            icon:'error',
            confirmButtonText:'Aceptar',
            scrollbarPadding:false,
            heightAuto:false,
            customClass:{
              popup:'custom-alert'
            },
            backdrop:true,
          })
          return;

        }
         const preguntas=response.data.results.map((pregunta:any)=>({
          pregunta:this.decodeHtml(pregunta.question),
          opciones:[...pregunta.incorrect_answers,pregunta.correct_answer]
          .sort(()=>Math.random()- 0.5)
          .map(this.decodeHtml),
          correcta:this.decodeHtml(pregunta.correct_answer),
        }));
        console.log('Preguntas decodificadas:', preguntas);

        if (!preguntas.length) {
          Swal.close()
          console.warn('No hay preguntas para esta carrera');
          return;
        }
            Swal.close()
        const modal=await this.modalController.create({
          component:ModalTestComponent,
          componentProps:{preguntas,carrera}
        });
        modal.onDidDismiss().then((dataReturned)=>{
          if(dataReturned.data){
            carrera.testsRealizados++;
            this.guardarProgreso()
            this.mostrarResultados(dataReturned.data.correctas,preguntas.length,carrera.nombre)
          }
        })
        await modal.present()
        console.log('Modal creado');
      } catch (error) {
        console.error(error)
        Swal.fire({
          title:'Error',
          text:'No se pudo cargar el test. Por favor, inténtelo de nuevo más tarde.',
          icon:'error',
          confirmButtonText:'Aceptar',
          scrollbarPadding:false,
          heightAuto:false,
          customClass:{
            popup:'custom-alert'
          },
          backdrop:true,
        })
      }
    }
    //Funcion para mostrar los resultados
    mostrarResultados(correctas:number,total:number,carrera:string){
      Swal.fire({
        title:'Test de '+carrera,
        html:`<h3>¡Completado!</h3><p>Acertaste<b>${correctas}/${total}</b>preguntas.</p>`,
        icon:correctas >=(total/2)? 'success':'info',
        confirmButtonText:'¡Genial!',
        scrollbarPadding:false,
        heightAuto:false,
        customClass:{
          popup:'custom-alert'
        },
        backdrop:true,
        allowOutsideClick:false,
      })
    }
    //Funcion para decodificar el html
    decodeHtml(html:string){
      const txt= document.createElement('textarea');
      txt.innerHTML=html;
      return txt.value;
    }
  
   
    
}
