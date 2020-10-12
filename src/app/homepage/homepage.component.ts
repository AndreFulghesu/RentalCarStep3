import { Component, OnInit, NgModule, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyButtonConfig } from '../generic-button/generic-button.component';
import { MyHeaders, MyTableConfig } from '../generic-table/generic-table.component';
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



  

  pagina = 1;
  righe = 2;


  homepage = "homepage"

  eliminata = ""

  myHeader: MyHeaders [] = [{"label":"ID","key":"id"},{"label":"Nome","key":"nome"},{"label":"Cognome","key":"cognome"},{"label":"Prenotazione","key":"visualizza"},{"label":"Modifica Utente","key":"modifica"},{"label":"Elimina Utente","key":"elimina"}];

  myTable: MyTableConfig = new MyTableConfig(this.myHeader);

  addUserButton = new MyButtonConfig("btn btn-primary","Aggiungi utente");
  addPrenotationButton = new MyButtonConfig("btn btn-primary","Aggiungi prenotazione")
 
  
  utente:User;
  nome:any;
  eliminato:string = ""
  users:any []= [];
  prenotazioni:Prenotazione[] = []  
  odierna = new Date().toLocaleDateString();


  selezione:string;




  constructor(private route:ActivatedRoute, private service:UserService, private router:Router, private servicePrenot:PrenotazioniService, private prenotService:PrenotazioniService) {
    
    
   }

  ngOnInit(): void {


    
    this.utente = JSON.parse(sessionStorage.user);
    if(this.utente === null)
    {
      this.router.navigate(['login']);
    }
    this.getAllUsers();
    this.getPrenotazioniByIdUtente(this.utente.id)
    

  }

  search()
  {

   if (this.nome === "")
   {
     this.ngOnInit();
   }else{
    if (this.selezione === "nome")
    {
      this.users = this.users.filter(res =>{
        return res.nome.toLocaleLowerCase().match(this.nome.toLocaleLowerCase());
      })
    }else{
      if (this.selezione ==="cognome"){
        this.users = this.users.filter(res =>{
          return res.cognome.toLocaleLowerCase().match(this.nome.toLocaleLowerCase());
        })
      }else{
        if (this.selezione === "targa"){
          this.prenotazioni = this.prenotazioni.filter(res =>{
            return res.mezzo_utilizzato.toLocaleLowerCase().match(this.nome.toLocaleLowerCase())
          })
        }
      }
    }
  }

    
    
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


  userProfile (id)
  {
    this.router.navigate(['userProfile',id]);
  }

  addUser()
  {
    this.router.navigate(['addUser']);
  }


  addPrenotazione()
  {
    this.router.navigate(['parcoAuto']);
  }

  modificaPrenotazione(id)
  {

    this.router.navigate(['modificaPrenotazione',id]);
  }

  getPrenotazioniByIdUtente(id)
  {
    this.prenotService.getPrenotazionebyIdUtente(id).subscribe(data =>{
      this.prenotazioni = data;
    })

  }

  deletePrenotazione(id)
  {
    this.prenotService.deletePrenotazione(id).subscribe(()=>{
      this.getPrenotazioniByIdUtente(this.utente.id);
      this.eliminata = "Prenotazione eliminata";
      this.ngOnInit()
      
    })
  }



}
