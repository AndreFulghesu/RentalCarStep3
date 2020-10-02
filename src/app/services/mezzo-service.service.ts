import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mezzo } from '../model/mezzo';


@Injectable({
  providedIn: 'root'
})
export class MezzoServiceService {



  url = "http://localhost:3000/cars";
  cars:Mezzo[]= [];


  constructor(private http:HttpClient) { }

  getVeicles () 
  {
    return this.http.get<Mezzo[]>(this.url);
  }

  getVeicleById (id)
  {
    return this.http.get<Mezzo>("http://localhost:3000/cars/"+id);
  }

  getVeicleByTarga (targa)
  {
    return this.http.get<Mezzo>(`http://localhost:3000/cars?mezzo_utilizzato=${targa}`);
  }

  deleteVeicle(mezzo)
  {
    return this.http.delete("http://localhost:3000/cars/" + mezzo.id)
  }

  addVeicle(mezzo)
  {
    return this.http.post(this.url,mezzo);
  }

  
}
