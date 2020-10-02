import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mezzo } from '../model/mezzo';
import { MezzoServiceService } from '../services/mezzo-service.service';

@Component({
  selector: 'app-modify-veicle',
  templateUrl: './modify-veicle.component.html',
  styleUrls: ['./modify-veicle.component.css']
})
export class ModifyVeicleComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:MezzoServiceService) { }

  id:number;
  veicle:Mezzo;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getVeicleById(this.id);
  }

  getVeicleById(id)
  {
      this.service.getVeicleById(id).subscribe(data => {
        this.veicle = data;
      })
  }

}
