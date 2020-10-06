import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  

  id:number;
  user:User;
  confirmUserCreated:string = "Utente creato con successo"
  


  loggato:User = JSON.parse(sessionStorage.user);
  constructor(public service:UserService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.id);
    
  }

  addUser(formInput)
  {
      this.service.createUser(formInput).subscribe((response) =>{
      })
      
      
      this.router.navigate(['homepage',this.loggato.id]);
  }

  getUser(id)
  {
    this.service.getUserbyId(id).subscribe((data) =>{
      this.user = data;
    })
  }

  createAndUpdate(currentUser, formInput)
  {
    if (currentUser.id != null){
      console.log("update");
      this.updateUser(currentUser);
    }else{
      console.log("new user");
      this.addUser(formInput);
    }
  }

  updateUser(currentUser)
  {
    this.service.updateUser(currentUser).subscribe();
    this.service.clear();
    this.router.navigate(['homepage',this.loggato.id]);
  }

  
}
