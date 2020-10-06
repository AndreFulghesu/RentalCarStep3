import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mezzo } from '../model/mezzo';
import { Prenotazione } from '../model/prenotazione';
import { User } from '../model/user';
import { MezzoServiceService } from '../services/mezzo-service.service';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-prenotazioni-utente',
  templateUrl: './prenotazioni-utente.component.html',
  styleUrls: ['./prenotazioni-utente.component.css']
})
export class PrenotazioniUtenteComponent implements OnInit {


  id_utente:number;
  prenotazioni:Prenotazione[] = [];
  utente_selezionato:User;
  mezzo:Mezzo;
  da_approvare:Prenotazione;
  eliminata:string = ""
  

  constructor(private route:ActivatedRoute,private prenotService:PrenotazioniService,private userService:UserService,private mezzoService:MezzoServiceService) { }

  ngOnInit(): void {

    this.id_utente = this.route.snapshot.params['id'];
    this.getAllPrenotazioni(this.id_utente);
    this.getUtenteSelezionato(this.id_utente);
  }

  getAllPrenotazioni (id)
  {
    this.prenotService.getPrenotazionebyIdUtente(id).subscribe(data =>{
      this.prenotazioni = data;
    })
  }

  getUtenteSelezionato (id)
  {
    this.userService.getUserbyId(id).subscribe(data =>{
      this.utente_selezionato = data;
    })
  }

  getMezzoByTarga (targa)
  {
      
      this.mezzoService.getVeicleByTarga(targa).subscribe(data =>{
        this.mezzo = data;
      });
  }

  eliminaPrenotazione(id)
  {
    this.prenotService.deletePrenotazione(id).subscribe(() =>{
      this.getAllPrenotazioni(this.id_utente);
      this.eliminata = "Prenotazione eliminata";
      this.ngOnInit()
    });
  }

  approvaPrenotazione(id)
  {

    this.prenotService.getPrenotazioneById(id).subscribe(data =>{
      this.da_approvare = data;
      this.da_approvare.status_prenotazione = 1;

      console.log("status "+this.da_approvare.status_prenotazione)

      this.prenotService.updatePrenotazione(this.da_approvare).subscribe(data=>{

        this.ngOnInit()

      })
      
    })

  }



}
