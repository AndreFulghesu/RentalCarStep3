import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: Router) { }

  loggato:User = JSON.parse(sessionStorage.user);

  ngOnInit(): void {
  }


  logout()
  {

    sessionStorage.clear();
    this.route.navigate(['login']);
  }

  home()
  {
    this.route.navigate(['homepage',this.loggato.id]);
  }

  parcoAuto()
  {
    this.route.navigate(['parcoAuto']);
  }

  mioProfilo()
  {
    this.route.navigate(['userProfile',this.loggato.id])
  }


}
