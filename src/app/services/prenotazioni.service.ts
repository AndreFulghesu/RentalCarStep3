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

  getAllPrenotazioni ()
  {
    return this.http.get<Prenotazione[]>(this.url);
  }

  getPrenotazionebyIdUtente (id)
  {
    return this.http.get<Prenotazione[]>(`http://localhost:3000/prenotazioni?utente_richiedente=${id}`);
  }

  getPrenotazioneById (id)
  {
    return this.http.get<Prenotazione>( `http://localhost:3000/prenotazioni/${id}`);
  }

  nuovaPrenotazione (prenotazione)
  {
    
    return this.http.post(" http://localhost:3000/prenotazioni",prenotazione);
  }

  prenotazioneByMezzo (targa)
  {
    return this.http.get<Prenotazione[]>(`http://localhost:3000/prenotazioni?mezzo_utilizzato=${targa}`)
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
