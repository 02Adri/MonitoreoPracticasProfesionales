import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-informe-estudiante',
  templateUrl: './crear-informe-estudiante.page.html',
  styleUrls: ['./crear-informe-estudiante.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CrearInformeEstudiantePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
