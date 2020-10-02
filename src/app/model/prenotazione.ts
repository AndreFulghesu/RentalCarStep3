export class Prenotazione {

     id:number;
     inizio_prenotazione:Date;
     fine_prenotazione:Date;
     mezzo_utilizzato:string;
     status_prenotazione:number;
     utente_richiedente:number

     constructor (id,inizio,fine,mezzo,utente)
    {
        this.id = id;
        this.inizio_prenotazione = inizio;
        this.fine_prenotazione = fine;
        this.mezzo_utilizzato = mezzo;
        this.status_prenotazione = 0;
        this.utente_richiedente = utente;

    }
    
}
