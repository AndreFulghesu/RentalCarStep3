import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prenotazione } from '../model/prenotazione';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {


  prenotazioni:Prenotazione[] = [];

  url = " http://localhost:3000/prenotazioni/";

  constructor(private http:HttpClient) { }


  getPrenotazionebyIdUtente (id)
  {
    return this.http.get<Prenotazione[]>(`http://localhost:3000/prenotazioni?utente_richiedente=${id}`);
  }

  getPrenotazioneById (id)
  {
    return this.http.get<Prenotazione>(this.url + id);
  }


  deletePrenotazione (id)
  {
    return this.http.delete("http://localhost:3000/prenotazioni/"+id);
  }

  updatePrenotazione(prenotazione)
  {
    
    return this.http.put<Prenotazione>("http://localhost:3000/prenotazioni/"+prenotazione.id,prenotazione);
  
  }

  



}
