import { Component, OnInit,AfterViewInit } from '@angular/core';
import {IonicModule,ModalController} from '@ionic/angular'
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { addIcons } from 'ionicons';
import {IonIcon,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonInput,IonButtons,IonButton} from '@ionic/angular/standalone'
import * as L from 'leaflet'
import { Layer } from 'leaflet';
import axios from 'axios'
import { closeCircleOutline, mapOutline } from 'ionicons/icons';
import {LeafletModule} from '@asymmetrik/ngx-leaflet'


@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,IonIcon,IonHeader,IonToolbar,IonTitle,IonContent,IonItem,IonInput,IonButtons,IonButton,LeafletModule]
})
export class ModalMapComponent  implements OnInit,AfterViewInit {
    empresa: string = '';
  map!: L.Map;
  userLocation!: L.LatLng;

  constructor(private modalCtrl: ModalController) {
    addIcons({ closeCircleOutline,mapOutline });

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.userLocation = L.latLng(pos.coords.latitude, pos.coords.longitude);
        this.map = L.map('map').setView(this.userLocation, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
        }).addTo(this.map);
           //evitar mapa desorganizado
           setTimeout(()=>{
              this.map.invalidateSize()
           },300)
        L.marker(this.userLocation)
          .addTo(this.map)
          .bindPopup('Esta es tu ubicación')
          .openPopup();
      },
      (err) => {
        alert('No se pudo obtener la ubicación del usuario');
        console.error(err);
      }
    );
  }

  async buscarEmpresa() {
    if (!this.empresa.trim()) {
      alert('Por favor, ingresa el nombre de la empresa.');
      return;
    }

    try {
      const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        this.empresa
      )}&key=e3f35cc060c94dc783604cbbdb415638`;

      const response = await axios.get(geoURL);

      if (!response.data.results.length) {
        alert('No se encontró la ubicación de la empresa.');
        return;
      }

      const { lat, lng } = response.data.results[0].geometry;
      const empresaLatLng = L.latLng(lat, lng);

      if (!this.userLocation || !empresaLatLng) {
        alert('Ubicación del usuario o empresa no disponible');
        return;
      }

      const rutaURL = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
      const body = {
        coordinates: [
          [this.userLocation.lng, this.userLocation.lat],
          [empresaLatLng.lng, empresaLatLng.lat],
        ],
      };

      const routeRes = await axios.post(rutaURL, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: '5b3ce3597851110001cf6248b9cd32be805d443097cd166356b5b20b',
        },
      });

      if (
        !routeRes.data ||
        !routeRes.data.features ||
        !routeRes.data.features.length
      ) {
        alert('No se pudo calcular la ruta. Intenta con otra empresa.');
        return;
      }

      const coords = routeRes.data.features[0].geometry.coordinates.map(
        (c: any) => [c[1], c[0]]
      );

      L.marker(empresaLatLng)
        .addTo(this.map)
        .bindPopup(`Esta es la ubicación de ${this.empresa}`)
        .openPopup();

      const polyline = L.polyline(coords, { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(polyline.getBounds());
    } catch (error: any) {
      console.error('Error al obtener las rutas:', error.response?.data || error.message);
      alert('Error al buscar la empresa. Por favor, intenta nuevamente.');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
