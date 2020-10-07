import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ModificaPrenotazioneComponent } from './modifica-prenotazione/modifica-prenotazione.component';
import { ModifyVeicleComponent } from './modify-veicle/modify-veicle.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';
import { PrenotazioniUtenteComponent } from './prenotazioni-utente/prenotazioni-utente.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {PrenotaAutoComponent} from './prenota-auto/prenota-auto.component';

const routes: Routes = [
  {path:'homepage/:id',component:HomepageComponent}, //servizio per controllare se un utente è loggato, ma il servizio crea solo problemi quindi ciao ciao servizio 

  {path:'login',component:LoginComponent},
  {path:'userProfile/:id',component:UserProfileComponent},
  {path:'addUser',component:CreateUserComponent},
  {path:'parcoAuto',component:ParcoAutoComponent},
  {path:'editUser/:id', component:CreateUserComponent},
  {path:'editVeicle/:id', component:ModifyVeicleComponent},
  {path:'visualizzaPrenotazioni/:id',component:PrenotazioniUtenteComponent},
  {path:'modificaPrenotazione/:id',component:ModificaPrenotazioneComponent},
  {path:'prenotaAuto/:targa', component:PrenotaAutoComponent},
  {path: '',   redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
