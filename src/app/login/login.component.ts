import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MyButtonConfig } from '../generic-button/generic-button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  errorMessage = 'Spiacente, credenziali errate';
  users:User[] = [];
  authenticate:boolean;
  button:MyButtonConfig = new MyButtonConfig("btn btn-primary", "Accedi");


  email = ''
  password = ''
  constructor(public rest: UserService, private route: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers ()
  {
    this.rest.getUsers()
    .subscribe(data => {

      this.users = data;
    }) 
  }

  gestLogin(event)
  {

      for (var v of this.users){
        if(v.email === this.email && v.password === this.password)
      
        {
          this.authenticate = true;
          sessionStorage.setItem('user',JSON.stringify(v));
          this.route.navigate(['homepage', v.id ]);
        }else{}

      }

      this.authenticate = false;
  

  }

}
