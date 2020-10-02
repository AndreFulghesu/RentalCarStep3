import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service:UserService, private router:Router) { }

  id:number;
  user:User;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUser(this.id);
  }

  getUser (id)
  {
      this.service.getUserbyId(id).subscribe(data =>{
          this.user = data;
      })
  }

  editUser(user)
  {
    this.service.currentUser = Object.assign ({},user);
    this.router.navigate(['editUser',user.id]);
  }

}
