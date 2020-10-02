import { ThrowStmt } from '@angular/compiler';

export class Mezzo {

    
    targa:string;
    casa:string;
    modello:string;
    tipologia:string;
    data_immatricolazione:Date;
    is_booked:boolean;

    constructor (targa,casa,modello,tipologia, data)
    {
        this.targa = targa;
        this.casa = casa;
        this.modello = modello;
        this.tipologia = tipologia;
        this.data_immatricolazione = data;
    }
}
