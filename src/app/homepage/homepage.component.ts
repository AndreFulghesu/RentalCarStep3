import { Component, OnInit, NgModule } from '@angular/core';
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
  users:User []= [];
  prenotazioni:Prenotazione[] = [];
  odierna = new Date().toLocaleDateString();
  constructor(private route:ActivatedRoute, private service:UserService, private router:Router, private servicePrenot:PrenotazioniService) { }

  ngOnInit(): void {

    this.utente = JSON.parse(sessionStorage.user);
    this.getAllUsers();
    this.getPrenotazioniByIdUtente(this.utente.id);

  }

  getAllUsers ()
  {
     this.service.getUsers().subscribe(data =>{
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
    this.service.deleteUser(user).subscribe(() =>{
      this.getAllUsers();
    });
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
