import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GenericButtonComponent, MyButtonConfig } from '../generic-button/generic-button.component';
import { Prenotazione } from '../model/prenotazione';
import { User } from '../model/user';
import { PrenotazioniUtenteComponent } from '../prenotazioni-utente/prenotazioni-utente.component';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {


  reverse:boolean = false;
  pagina = 1;
  righe = 4;
  key:any;
  eliminato:string = ""
  prenotazioni:Prenotazione[] = [];
  utente:User;
  da_approvare:Prenotazione;
  eliminata:string = ""
  reload = false;

  visualButton: MyButtonConfig = new MyButtonConfig;
  modifyButton: MyButtonConfig = new MyButtonConfig;
  deleteButton: MyButtonConfig = new MyButtonConfig;
  approveButton: MyButtonConfig = new MyButtonConfig;

  

  @Input() tableConfig : MyTableConfig ;
  @Input() data : any [];

  @Input() currentPage:string;

  @Input() id_utente:number;


  constructor(private router:Router, private service:UserService, private prenotService:PrenotazioniService) { }

  ngOnInit(): void {

    console.log(this.reload)
    this.utente = JSON.parse(sessionStorage.user)
    this.visualButton.text ="Visualizza prenotazione"
    this.visualButton.customCssClass="btn btn-primary"

    this.modifyButton.customCssClass="btn btn-warning"
    this.modifyButton.text= "Modifica"

    this.deleteButton.text = "Elimina"
    this.deleteButton.customCssClass = "btn btn-danger"

    this.approveButton.text = "Conferma"
    this.approveButton.customCssClass = "btn btn-success"

    if (this.reload === true){
      window.location.reload()
      this.reload = false;
    }

    
    }


  sort(key)
  {
    this.key = key;
    this.reverse = !this.reverse;
  }

  prenotazioniUtente(id)
  {
      this.router.navigate(['visualizzaPrenotazioni',id]);
  }

  editUser (user)
  {
    this.service.currentUser = Object.assign ({},user);
    this.router.navigate(['editUser',user.id]);
  }

  deleteUser (user)
  {
    
    if(confirm("Vuoi davvero cancellare l'utente "+ user.nome +" ?")){
    this.service.deleteUser(user).subscribe(() =>{

      let prenotazioniUtente:Prenotazione[] = [];
      this.prenotService.getPrenotazionebyIdUtente(user.id).subscribe(data =>{
        prenotazioniUtente = data;
        for(var v of prenotazioniUtente){
          this.prenotService.deletePrenotazione(v.id).subscribe(data =>{})
        }
      })

      this.prenotService.deletePrenotazione(user.id).subscribe(data =>{})
      this.eliminato = "Utente eliminato con successo";
      this.deletePrenotazione(user);
      this.getAllUsers();
    });
    }
  }

  deletePrenotazione(id)
  {
    this.prenotService.deletePrenotazione(id).subscribe(()=>{
      this.getPrenotazioniByIdUtente(this.utente.id);
      this.eliminata = "Prenotazione eliminata";
      this.reload = true;
      this.ngOnInit()
      
    })
  }

  getAllUsers ()
  {
     this.service.getUsers().subscribe(data =>{

      for(let i=0;i<data.length; i ++){
        if (data[i].id === this.utente.id){
          data.splice(i,1);
        }
      }
       this.data = data;
       
     });
  
  }

  getPrenotazioniByIdUtente(id)
  {
    this.prenotService.getPrenotazionebyIdUtente(id).subscribe(data =>{
      this.prenotazioni = data;
    })

  }

  approvaPrenotazione(id)
  {

    this.prenotService.getPrenotazioneById(id).subscribe(data =>{
      this.da_approvare = data;
      this.da_approvare.status_prenotazione = 1;

      console.log("status "+this.da_approvare.status_prenotazione)

      this.prenotService.updatePrenotazione(this.da_approvare).subscribe(data=>{
        this.reload = true;
          this.ngOnInit() //ricaricare la page dopo l'aggiornamento
      })
      
    })

  }

   eliminaPrenotazione(id)
  {
    this.prenotService.deletePrenotazione(id).subscribe(() =>{
      
      this.getAllPrenotazioni(this.id_utente);
      this.eliminata = "Prenotazione eliminata";
      this.reload = true;
      this.ngOnInit()
      
      
      
    });
  }

  getAllPrenotazioni (id)
  {
    this.prenotService.getPrenotazionebyIdUtente(id).subscribe(data =>{
      this.prenotazioni = data;
    })
  }

}


export class MyTableConfig {

  header: MyHeaders [];
}

export class MyHeaders {

  label: string;
  key:string;
}


