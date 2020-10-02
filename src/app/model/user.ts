export class User {

    id:number;
    nome:string;
    cognome:string;
    email:string;
    password:string;
    data_nascita:Date;
    privilegi:number;

    constructor (id,nome,cognome,email,password,data_nascita)
    {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        this.data_nascita = data_nascita;
        this.privilegi = 0;
    }



}
