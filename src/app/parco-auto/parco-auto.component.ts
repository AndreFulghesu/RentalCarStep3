import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mezzo } from '../model/mezzo';
import { User } from '../model/user';
import { MezzoServiceService } from '../services/mezzo-service.service';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrls: ['./parco-auto.component.css']
})
export class ParcoAutoComponent implements OnInit {



  veicles:Mezzo[] = []

  loggato:User;
  successDelete:string;
  creata:boolean;
  messCreata = "L'auto è stata creata con successo."

  constructor(private service:MezzoServiceService, private router:Router) { }

  ngOnInit(): void {
    this.loggato =   JSON.parse(sessionStorage.user);
    this.getVeicles()
  }

  getVeicles ()
  {
      this.service.getVeicles().subscribe(data =>{
        this.veicles = data;
      })
  }


  deleteVeicle(mezzo)
  {
    this.service.deleteVeicle(mezzo).subscribe(() =>{
      this.successDelete = "Veicolo eliminato con successo"
      this.getVeicles();
      window.scroll(0,0);
    });
  }

  editVeicle (mezzo)
  {
    this.router.navigate(['editVeicle', mezzo.id]);
  }

  addVeicle(mezzoForm)
  {
    this.service.addVeicle(mezzoForm).subscribe(() => {
    });

    this.creata = true;
    
 
  }

  prenotaVeicolo(targa)
  {
    this.router.navigate(['prenotaAuto',targa]);
  }

  refresh ()
  {
    this.ngOnInit()
  }

}
