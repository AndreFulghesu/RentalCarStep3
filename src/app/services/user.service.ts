import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = {
    nome: '',
    cognome:'',
    email:'',
    password:'',
    data_nascita:null,
    id:null,
    privilegi:null
  }

  constructor(private http: HttpClient) { } 

  url: string = "http://localhost:3000/users";

  users:User[] = [];

  getUsers () 
  {
    return this.http.get<User[]>(this.url);
  }

  createUser (user)
  {
    return this.http.post(this.url,user);
  }

  getUserbyId (id)
  {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  isLogged ()
  {
    this.getUsers().subscribe((response) =>{
        this.users = response;
    })

    for (var v of this.users){
      if(JSON.parse(sessionStorage.user).email === v.email) {
        return true;
      }
    }

    return false;
  }

  deleteUser(user)
  {
    return this.http.delete("http://localhost:3000/users/"+user.id);
  }

  updateUser(user)
  {
    return this.http.put<User>("http://localhost:3000/users/"+user.id,user);
  }

  clear ()
  {
    this.currentUser = {
      nome: '',
      cognome:'',
      email:'',
      password:'',
      data_nascita:null,
      id:null,
      privilegi:null
    }
  }
}
