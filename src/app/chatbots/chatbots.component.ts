import { Component, OnInit } from '@angular/core';
import { OpenAIService } from '../services/openAI';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonInput,IonButton,IonIcon}from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { refreshOutline, sendOutline } from 'ionicons/icons';
@Component({
  selector: 'app-chatbots',
  templateUrl: './chatbots.component.html',
  styleUrls: ['./chatbots.component.scss'],
  standalone: true,
  imports:[CommonModule,FormsModule,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonInput,IonButton,IonIcon]
})
export class ChatbotsComponent  implements OnInit {
    messages:{sender:string, text:string}[]=[];
    userInput:string='';
    loading:boolean=false;
  constructor(private openaiservice:OpenAIService) { 
    addIcons({refreshOutline,sendOutline})
  }

  ngOnInit() {}
  async sendMessage(){
    if(!this.userInput.trim()){
      return;
    }

    //Verificamos si tenemos conexion a internet
    if(!navigator.onLine){
        this.messages.push({sender:'bot', text:'Sin conexión a internet.'})
        return;
    }
    const userMessage=this.userInput;
  this.messages.push({sender:'user', text:userMessage});
  this.userInput='';
  this.loading=true;
  await new Promise(res => setTimeout(res, 1000));
  const botResponse=await this.openaiservice.sendMessage(userMessage);
  this.messages.push({sender:'bot', text:botResponse});
   this.speak(botResponse)
  this.loading=false;
  }
  //Funcion para hablar
  speak(text:string){
    const speech=new SpeechSynthesisUtterance(text);
    speech.lang='es-ES';
    speech.rate=1;
    speech.pitch=1;
    window.speechSynthesis.speak(speech);
  }

  //funcion para limpiar chat
  clearChat(){
    this.messages=[];
    this.userInput='';

    //detener el speech
    if('speechSynthesis' in window){
      window.speechSynthesis.cancel();
    }
  }

}
