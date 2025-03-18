import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-informe-coordinador',
  templateUrl: './informe-coordinador.page.html',
  styleUrls: ['./informe-coordinador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InformeCoordinadorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
