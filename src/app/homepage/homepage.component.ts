import { Component, OnInit, NgModule, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prenotazione } from '../model/prenotazione';
import { User } from '../model/user';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {



 
  
  utente:User;
  eliminato:string = ""
  users:User []= [];
  prenotazioni:Prenotazione[] = [];
  odierna = new Date().toLocaleDateString();
  constructor(private route:ActivatedRoute, private service:UserService, private router:Router, private servicePrenot:PrenotazioniService, private prenotService:PrenotazioniService) { }

  ngOnInit(): void {


    
    this.utente = JSON.parse(sessionStorage.user);
    if(this.utente === null)
    {
      this.router.navigate(['login']);
    }
    this.getAllUsers();
    this.getPrenotazioniByIdUtente(this.utente.id);

  }

  getAllUsers ()
  {
     this.service.getUsers().subscribe(data =>{

      for(let i=0;i<data.length; i ++){
        if (data[i].id === this.utente.id){
          data.splice(i,1);
        }
      }
       this.users = data;
       
     });
  
  }

  getPrenotazioniByIdUtente(id)
  {
    this.servicePrenot.getPrenotazionebyIdUtente(id).subscribe(data =>{
      this.prenotazioni = data;
    })

  }

  userProfile (id)
  {
    this.router.navigate(['userProfile',id]);
  }

  addUser()
  {
    this.router.navigate(['addUser']);
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


  editUser (user)
  {
    this.service.currentUser = Object.assign ({},user);
    this.router.navigate(['editUser',user.id]);
  }

  addPrenotazione()
  {
    this.router.navigate(['parcoAuto']);
  }


  prenotazioniUtente(id)
  {
      this.router.navigate(['visualizzaPrenotazioni',id]);
  }


  deletePrenotazione(id)
  {
    this.servicePrenot.deletePrenotazione(id).subscribe(()=>{
      this.getPrenotazioniByIdUtente(this.utente.id);
    })
  }

  modificaPrenotazione(id)
  {

    this.router.navigate(['modificaPrenotazione',id]);
  }



}
