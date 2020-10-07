import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';
import { ModifyVeicleComponent } from './modify-veicle/modify-veicle.component';
import { PrenotazioniUtenteComponent } from './prenotazioni-utente/prenotazioni-utente.component';
import { ModificaPrenotazioneComponent } from './modifica-prenotazione/modifica-prenotazione.component';
import { PrenotaAutoComponent } from './prenota-auto/prenota-auto.component';
import { GenericTableComponent } from './generic-table/generic-table.component';

import {Ng2OrderModule} from 'ng2-order-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { GenericButtonComponent } from './generic-button/generic-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomepageComponent,
    MenuComponent,
    UserProfileComponent,
    CreateUserComponent,
    ParcoAutoComponent,
    ModifyVeicleComponent,
    PrenotazioniUtenteComponent,
    ModificaPrenotazioneComponent,
    PrenotaAutoComponent,
    GenericTableComponent,
    GenericButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
 
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
