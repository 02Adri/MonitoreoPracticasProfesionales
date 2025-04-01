import { Component, OnInit,Input } from '@angular/core';
import {IonContent,IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
@Component({
  selector: 'app-popover-mensaje',
  templateUrl: './popover-mensaje.component.html',
  styleUrls: ['./popover-mensaje.component.scss'],
  standalone: true,
  imports: [IonContent,IonIcon]
  
})
export class PopoverMensajeComponent  implements OnInit {
    
  @Input() mensaje: string='Mensaje por defecto';
  constructor() {
    addIcons({informationCircleOutline})
   }

  ngOnInit() {}

}
