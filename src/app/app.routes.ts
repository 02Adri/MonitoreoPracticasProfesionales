import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registro-coordinador',
    loadComponent: () => import('./registro-coordinador/registro-coordinador.page').then( m => m.RegistroCoordinadorPage)
  },
  {
    path: 'registro-estudiantil',
    loadComponent: () => import('./registro-estudiantil/registro-estudiantil.page').then( m => m.RegistroEstudiantilPage)
  },
  {
    path: 'registro-institucion',
    loadComponent: () => import('./registro-institucion/registro-institucion.page').then( m => m.RegistroInstitucionPage)
  },
  {
    path: 'login-coordinador',
    loadComponent: () => import('./login-coordinador/login-coordinador.page').then( m => m.LoginCoordinadorPage)
  },
  {
    path: 'login-estudiante',
    loadComponent: () => import('./login-estudiante/login-estudiante.page').then( m => m.LoginEstudiantePage)
  },
  {
    path: 'login-institucion',
    loadComponent: () => import('./login-institucion/login-institucion.page').then( m => m.LoginInstitucionPage)
  },
  {
    path: 'hora-entrada-salida-estudiante',
    loadComponent: () => import('./hora-entrada-salida-estudiante/hora-entrada-salida-estudiante.page').then( m => m.HoraEntradaSalidaEstudiantePage)
  },
  {
    path: 'informe-coordinador',
    loadComponent: () => import('./informe-coordinador/informe-coordinador.page').then( m => m.InformeCoordinadorPage)
  },
  {
    path: 'informe-institucion',
    loadComponent: () => import('./informe-institucion/informe-institucion.page').then( m => m.InformeInstitucionPage)
  },  {
    path: 'crear-informe-estudiante',
    loadComponent: () => import('./crear-informe-estudiante/crear-informe-estudiante.page').then( m => m.CrearInformeEstudiantePage)
  },

];
