import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prenotazione } from '../model/prenotazione';
import { User } from '../model/user';
import { PrenotazioniService } from '../services/prenotazioni.service';

@Component({
  selector: 'app-modifica-prenotazione',
  templateUrl: './modifica-prenotazione.component.html',
  styleUrls: ['./modifica-prenotazione.component.css']
})
export class ModificaPrenotazioneComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:PrenotazioniService, private router:Router) { }

  da_modificare:Prenotazione;
  id_prenot:number;
  odierna = new Date();
  period:number;
  errorMessage = '';
  error = false;
  loggato:User;
  two_days_milliseconds = 172800000;

  
  
  

  ngOnInit(): void {
    this.loggato = JSON.parse(sessionStorage.user);
    this.id_prenot = this.route.snapshot.params['id'];
    this.getPrenotazione(this.id_prenot);
    
  }

  getPrenotazione(id)
  {
    this.service.getPrenotazioneById(id).subscribe(data =>{
      this.da_modificare = data;
      console.log("Tempo data odierna:"+this.odierna.getTime())
      //console.log("Tempo data prenotazione: "+this.da_modificare.inizio_prenotazione)
      //console.log("Tempo data prenotazione: "+  new Date(this.da_modificare.inizio_prenotazione).getTime())
      this.period = (new Date(this.da_modificare.inizio_prenotazione).getTime()) - (this.odierna.getTime());
      console.log("periodo:   "+ this.period )
      
      
      
    })
  
  }

  modifica ()
  {
    if (this.period > 2){
      this.service.updatePrenotazione(this.da_modificare);
      this.router.navigate(['homepage',this.loggato.id]);

    }else{
        this.error = true;
    }
  }


}

