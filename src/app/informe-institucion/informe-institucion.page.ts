import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-informe-institucion',
  templateUrl: './informe-institucion.page.html',
  styleUrls: ['./informe-institucion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InformeInstitucionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
