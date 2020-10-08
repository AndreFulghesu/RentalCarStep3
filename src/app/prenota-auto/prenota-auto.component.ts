import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prenotazione } from '../model/prenotazione';
import { User } from '../model/user';
import { PrenotazioniService } from '../services/prenotazioni.service';

@Component({
  selector: 'app-prenota-auto',
  templateUrl: './prenota-auto.component.html',
  styleUrls: ['./prenota-auto.component.css']
})
export class PrenotaAutoComponent implements OnInit {



  
  allPrenotazioni:Prenotazione[] = [];
  idPrenotazione:number;
  targa:string;
  utente:User;
  inizio_prenotazione:Date;
  fine_prenotazione:Date;
  errorePrenotazione:string = ""
  prenotate = false;
  prenotazioniByMezzo:Prenotazione[] = [];


  constructor(private service:PrenotazioniService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getPrenotazioni();
    this.targa = this.route.snapshot.params['targa']; 
    this.getPrenotazioniByMezzo(this.targa)
    this.utente = JSON.parse(sessionStorage.user);

  }

  getPrenotazioniByMezzo (targa)
  {
    this.service.prenotazioneByMezzo(targa).subscribe(data =>{
      this.prenotazioniByMezzo = data;
    })
  }


  addPrenotazione ()
  {

    //roba molto brutta e macchinosa per aggiornare l'id con la creazione, cosa che verrà risolta con Spring Boot

    
    for (var v of this.prenotazioniByMezzo)
    {
      if ((new Date(this.inizio_prenotazione).getTime()) >= (new Date(v.inizio_prenotazione).getTime()) &&  (new Date(this.inizio_prenotazione ).getTime()) <= (new Date(v.fine_prenotazione).getTime()) 
         || (new Date(this.fine_prenotazione).getTime()) >= (new Date(v.inizio_prenotazione).getTime()) && (new Date(this.fine_prenotazione).getTime()) <= (new Date(v.fine_prenotazione).getTime()))
      {
        
          this.errorePrenotazione = "L'auto è già prenotata per quelle date"
          this.prenotate = true;

      }
    }

    if (this.prenotate === false)
    {
      let dimension = this.allPrenotazioni.length;
      this.idPrenotazione = (this.allPrenotazioni[dimension-1].id)+1;
      console.log("idPrenotazione"+this.idPrenotazione)
  
      let nuovaPrenotazione = new Prenotazione (this.idPrenotazione,this.inizio_prenotazione,this.fine_prenotazione,this.targa,this.utente.id);
     
  
      this.service.nuovaPrenotazione(nuovaPrenotazione).subscribe(response =>{
  
      })
  
      this.router.navigate(['homepage', this.utente.id]);

    }

  }

  getPrenotazioni ()
  {
      this.service.getAllPrenotazioni().subscribe(data =>{
        this.allPrenotazioni = data;
      })
  }

}
