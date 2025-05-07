import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule,FormGroup,FormBuilder,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { informeEstudianteService } from '../services/informeEstudiante';
import Swal from 'sweetalert2';
import {IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonItem,IonLabel,IonInput,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonIcon } from '@ionic/angular/standalone';
import {ModalController,IonicModule} from '@ionic/angular'
import { addIcons } from 'ionicons';
import { idCardOutline } from 'ionicons/icons';
@Component({
  selector: 'app-modal-informe-login',
  templateUrl: './modal-informe-login.component.html',
  styleUrls: ['./modal-informe-login.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,ReactiveFormsModule,IonHeader,IonContent,IonTitle,IonToolbar,IonButton,IonItem,IonLabel,IonInput,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonicModule,IonIcon ]
})
export class ModalInformeLoginComponent  implements OnInit {
     informeForm!:FormGroup
  constructor(private router:Router, private fb:FormBuilder, private informeEs:informeEstudianteService,private modalController:ModalController) {
     
    addIcons({idCardOutline})
   }

  ngOnInit() {
    this.informeForm=this.fb.group({
      Carnet:["",Validators.required],
    })
  }

  //validar Informacion
  async onSubmit(){
    if(this.informeForm.valid){
      try {
        console.log("📤 Enviando datos al servicio:", this.informeForm.value)
        const usuario = await this.informeEs.informeEstudiante(this.informeForm.value);
        console.log("✅ Usuario autenticado:",usuario);
         // Mostrar alerta de éxito
                Swal.fire({
                  title: "¡Inicio Exitoso!",
                  text: `¡Haz iniciado correctamente Carnet: ${usuario.Estudiante.Carnet}!`,
                  icon: "success",
                  confirmButtonText: "Ok",
                  scrollbarPadding: false,
                  heightAuto: false,
                  customClass: {
                    popup: "custom-alert"
                  },
                  backdrop: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/crear-informe-estudiante']);
                  }
                });
              
                
                this.informeForm.reset();

      } catch (error) {
         console.error("❌ Error en el inicio de sesión:", error);
             
                 Swal.fire({
                   title: "Error",
                   text: "Error al iniciar sesion con el estudiante",
                   icon: "error",
                   cancelButtonText: "Intentar de nuevo",
                   scrollbarPadding: false,
                   heightAuto: false,
                   customClass: {
                     popup: "custom-alert"
                   },
                   backdrop: true
                 });
               
      }
    }else{
            Swal.fire({
              title: "Error",
              text: "Error  campos invalidos",
              icon: "error",
              cancelButtonText: "Intentar de nuevo",
              scrollbarPadding: false,
              heightAuto: false,
              customClass: {
                popup: "custom-alert"
              },
              backdrop: true
            });
          }
      this.modalController.dismiss();
  }
    get Carnet(){
      return this.informeForm?.get('Carnet');
    }
    cerrarModal(){
      this.modalController.dismiss();
    }
}
