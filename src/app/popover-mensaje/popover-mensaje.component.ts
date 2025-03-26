import { Component, OnInit,Input } from '@angular/core';
import {IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-popover-mensaje',
  templateUrl: './popover-mensaje.component.html',
  styleUrls: ['./popover-mensaje.component.scss'],
  standalone: true,
  imports: [IonContent]
  
})
export class PopoverMensajeComponent  implements OnInit {
    
  @Input() mensaje: string='Mensaje por defecto';
  constructor() { }

  ngOnInit() {}

}
