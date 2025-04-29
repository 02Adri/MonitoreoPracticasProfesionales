import { Component, OnInit,OnDestroy } from '@angular/core';
import {ModalController,IonicModule} from '@ionic/angular'
import { CommonModule } from '@angular/common';
import{IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonIcon,IonList,IonItem,IonInput,IonCard,IonCardHeader,IonCardTitle,IonCardContent} from '@ionic/angular/standalone';
import { closeOutline, desktopOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {io} from 'socket.io-client'
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reunion-virtual',
  templateUrl: './reunion-virtual.component.html',
  styleUrls: ['./reunion-virtual.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonIcon,IonList,IonItem,IonInput,FormsModule,IonCard,IonCardHeader,IonCardTitle,IonCardContent],
})
export class ReunionVirtualComponent  implements OnInit,OnDestroy {
    localStream:any
    remoteStream:any
    pearConnection!:RTCPeerConnection
    socket:any
    roomId:string
    messages:string[]=[]
    newMessage:string=''
    countdown:any
    remainingTime:number=2*60*60*1000//2 horas en ms
    enlaceReunion:string=''
    mostrarBotonUnirse:boolean=false
  
  constructor(private modalCtrl:ModalController,private route:ActivatedRoute) { 
    addIcons({closeOutline,desktopOutline})
     const roomFromUrl=this.route.snapshot.queryParamMap.get('reunion')
      if(roomFromUrl){
        this.roomId=roomFromUrl
      }else{
        this.roomId=localStorage.getItem('reunionId')||this.generarReunionId()
      }
  }
 //generamos el id de la reunion de manera aleatoria
 generarReunionId(){
  const id='reunion_'+Math.random().toString(36).substring(2, 10)
  localStorage.setItem('reunionId',id)
  localStorage.setItem('reunionStartTime',Date.now().toString())
  return id
 }
  async ngOnInit() {
    this.enlaceReunion=`http://192.168.172.44:8100/informe-coordinador?reunion/${this.roomId}`
    this.iniciarTemporizador()
   // await this.initVideo()
   //utilizamos l socket
    this.socket=io('http://192.168.172.44:3002')
    this.socket.emit('join',this.roomId)
     
    this.socket.on('ready',()=>{
      this.crearConexion()
      this.crearYEnviarOferta()
    })
    this.socket.on('offer', async (offer:any)=>{
      this.crearConexion()
      await this.pearConnection.setRemoteDescription(new RTCSessionDescription(offer))
      const answer= await this.pearConnection.createAnswer()
      await this.pearConnection.setLocalDescription(answer)
      this.socket.emit('answer',{answer,roomId:this.roomId})
    });
    //socket answer
    this.socket.on('answer',async(answer:any)=>{
      await this.pearConnection.setRemoteDescription(new RTCSessionDescription(answer))
    });
    //socket ice candidate
    this.socket.on('candidate',async(candidate:any)=>{
      await this.pearConnection.addIceCandidate(new RTCIceCandidate(candidate))
    });
    //socket message
    this.socket.on('chat', (msg:string) => {
      this.messages.push(msg);
    });
    //muestra el botón de "unirse" si es un visitante
    const fromLink=window.location.href.includes(this.roomId)
    if(fromLink && !localStorage.getItem('reunionStartTime')){
      this.mostrarBotonUnirse=true
     }else{
      await this.initVideo()//se inicia automaticamente para el creador
    }
  }

  //funcion para iniciar la reunion
  iniciarTemporizador(){
    const storedStart = localStorage.getItem('reunionStartTime');
    const now = Date.now();
  
    if (!storedStart) {
      localStorage.setItem('reunionStartTime', now.toString());
    }
  
    const start = Number(localStorage.getItem('reunionStartTime')) || now;
    const timePassed = now - start;
    const timeLeft = this.remainingTime - timePassed;
  
    if (timeLeft <= 0) {
      alert('¡La reunión ha finalizado!');
      localStorage.removeItem('reunionStartTime');
      this.modalCtrl.dismiss();
      return;
    }
  
    // Esperar hasta que termine el tiempo
    this.countdown = setTimeout(() => {
      alert('¡La reunión ha finalizado!');
      localStorage.removeItem('reunionStartTime');
      this.modalCtrl.dismiss();
    }, timeLeft);
   /* const now=Date.now()
    const timeLeft=this.remainingTime-(now-start)
    this.countdown=setTimeout(()=>{
      alert('¡La reunión ha finalizado!')
      this.modalCtrl.dismiss()

    },timeLeft)*/
  }

  //Funcion para inicializar el video
  async initVideo(){
   try {
    this.localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    const localVideo=<HTMLVideoElement>document.getElementById('localVideo')
    localVideo.srcObject=this.localStream
   
   } catch (error) {
    alert('Error al acceder a la cámara y micrófono')
    console.error('Error al acceder a la cámara y micrófono',error)
   }
    
 
  }
   //Funcion para crear la conexion
  crearConexion(){
    //inicializamos el peer connection
    this.pearConnection=new RTCPeerConnection()

    this.localStream.getTracks().forEach((track:any)=>{
      this.pearConnection.addTrack(track,this.localStream)
    });

    this.pearConnection.ontrack=(event)=>{
      const remoteVideo=<HTMLVideoElement>document.getElementById('remoteVideo')
      remoteVideo.srcObject=event.streams[0]

    }
    this.pearConnection.onicecandidate=(event)=>{
      if(event.candidate){
        this.socket.emit('candidate',{candidate:event.candidate,roomId:this.roomId})
      }
    }
  }
  //funcion crear y enviar la oferta
  async crearYEnviarOferta(){
    const offer=await this.pearConnection.createOffer()
    await this.pearConnection.setLocalDescription(offer)
    this.socket.emit('offer',{offer,roomId:this.roomId})

  }
  //funcion para enviar mensajes
  enviarMensaje(){
    this.socket.emit('chat',{roomId:this.roomId,message:this.newMessage})
    this.messages.push('Tú: '+this.newMessage)
    this.newMessage=''
  }

  //Funcion para compartir pantalla
  compartirPantalla(){
    navigator.mediaDevices.getDisplayMedia({video:true}).then((screenStream)=>{
      const screenTrack=screenStream.getTracks()[0]
      const sender=this.pearConnection.getSenders().find((s:any)=>s.track.kind==='video')
      if(sender){
        sender.replaceTrack(screenTrack)
      }
    })

  }

  //Funcion para copiar link
  copiarLink(){
   
    navigator.clipboard.writeText(this.enlaceReunion).then(()=>{
      alert('Link copiado al portapapeles')
    }).catch((err)=>{
      console.error('Error al copiar el link',err)
    })


  }
  //Funcion para unirse a la reunion
  async unirseReunion(){
    localStorage.setItem('reunionStartTime',Date.now().toString())
    await this.initVideo()
    this.socket.emit('join',this.roomId)
    this.mostrarBotonUnirse=false
  }
  closeModal(){
    clearTimeout(this.countdown)
    this.modalCtrl.dismiss();
  }
  ngOnDestroy() {
   this.localStream?.getTracks().forEach((track:any) => track.stop()); 
   this.socket.disconnect()  
  }

}
